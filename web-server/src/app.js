const path = require('path');
const express = require('express');

const app = express();
const publicDirPath = path.join(__dirname, '../public');

app.set('view engine', 'hbs');
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