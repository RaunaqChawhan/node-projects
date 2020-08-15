const path = require('path');
const express = require('express');

const app = express();

// define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates');

// by default, hbs looks for views folder at the root of the project to serve as pages
// in order to use a different directory and at a location other than root, set the 'views' to new path of that directory
// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);

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
        message: 'Help section for the weather app'
    })
});

app.get('/weather', (req, res) => {
    res.send('Weather display page');
});

app.listen(3000, () => {
    console.log('Server is up and running on port 3000');
})