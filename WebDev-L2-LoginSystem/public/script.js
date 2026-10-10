"use strict";

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");
const formTitle = document.getElementById("formTitle");
const notice = document.getElementById("notice");
const dashboard = document.getElementById("dashboard");
const logoutButton = document.getElementById("logoutButton");
const pageShell = document.querySelector(".page-shell");
const siteFooter = document.querySelector(".site-footer");

document.getElementById("currentYear").textContent =
    new Date().getFullYear();

function showNotice(message, type = "") {
    notice.textContent = message;
    notice.className = "notice";

    if (type) {
        notice.classList.add(type);
    }

    notice.hidden = false;
}

function hideNotice() {
    notice.hidden = true;
    notice.textContent = "";
    notice.className = "notice";
}

function switchMode(mode) {
    const registering = mode === "register";

    loginForm.hidden = registering;
    registerForm.hidden = !registering;

    loginTab.classList.toggle("active", !registering);
    registerTab.classList.toggle("active", registering);

    loginTab.setAttribute("aria-selected", String(!registering));
    registerTab.setAttribute("aria-selected", String(registering));

    formTitle.textContent = registering ?
        "Create your account" :
        "Welcome back";

    hideNotice();
}

loginTab.addEventListener("click", () => switchMode("login"));
registerTab.addEventListener("click", () => switchMode("register"));

document.querySelectorAll(".password-toggle").forEach((button) => {
    button.addEventListener("click", () => {
        const input = document.getElementById(button.dataset.target);
        const shouldShow = input.type === "password";

        input.type = shouldShow ? "text" : "password";
        button.textContent = shouldShow ? "Hide" : "Show";
        button.setAttribute(
            "aria-label",
            shouldShow ? "Hide password" : "Show password"
        );
    });
});

async function apiRequest(url, options = {}) {
    const response = await fetch(url, {
        credentials: "same-origin",
        ...options,
        headers: {
            ...(options.body ? { "Content-Type": "application/json" } : {}),
            ...options.headers,
        },
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        const error = new Error(
            data.error || "Something went wrong. Please try again."
        );
        error.status = response.status;
        throw error;
    }

    return data;
}

function setFormLoading(form, loading, loadingText) {
    const button = form.querySelector('button[type="submit"]');

    if (!button) return;

    if (loading) {
        button.dataset.originalText =
            button.querySelector("span").textContent;
        button.disabled = true;
        button.querySelector("span").textContent = loadingText;
    } else {
        button.disabled = false;

        if (button.dataset.originalText) {
            button.querySelector("span").textContent =
                button.dataset.originalText;
            delete button.dataset.originalText;
        }
    }
}

function showLoginScreen() {
    dashboard.hidden = true;
    pageShell.hidden = false;
    siteFooter.hidden = false;
}

function showDashboard(user) {
    pageShell.hidden = true;
    siteFooter.hidden = true;
    dashboard.hidden = false;

    document.getElementById("dashboardUsername").textContent =
        user.username;

    document.getElementById("dashboardEmail").textContent =
        user.email;

    document.getElementById("userAvatar").textContent =
        user.username.charAt(0).toUpperCase();

    window.scrollTo({ top: 0, behavior: "smooth" });
}

registerForm.addEventListener("submit", async(event) => {
    event.preventDefault();
    hideNotice();

    if (!registerForm.reportValidity()) return;

    const formData = new FormData(registerForm);

    const payload = {
        username: String(formData.get("username") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        password: String(formData.get("password") || ""),
    };

    if (payload.password.length < 8 || !/[0-9]/.test(payload.password)) {
        showNotice(
            "Use at least 8 characters and include at least one number.",
            "error"
        );
        return;
    }

    setFormLoading(registerForm, true, "Creating account...");

    try {
        const result = await apiRequest("/api/register", {
            method: "POST",
            body: JSON.stringify(payload),
        });

        registerForm.reset();
        switchMode("login");

        document.getElementById("loginIdentifier").value = payload.username;
        document.getElementById("loginPassword").focus();

        showNotice(result.message, "success");
    } catch (error) {
        showNotice(error.message, "error");
    } finally {
        setFormLoading(registerForm, false);
    }
});

loginForm.addEventListener("submit", async(event) => {
    event.preventDefault();
    hideNotice();

    if (!loginForm.reportValidity()) return;

    const formData = new FormData(loginForm);

    const payload = {
        identifier: String(formData.get("identifier") || "").trim(),
        password: String(formData.get("password") || ""),
    };

    setFormLoading(loginForm, true, "Signing in...");

    try {
        const result = await apiRequest("/api/login", {
            method: "POST",
            body: JSON.stringify(payload),
        });

        loginForm.reset();
        showDashboard(result.user);
    } catch (error) {
        showNotice(error.message, "error");
    } finally {
        setFormLoading(loginForm, false);
    }
});

logoutButton.addEventListener("click", async() => {
    logoutButton.disabled = true;

    try {
        await apiRequest("/api/logout", { method: "POST" });

        showLoginScreen();
        switchMode("login");
        loginForm.reset();
        registerForm.reset();

        document.getElementById("loginIdentifier").focus();
        showNotice("You have been signed out successfully.", "success");
    } catch (error) {
        showNotice(error.message, "error");
    } finally {
        logoutButton.disabled = false;
    }
});

async function restoreSession() {
    try {
        const result = await apiRequest("/api/me");
        showDashboard(result.user);
    } catch (error) {
        showLoginScreen();

        if (error.status && error.status !== 401) {
            showNotice(
                "Unable to verify your session. Please try again.",
                "error"
            );
        }
    }
}

restoreSession();