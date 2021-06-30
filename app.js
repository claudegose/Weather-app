const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const currentWeatherItemsEl = document.getElementById("current-weather-items");
const timezone = document.getElementById("time-zone");
const countryEl = document.getElementById("country");
const weatherForecastEl = document.getElementById("weather-forcast");
const currentTempEl = document.getElementById("current-temp");


const days= ["sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


const API_KEY = "3a6bc0c0cb362d0812c688e02eb124f8";


setInterval(() =>{
    const time = new Date();
    const month = time.getMonth()
    const date = time.getDate();
    const day= time.getDay()
    const hour = time.getHours()
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM'


    timeEl.innerHTML = hoursIn12HrFormat +  ':' + minutes + ' ' + `<span id="am-pm">${ampm}</span>`
    dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month]
}, 1000);


getWeatherData();
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
         let {latitude, longitude} = success.coords;
fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&${longitude}={lon}&exclude=hourly,minutely&appid=${API_KEY}`)
    .then(res => res.json)
    .then(data => console.log(data));


    })

}

