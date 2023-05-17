const express = require('express');
const cors = require('cors');
const axios = require('axios');
const apikeys = require('./keys')

const app = express();

app.use(cors());
const port = 3000;

// Define routes
app.get('/findbiz', (req, res) => {
    
    res.send('Hello, World!');
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});