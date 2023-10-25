const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Add this line
const app = express();
const PORT = 3000;

app.use(cors(),express.static('public')); // Enable CORS for all routes

app.use(express.static('public'));

app.use(bodyParser.json());


let moistureData = [
    //{ plantname: 'Plant A', moisturePercentage: 75, timestamp: new Date() }, //example data
    //{ plantname: 'Plant B', moisturePercentage: 75, timestamp: new Date() }
];

app.post('/moisture', (req, res) => {
    const { plantname, moisturePercentage } = req.body;
    moistureData.push({ plantname, moisturePercentage, timestamp: new Date() });
    console.log(`Received data: ${JSON.stringify(req.body)}`); // Add this line for debugging
    res.sendStatus(200);
});

app.get('/moisture', (req, res) => {
    res.json(moistureData);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

