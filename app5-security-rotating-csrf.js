// Implementing Rotating CSRF Tokens
const express = require('express');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');

const app = express();

// Middleware to parse cookies
app.use(cookieParser());

// CSRF protection middleware
const csrfProtection = csrf({
  cookie: true, // Store the CSRF token in a secure cookie
});

app.use(express.urlencoded({ extended: true }));

// Route to generate and send the CSRF token
app.get('/get-csrf-token', csrfProtection, (req, res) => {
  // Rotate token after login or sensitive action
  res.cookie('XSRF-TOKEN', req.csrfToken(), { httpOnly: true, secure: true, sameSite: 'strict' });
  res.json({ message: 'CSRF token issued' });
});

// Route requiring CSRF protection
app.post('/submit-form', csrfProtection, (req, res) => {
  res.json({ message: 'Form submission successful' });
});

// Rotate the token on critical actions (e.g., user login)
app.post('/login', csrfProtection, (req, res) => {
  // Perform login logic here
  res.cookie('XSRF-TOKEN', req.csrfToken(), { httpOnly: true, secure: true, sameSite: 'strict' });
  res.json({ message: 'User logged in, CSRF token rotated' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

/*
ensure Secure Cookie Configuration

Use httpOnly, secure, and sameSite flags for cookies to prevent XSS and CSRF attacks.

Use Secure Headers

Use libraries like helmet to set security headers.
Token Refresh

Refresh the CSRF token on every user interaction to reduce the window of exploitation.

Secure Dependencies:
  - Keep Dependencies Updated: Regularly update dependencies to ensure 
  you are protected from known vulnerabilities.
  - Use Tools like Snyk or npm audit:
      - Run npm audit to identify and fix vulnerabilities.
*/
