require('dotenv').config();
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

geocode('Los Angeles', (error, geocodeData) => {

    if (error) {
        return console.log(error);
    }

    forecast(geocodeData.latitude, geocodeData.longitude, (error, forecastData) => {

        if (error) {
            return console.log(error);
        }

        console.log(geocodeData.location);
        console.log(forecastData)

    });

});

