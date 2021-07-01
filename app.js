const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const currentWeatherItemsEl = document.getElementById("current-weather-items");
const timezone = document.getElementById("time-zone");
const countryEl = document.getElementById("country");
const weatherForecastEl = document.getElementById("weather-forcast");
const currentTempEl = document.getElementById("current-temp");
var button = document.querySelector(".button");
var inputValue = document.querySelector(".inputValue");
var name = document.querySelector(".name");
var description = document.querySelector(".description");
var temperature = document.querySelector(".temp");   // Changed from temp



const days= ["sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday" , "Saturday", "Sunday"]
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



    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) +  ':' + (minutes < 10 ? '0' +minutes: minutes) + ' ' + `<span id="am-pm">${ampm}</span>`
    dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month]
}, 1000);




    document.querySelector(".button").addEventListener("click", function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
         let {latitude, longitude} = success.coords;
fetch("https://api.openweathermap.org/data/2.5/weather?q="+inputValue.value+"&exclude=hourly,minutely&units=metric&appid=3a6bc0c0cb362d0812c688e02eb124f8")
    .then(res =>res.json())
    .then(data => {

        console.log(data)
        showWeatherData(data);
    })


    })

})


function showWeatherData (data){
 let {humidity, pressure, temp} = data.main;
 let {speed} = data.main;
 let {sunrise, sunset} = data.sys
timezone.innerHTML = data.timezone;
countryEl.innerHTML = data.lat + 'N ' + data.lon+ 'E'

currentWeatherItemsEl.innerHTML =
    `<div class="weather-item">
                    
                   <div>Humidity</div>
                    <div>${humidity}%</div>
                </div>
                <div class="weather-item">
                    <div>Pressure</div>
                    <div>${pressure}</div>
                </div> 
                <div class="weather-item">
                    <div>Temperature</div>
                    <div>${temp}&#8451</div>  
                </div>

                <div class="weather-item">
                    <div>Sunrise</div>
                    <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
                </div> 
                <div class="weather-item">
                    <div>Sunset</div>
                    <div>${window.moment(sunset * 1000).format('HH:mm a')}</div>
                </div>`;




let otherDayForcast = ''
data.daily.forEach((day,idx) => {
    if(idx === 0) {
        currentTempEl.innerHTML =
            `<img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
                <div class="other">
                    <div class="day">Today</div>
                    <div class="temp">Night - ${day.temp.night}&#176; C</div>
                    <div class="temp">Day - ${day.temp.day}&#176; C</div>
                </div>`
    } else{
        otherDayForcast +=
            `<div class="weather-forcast-item">
            <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
            <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
            <div class="temp">Night - ${day.temp.night}&#176; C </div> 
            <div class="temp">Day - ${day.temp.day}&#176; C </div>

        </div>`

    }
})

    weatherForecastEl.innerHTML = otherDayForcast


}

/*

    document.querySelector(".button").addEventListener("click", () => {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + inputValue.value + " &exclude=hourly,minutely&units=metric&appid=3a6bc0c0cb362d0812c688e02eb124f8")
            .then(res => res.json())
            .then(data => {
                var nameValue = data['name'];
                var tempValue = data['main']['temp'];
                var descValue = data['weather'][0]['description'];

                name.innerHTML = nameValue;
                temp.innerHTML = `${tempValue} C`;
                description.innerHTML = descValue;


            })

            .catch(err => alert("City Not Found"))


    })
*/