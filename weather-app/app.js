const request = require('request');
require('dotenv').config();

// const weather_url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_KEY}&query=40.464,-74.003`;
// const geocode_url = `https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=${process.env.GEOCODE_API_KEY}&limit=1`;

// request({   url: weather_url, json: true   }, (error, response) => {
//     // const data = JSON.parse(response.body);
//     if(error) {
//         console.log('Unable to connect to weather service!');
//     } else if (response.body.error) {
//         console.log('Unable to find location');
//     } else {
//         console.log(response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature +
//     " degrees out. It feels like " + response.body.current.feelslike + " degress out.");
//     }
    
// });

// request({   url: geocode_url, json: true   }, (error, response) => {
//     // console.log(response.body.features);
//     if (error) {
//         console.log('Unable to connect to location service!');
//     } else if (response.body.features.length === 0) {
//         console.log('Unable to find location. Try again with different search term');
//     } else {
//         console.log('Latitude: ' + response.body.features[0].center[1]);
//         console.log('Longitude: ' + response.body.features[0].center[0]);
//     }
    
// });

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${process.env.GEOCODE_API_KEY}&limit=1`;
    request({   url: url, json: true   }, (error, response) => {
        if (error) {
            callback('Unable to connect to location service!', undefined);
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try again with different search term', undefined);
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            });
        }
    });
};

geocode('Los Angelese', (error, data) => {
    console.log('Error: ' + error);
    console.log('Data: ' + data);
});