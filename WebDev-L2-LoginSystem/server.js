require("dotenv").config();

const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const Database = require("better-sqlite3");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === "production";

if (isProduction && !process.env.SESSION_SECRET) {
    throw new Error("SESSION_SECRET must be configured in production.");
}

app.disable("x-powered-by");
app.use(helmet());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false, limit: "10kb" }));

const db = new Database("users.db");
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL COLLATE NOCASE UNIQUE,
    email TEXT NOT NULL COLLATE NOCASE UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

app.use(
    session({
        name: "login.sid",
        secret: process.env.SESSION_SECRET || crypto.randomBytes(32).toString("hex"),
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: isProduction,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60,
        },
    })
);

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: { error: "Too many attempts. Please try again in 15 minutes." },
});

app.use("/api/register", authLimiter);
app.use("/api/login", authLimiter);

function requireAuth(req, res, next) {
    if (!req.session.userId) {
        return res.status(401).json({ error: "Please log in to continue." });
    }
    next();
}

function validEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

app.post("/api/register", async(req, res) => {
    try {
        const username = String(req.body.username || "").trim();
        const email = String(req.body.email || "").trim().toLowerCase();
        const password = String(req.body.password || "");

        if (!username || !email || !password) {
            return res.status(400).json({ error: "Please fill in every field." });
        }

        if (!/^[a-zA-Z0-9_]{3,24}$/.test(username)) {
            return res.status(400).json({
                error: "Username must be 3–24 characters: letters, numbers or underscores.",
            });
        }

        if (!validEmail(email) || email.length > 254) {
            return res.status(400).json({ error: "Enter a valid email address." });
        }

        if (password.length < 8 || !/[0-9]/.test(password)) {
            return res.status(400).json({
                error: "Password must contain at least 8 characters and one number.",
            });
        }

        if (Buffer.byteLength(password, "utf8") > 72) {
            return res.status(400).json({
                error: "Password must not exceed 72 bytes.",
            });
        }

        const passwordHash = await bcrypt.hash(password, 12);

        try {
            const result = db.prepare(`
        INSERT INTO users (username, email, password_hash)
        VALUES (?, ?, ?)
      `).run(username, email, passwordHash);

            return res.status(201).json({
                message: "Account created successfully. You can now log in.",
                userId: result.lastInsertRowid,
            });
        } catch (error) {
            if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
                return res.status(409).json({
                    error: "That username or email is already registered.",
                });
            }
            throw error;
        }
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ error: "Unable to register right now." });
    }
});

app.post("/api/login", async(req, res) => {
    try {
        const identifier = String(req.body.identifier || "").trim();
        const password = String(req.body.password || "");

        if (!identifier || !password) {
            return res.status(400).json({ error: "Enter your username/email and password." });
        }

        const user = db.prepare(`
      SELECT id, username, email, password_hash
      FROM users
      WHERE username = ? COLLATE NOCASE OR email = ? COLLATE NOCASE
    `).get(identifier, identifier);

        // Compare even when the account does not exist to reduce timing differences.
        const fallbackHash =
            "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6rK5x7jP8y4W7uV7e0FjV8tXqW6eK";
        const passwordMatches = await bcrypt.compare(
            password,
            user ? user.password_hash : fallbackHash
        );

        if (!user || !passwordMatches) {
            return res.status(401).json({ error: "Incorrect username/email or password." });
        }

        req.session.regenerate((error) => {
            if (error) {
                console.error("Session error:", error);
                return res.status(500).json({ error: "Unable to log in right now." });
            }

            req.session.userId = user.id;
            req.session.save((saveError) => {
                if (saveError) {
                    console.error("Session save error:", saveError);
                    return res.status(500).json({ error: "Unable to log in right now." });
                }

                res.json({
                    message: "Login successful.",
                    user: { username: user.username, email: user.email },
                });
            });
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Unable to log in right now." });
    }
});

app.get("/api/me", requireAuth, (req, res) => {
    const user = db.prepare(
        "SELECT username, email, created_at FROM users WHERE id = ?"
    ).get(req.session.userId);

    if (!user) {
        return req.session.destroy(() => {
            res.status(401).json({ error: "Please log in to continue." });
        });
    }

    res.json({ user });
});

app.post("/api/logout", (req, res) => {
    if (!req.session) {
        res.clearCookie("login.sid", { httpOnly: true, sameSite: "lax", secure: isProduction });
        return res.json({ message: "Logged out successfully." });
    }

    req.session.destroy((error) => {
        res.clearCookie("login.sid", {
            httpOnly: true,
            sameSite: "lax",
            secure: isProduction,
        });

        if (error) {
            return res.status(500).json({ error: "Unable to log out right now." });
        }

        res.json({ message: "Logged out successfully." });
    });
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/{*splat}", (req, res, next) => {
    if (req.path.startsWith("/api/")) {
        return res.status(404).json({ error: "API route not found." });
    }
    res.sendFile(path.join(__dirname, "public", "index.html"), (error) => {
        if (error) next(error);
    });
});

app.use((error, req, res, next) => {
    console.error("Server error:", error);
    if (res.headersSent) return next(error);
    res.status(500).json({ error: "Something went wrong." });
});

app.listen(PORT, () => {
    console.log(`Login Authentication System running at http://localhost:${PORT}`);
});