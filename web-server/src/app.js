const path = require('path');
const express = require('express');
const hbs = require('hbs');
require('dotenv').config();

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

// define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// by default, hbs looks for views folder at the root of the project to serve as pages
// in order to use a different directory and at a location other than root, set the 'views' to new path of that directory
// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'John'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About App',
        name: 'John'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'Help section for the weather app',
        name: 'John'
    })
});

app.get('/weather', (req, res) => {
    // res.send('Weather display page');
    if(!req.query.address) {
        return res.send({
            error: 'No address found'
        })
    };

    const address = req.query.address;
    geocode(address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({error});
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
    
            if (error) {
                return res.send({error});
            }
    
            console.log(location);
            console.log(forecastData);

            res.send({
                forecastData,
                location,
                address
            })
    
        });
    
    });

    
});

app.get('/help/*', (req, res) => {
    // res.send('Help article for the requested item is not available.');  // '/help/*' it matches all the routes that are not defined after /help/____
    res.render('errorpage', {
        error: 'Help article for the requested item is not available.',
        title: '404 Page',
        name: 'John'
    })
})

app.get('*', (req, res) => {    // '*' wildcard character to match all the routes that are not defined above
    res.render('errorpage', {
        error: 'Page not found!',
        title: '404 Page',
        name: 'John'
    })
})

app.listen(3000, () => {
    console.log('Server is up and running on port 3000');
})