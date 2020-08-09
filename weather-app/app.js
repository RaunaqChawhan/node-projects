const request = require('request');
require('dotenv').config();

const url = `http://api.weatherstack.com/current?access_key=${process.env.API_KEY}&query=40.464,-74.003`;

request({   url: url, json: true    }, (error, response) => {
    // const data = JSON.parse(response.body);
    console.log(response.body.current);
})