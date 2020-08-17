console.log('Just a check!');



const weatherForm = document.querySelector('form');
const searchedLocation = document.querySelector('input');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    fetch(`http://localhost:3000/weather?address=${searchedLocation.value}`)    
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            console.log(data.error)
        } else {
            console.log('Location: ' + data.location);
            console.log('Forecase: ' + data.forecastData);
        }
    });
});