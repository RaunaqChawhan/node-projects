const path = require('path');
const express = require('express');

const app = express();
const publicDirPath = path.join(__dirname, '../public');

app.use(express.static(publicDirPath));

app.get('/weather', (req, res) => {
    res.send('Weather display page');
});

app.listen(3000, () => {
    console.log('Server is up and running on port 3000');
})