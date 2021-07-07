const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const currentWeatherItemsEl = document.getElementById("current-weather-items");
const timezone = document.getElementById("time-zone");
const countryEl = document.getElementById("country");
const weatherForecastEl = document.getElementById("weather-forcast");
const currentTempEl = document.getElementById("current-temp");
var button = document.querySelector(".button");
var cityInput = document.querySelector(".inputValue");
var name = document.querySelector(".name");
var description = document.querySelector(".description");
var temperature = document.querySelector(".temp");   // Changed from temp



const days= ["sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday" , "Saturday", "Sunday"]
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]




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
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityInput.value}&units=metric&cnt=5&appid=83aecb3a10b7add7d0c3335d3d4db649`)
            .then(res =>res.json())
            .then(data => {

                console.log(data)
                showWeatherData(data);

            })



    })

})


function showWeatherData (data) {
    let {humidity, pressure, temp} = data.list[0].main;
    let {sunrise, sunset} = data.city;


    timezone.innerHTML = data.city.name
    countryEl.innerHTML = data.city.coord.lat+ 'N ' + data.city.coord.lon + 'E'

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


    let {temp_max, temp_min} = data.list[0].main


    let otherDayForcast = ''
    data.list.forEach((day, idx) => {
        if (idx === 0) {
            currentTempEl.innerHTML =
                `<img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
                <div class="other">
                    <div class="day">Today</div>
                    <div class="temp">Night - ${temp_min}&#176; C</div>
                    <div class="temp">Day - ${temp_max}&#176; C</div>
                </div>`
        } else {
            otherDayForcast +=
                `<div class="weather-forcast-item">
            <div class="day">${window.moment(day.dt * 1000).format('ddd')}</div>
            <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
            <div class="temp">Night - ${data.list[1].main.temp_min}&#176; C </div> 
            <div class="temp">Day - ${data.list[1].main.temp_min}&#176; C </div>

        </div>`

        }
    })

    weatherForecastEl.innerHTML = otherDayForcast
}

