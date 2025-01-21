const express = require('express');
const multer = require('multer');
const csvParser = require('csv-parser');
const fs = require('fs');
const path = require('path');

// Initialize express app
const app = express();

// Create the uploads folder if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    },
});

// Initialize multer for file upload
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB file size limit

// Utility function to parse CSV file
const parseCSVFile = (filePath) => {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results)) // Resolve the promise with the parsed data
            .on('error', (err) => reject(new Error(`Error reading CSV file: ${err.message}`))); // Reject the promise if an error occurs
    });
};

// Route to upload the CSV file
app.post('/upload-csv', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const filePath = path.join(uploadsDir, req.file.filename);

    // Parse the CSV file after it's uploaded
    parseCSVFile(filePath)
        .then((data) => {
            console.log('CSV file successfully parsed:', data);
            res.json({ message: 'File uploaded and data parsed successfully', data });
        })
        .catch((err) => {
            console.error('Error parsing CSV file:', err.message);
            res.status(500).send('Error parsing CSV file');
        });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

/*
Testing with Postman:
POST Request:

URL: http://localhost:3000/upload-csv
Method: POST
In the Body:

Choose form-data.
Set the field name to file (this matches upload.single('file')).
Select your CSV file to upload.
Response:

If successful, the server will return a JSON object with the parsed CSV data:
json
Copy
{
  "message": "File uploaded and data parsed successfully",
  "data": [
    { "name": "John", "age": "25", "city": "New York" },
    { "name": "Alice", "age": "30", "city": "Los Angeles" },
    { "name": "Bob", "age": "22", "city": "Chicago" }
  ]
}
If there’s an error, you will receive a 500 error with a relevant message.

Example CSV File (example.csv):
csv
Copy
name,age,city
John,25,New York
Alice,30,Los Angeles
Bob,22,Chicago

With this setup, you can upload CSV files to your Node.js API, parse them, 
and handle the parsed data. This code also provides error handling for issues like missing files or 
parsing errors.

*/