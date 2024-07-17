import {API_KEY}from './api'
const apiKey = API_KEY; // Replace with your actual API key

document.getElementById('getWeatherBtn').addEventListener('click', function() {
    const city = document.getElementById('city').value.trim();
    if (city) {
        getWeather(city);
    } else {
        alert('Please enter a city name!');
    }
});

// Fetch weather for a default city when the page loads
document.addEventListener('DOMContentLoaded', function() {
    getWeather('Delhi'); // You can change this default city if needed
});

function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Failed to fetch weather data. Please try again.');
        });
}

function displayWeather(data) {
    if (data.cod === 200) {
        document.getElementById('cityName').innerText = data.name;
        document.getElementById('weatherDescription').innerText = data.weather[0].description;
        document.getElementById('temperature').innerText = `Temperature: ${data.main.temp} °C`;
        document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
        document.getElementById('windSpeed').innerText = `Wind Speed: ${data.wind.speed} m/s`;

        // Set the weather icon based on the weather condition
        const weatherCondition = data.weather[0].main.toLowerCase();
        let iconSrc = '';

        switch (weatherCondition) {
            case 'clear':
                iconSrc ='/clear.png'; // Adjusted path for clear.png in WEATHER_APP folder
                break;
            case 'clouds':
                iconSrc = '/cloudy.png'; // Adjusted path for clouds.png in WEATHER_APP folder
                break;
            case 'rain':
                iconSrc = '/rainy.png'; // Adjusted path for rain.png in WEATHER_APP folder
                break;
            case 'haze':
                iconSrc ='/hazy.png'; // Adjusted path for haze.png in WEATHER_APP folder
                break;
            case 'sunny':
                iconSrc = '/sunny.png'; // Adjusted path for sunny.png in WEATHER_APP folder
                break;
            default:
                iconSrc = ''; // Set default icon or empty string if no match
                break;
        }

        document.getElementById('weatherIcon').src = iconSrc;
    } else {
        // Handle case when city is not found or other errors
        document.getElementById('cityName').innerText = 'City not found';
        document.getElementById('weatherDescription').innerText = '';
        document.getElementById('temperature').innerText = '';
        document.getElementById('humidity').innerText = '';
        document.getElementById('windSpeed').innerText = '';
        document.getElementById('weatherIcon').src = ''; // Clear the icon src
    }
}
