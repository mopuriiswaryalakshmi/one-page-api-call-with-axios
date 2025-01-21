const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const app = express();

// Enable Helmet with custom configurations
app.use(
  helmet({
    contentSecurityPolicy: false, // Disable CSP for API-only use
  })
);

// Enable HSTS
app.use(
  helmet.hsts({
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  })
);

// Use CORS for API security
app.use(
  cors({
    origin: 'https://trusted-client.com', // Replace with your client domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// const allowedOrigins = ['https://trusted-client.com', 'https://another-client.com'];
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     credentials: true,
//   })
// );

// Example API endpoint
app.get('/api/data', (req, res) => {
  res.json({ message: 'Secure data response' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Secure API running on http://localhost:${PORT}`);
});


