console.log('Just a check!');

fetch('http://localhost:3000/weather?address=philadelphia')
.then(res => res.json())
.then(data => {
    if (data.error) {
        console.log(data.error)
    } else {
        console.log('Location: ' + data.location);
        console.log('Forecase: ' + data.forecastData);
    }
});