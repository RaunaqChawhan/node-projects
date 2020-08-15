const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

// define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

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
    res.send('Weather display page');
});

app.get('/help/*', (req, res) => {
    res.send('Help article for the requested item is not available.');  // '/help/*' it matches all the routes that are not defined after /help/____
})

app.get('*', (req, res) => {    // '*' wildcard character to match all the routes that are not defined above
    res.send('404 Page');
})

app.listen(3000, () => {
    console.log('Server is up and running on port 3000');
})