# Vault — Login Authentication System

**OASIS INFOBYTE Web Development Internship | Level 2 — Task 4**

A full-stack authentication web application built with Node.js, Express, SQLite, and bcrypt. It allows users to register, log in securely, access a protected dashboard, and log out.

## 🚀 Live Demo

> ⚠️ **Status:** Not deployed  
> 💻 **Run Locally:** Follow the installation and setup instructions below to run the project on your computer.

## Features

- **User Registration:** Create an account with a username, email, and password.
- **Password Validation:** Requires at least 8 characters and one number.
- **Duplicate Account Prevention:** Rejects existing usernames and email addresses.
- **Secure Login:** Authenticates users using their username or email and password.
- **Password Hashing:** Uses bcrypt to hash passwords before storing them.
- **Protected Dashboard:** Provides dashboard access only to authenticated users.
- **Session Management:** Maintains login sessions using Express sessions.
- **Logout:** Destroys the user's session and clears the session cookie.
- **Input Validation:** Rejects invalid and empty form submissions.
- **Security Measures:** Uses Helmet security headers and rate limiting for authentication endpoints.
- **Responsive Interface:** Provides a modern interface designed for desktop and mobile screens.

## Technology Stack

| Technology         | Purpose                              |
| ------------------ | ------------------------------------ |
| HTML5              | Page structure                       |
| CSS3               | Styling and responsive layout        |
| JavaScript         | Frontend interactions                |
| Node.js            | JavaScript runtime                   |
| Express.js         | Backend server and API routes        |
| SQLite             | User data storage                    |
| bcrypt             | Password hashing                     |
| express-session    | Session-based authentication         |
| Helmet             | HTTP security headers                |
| express-rate-limit | Authentication request rate limiting |
| dotenv             | Environment configuration            |

## Project Structure

```text
WebDev-L2-LoginSystem/
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── screenshots/
│   ├── register.png
│   ├── login.png
│   ├── dashboard.png
│   └── validation.png
├── server.js
├── package.json
├── package-lock.json
├── .env                 # Not committed to Git
├── .gitignore
└── README.md
```

## Installation and Setup

### Prerequisites

- Node.js and npm installed.
- Git installed (optional, for uploading to GitHub).

### 1. Clone the repository

```bash
git clone https://github.com/shiva-prajapati-777/OIBSIP.git
cd OIBSIP/WebDev-L2-LoginSystem
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=3000
SESSION_SECRET=replace_with_a_long_random_secret
NODE_ENV=development
```

Use a newly generated, private session secret. Never commit `.env` to GitHub.

### 4. Start the application

```bash
npm start
```

Open the following URL in your browser:

`http://localhost:3000`

## How to Use

1. Open the registration form.
2. Enter a username, email address, and valid password.
3. Register the account.
4. Log in using the registered username or email and password.
5. Access the protected dashboard.
6. Refresh the page to test session persistence.
7. Click **Logout** to end the session.

## Screenshots

### Registration Page

![Registration Page](screenshots/Registration%20Page.png)

### Login Page

![Login Page](screenshots/Login%20Page.png)

### Protected Dashboard

![Protected Dashboard](screenshots/Protected%20Dashboard.png)

### Validation and Error Handling

![Validation and Error Handling](screenshots/Validation%20and%20Error%20Handling.png)

## Security Considerations

- Passwords are hashed with bcrypt rather than stored in plain text.
- Authentication errors use a general message for invalid credentials.
- Session cookies are configured with HTTP-only and SameSite protections.
- Authentication endpoints use rate limiting.
- Environment secrets and the local database should not be committed to GitHub.
- Before production deployment, configure persistent database storage, a production-ready session store, HTTPS, and secure cookie settings.

## Learning Outcomes

- Understanding client-server authentication.
- Building REST API endpoints with Express.
- Validating user registration and login inputs.
- Storing user data in SQLite.
- Hashing passwords with bcrypt.
- Managing sessions and protecting dashboard routes.
- Applying basic web security practices.

## Internship

**Organization:** OASIS INFOBYTE  
**Track:** Web Development and Designing  
**Level:** Level 2  
**Task:** Task 4 — Login Authentication System

## Author

**Shiva Prajapati**

- GitHub: [shiva-prajapati-777](https://github.com/shiva-prajapati-777)
- LinkedIn: [shivaprajapati7](https://www.linkedin.com/in/shivaprajapati7/)

---

_Developed as part of the OASIS INFOBYTE Web Development Internship._
