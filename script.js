let weather = {
    "apiKey": "884ec2a386f21e4175ed9a1035e10cc4",
    fetchWeather: function(city){
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey)
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    
    displayWeather: function(data){
        let city_code=data.cod;
        if (city_code==='400') { 
            swal("Empty Input", "Please enter any city", "error");
            reset();
        } else if (city_code==='404') {
            swal("Bad Input", "entered city didn't matched", "warning");
            reset();
        }
        else {
        //retreving important token from the json data
        const{ name } = data;
        const{ temp,humidity,feels_like } = data.main;
        const{ description,icon } = data.weather[0];
        const{ speed } = data.wind;

        //displaying the retrieved data on to the home page
        document.querySelector(".City").innerText = "Weather in "+name;
        document.querySelector(".temp").innerText = temp + " °C";
        document.querySelector(".description").innerText = description;
        document.querySelector(".icon").src =  "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".Humidity").innerText = "Humidity: " + humidity + " %";
        document.querySelector(".feels_like").innerText = "Feels like: " + feels_like + " °C";
        document.querySelector(".wind").innerText = "Wind speed: " +  (3.6*speed).toFixed(2)  + " Km/h";
        changeBg(data.weather[0].main);
        document.querySelector(".weather").classList.remove("loading");
        }
    },

    search:function(){
        
        this.fetchWeather(document.querySelector(".search-bar").value);
    }

};

//search button event listener
document.querySelector(".search button").addEventListener("click",function(){
  
    weather.search();
});

//enter key in search bar event listener
document.querySelector(".search-bar").addEventListener('keyup', function (e){

    if (e.key=="Enter") {
        weather.search();
    }
});

weather.fetchWeather("Delhi");

document.querySelector(".search-bar").addEventListener("keyup", function (e){

    if (e.key == "Enter") {
      weather.search();
    }
});

// function for the dynamic background change according to weather status
function changeBg(status) {
    if (status === 'Clouds') {
        document.body.style.backgroundImage = 'url(img/clouds.jpg)';
    } else if (status === 'Clear') {
        document.body.style.backgroundImage = 'url(img/clearsky.jpg)';
    } else if (status === 'Sunny') {
        document.body.style.backgroundImage = 'url(img/sunny.jpg)';
    } else if (status === 'Rain') {
        document.body.style.backgroundImage = 'url(img/rainy.jpg)';
    } else if (status === 'Drizzle') {
        document.body.style.backgroundImage = 'url(img/drizzle.jpg)';
    } else if (status === 'Mist' || status === 'Haze' || status === 'Fog') {
        document.body.style.backgroundImage = 'url(img/mist.jpg)';
    } else if (status === 'Snow') {
        document.body.style.backgroundImage = 'url(img/snow.jpg)';
    } else if (status === 'Thunderstorm') {
        document.body.style.backgroundImage = 'url(img/thunderstrom.jpg)';
    } else {
        document.body.style.backgroundImage = 'url(img/bg.jpg)';
    }
}
