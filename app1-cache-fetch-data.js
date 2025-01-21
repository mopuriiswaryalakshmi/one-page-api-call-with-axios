const express = require('express');
const axios = require('axios');
const app = express();

const cache = {};  // Memory cache for storing stock data
const TTL = 20000; // Cache expiry time in milliseconds (20 seconds)

// Middleware to check the cache and handle fetching
app.use('/:id', async (req, res, next) => {
    const stockId = req.params.id;

    console.log(`Received request for stock ID: ${stockId}`);

    // Check if data is already cached
    if (cache[stockId]) {
        const cachedData = cache[stockId];

        // Check if the cache has not expired
        if (Date.now() < cachedData.expiry) {
            console.log('Cache hit: Returning cached data');
            return res.send(cachedData.data);
        } else {
            console.log('Cache expired: Fetching new data');
            delete cache[stockId]; // Remove expired cache
        }
    }

    try {
        // Fetch data from the API
        const response = await axios.get(
            `https://groww.in/v1/api/stocks_data/v1/tr_live_prices/exchange/NSE/segment/CASH/${stockId}/latest`
        );

        // Cache the API result
        cache[stockId] = {
            data: response.data,
            expiry: Date.now() + TTL // Set cache expiry time
        };

        console.log('Fetched fresh data from API');
        return res.send(response.data);  // Send the data to the client
    } catch (error) {
        console.error('Error fetching data:', error.message);
        return res.status(500).send({ error: 'Failed to fetch stock data' });  // Send error response
    }
});

// Start the server
app.listen(3300, () => {
    console.log('Server running on port 3300');
});
