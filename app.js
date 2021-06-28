

fetch("http://dataservice.accuweather.com/forecasts/v1/daily/5day/{newyork}")
.then(res => res.json())
.then(data => console.log(data));