const express = require('express');

const app = express();

app.get('', (req, res) => {
    res.send('<h1>Hello, root page!</h1>');
});

app.get('/help', (req, res) => {
    res.send({
        msg: 'Express detects an array and an object and stringifies to json to send it to requester'
    });
});

app.get('/about', (req, res) => {
    res.send('About page');
});

app.get('/weather', (req, res) => {
    res.send('Weather display page');
});

app.listen(3000, () => {
    console.log('Server is up and running on port 3000');
})