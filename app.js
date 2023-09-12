// select elements

const iconElement = document.querySelector('.weather-icon');
const tempElement = document.querySelector('.temperature-value p');
const descElement = document.querySelector('.temperature-description p');
const locationElement = document.querySelector('.location p');
const notlificationElement = document.querySelector('.notification');

//App data

const weather = {};

weather.temperature = {
    unit : "celsius"
}

// APP CONST AND VARS 

const KELVIN = 273;

// API KEY

const key = "82005d27a116c2880c8f0fcb866998a0";

// CHECT IF BROWSER SUPPORTS GEOLACATION

if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notlificationElement.style.display = "block";
    notlificationElement.innerHTML = "<p>Browser doesn't Support Geolocation<p>";
}

// SET USER'S POSITION

function setPosition(POSITION){
    let latitude = POSITION.coords.latitude;
    let longitude = POSITION.coords.longitude;

    getWeather(latitude, longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION

function showError(error){
    notlificationElement.style.display = "block";
    notlificationElement.innerHTML = `<p> ${error.message} </p>`;
}


//GET WEATHER FROM API

function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

   fetch(api)
    .then(function(response){
        let data = response.json();
        return data;
    })
    .then(function(data){
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
    })
    .then(function(){
        displayWeather();
    });
}

// DISPLAY WEATHER TO UI

function displayWeather(){
    iconElement.innerHTML = `<img> src="icon/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}