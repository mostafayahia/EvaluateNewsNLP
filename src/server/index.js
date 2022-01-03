var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const request = require('request');

const app = express()

require('dotenv').config()

app.use(express.static('dist'))

const bodyParser = require('body-parser');
app.use(bodyParser.json())

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
const port = 8081;
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/nlp', function (req, res) {
    
    request({
        uri: 'https://api.meaningcloud.com/sentiment-2.1',
        method: 'POST',
        form: {
            key: process.env.API_KEY,
            txt: req.body.text,
            lang: 'en'
        }
    }, (err, response, body) => {
        res.send(body);
    })


})
