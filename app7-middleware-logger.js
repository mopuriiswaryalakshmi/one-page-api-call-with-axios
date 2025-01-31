const express = require('express');
const expressJWT = require('express-jwt');

const app = express();

app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use((request, response, next) => {
  // request.logger = getLogger();
  request.logger ={}
  next();
});

const authExcludedPaths = [
  `/auth`
]

const secret = "secret123"

app.use(expressJWT({ secret }).unless({
  path: authExcludedPaths
}));

// Example route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.get('/auth', (req, res) => {
  res.send('Hello, world! auth');
});

// Route to simulate a server error
app.get('/error', (req, res, next) => {
  const error = new Error('Something went wrong!');
  next(error); // Pass the error to the error handling middleware
});

// Middleware to handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// // Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
