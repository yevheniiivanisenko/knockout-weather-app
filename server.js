const http = require('http');
const https = require('https');
const express = require('express');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

server.listen(8080);

app.use(express.static(__dirname + '/www'));

app.get('/weather', (req, res) => {
    const options = {
        host: 'community-open-weather-map.p.rapidapi.com',
        path: '/weather?q=' + req.query.city,
        method: 'GET',
        headers: {
            'x-rapidapi-key': process.env.API_KEY
        }
    };
    const request = https.request(options, function (response) {
        response.on('data', function (data) {
            if (response.statusCode === 200) {
                res.status(200).json(JSON.parse(data));
            } else
                res.status(response.statusCode).json(JSON.parse(data));
        });
    });

    request.on('error', function (error) {
        res.status(500).send(error);
    });

    request.end();
});

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/www/index.html');
});
