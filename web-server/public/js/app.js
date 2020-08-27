const weatherForm = document.querySelector('form');
const searchedLocation = document.querySelector('input');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    messageOne.textContent = 'Loading weather...';
    messageTwo.textContent = '';

    // fetch(`http://localhost:3000/weather?address=${searchedLocation.value}`)    
    fetch(`/weather?address=${searchedLocation.value}`)
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            messageOne.textContent = data.error;
        } else {
            messageOne.textContent = 'Location: ' + data.location;
            messageTwo.textContent = 'Forecast: ' + data.forecastData;
        }
    });
});