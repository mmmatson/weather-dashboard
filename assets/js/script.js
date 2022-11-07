var searchBtn = document.getElementById('search-button');
var historyContainer = document.getElementById('history');
var currentCityDate = document.getElementById('current-city-date');
var forecast = document.getElementById('forecast');
var currentWeather = document.getElementById('current-weather');


fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + 'Chicago' + '&limit=1&appid=cc23144d939d4c97fd8e518be3041b20')
    .then(function (responseGeo) {
        return responseGeo.json();
    })
    .then(function (dataGeo) {
        console.log(dataGeo);
        for (var i = 0; i < dataGeo.length; i++) {
            var lon = (dataGeo[i].lon);
            var lat = (dataGeo[i].lat);
            var nameEl = (dataGeo[i].name);
            fetch('http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=cc23144d939d4c97fd8e518be3041b20&units=imperial')
                .then(function (responseWeather) {
                    return responseWeather.json();
                })
                .then(function (dataWeather) {
                    currentCityDate.textContent = nameEl + " " + dataWeather.list[0].dt_txt;
                    var icon = document.createElement('i');
                    var temparature = document.createElement('p');
                    var wind = document.createElement('p');
                    var humidity = document.createElement('p');
                    currentWeather.appendChild(icon)
                    currentWeather.appendChild(temparature)
                    currentWeather.appendChild(wind)
                    currentWeather.appendChild(humidity)
                    icon.textContent = dataWeather.list[0].weather.icon;
                    temparature.textContent = "Temp: " + dataWeather.list[0].main.temp +"\u00B0 F";
                    wind.textContent = "Wind: " + dataWeather.list[0].wind.speed + "mph";
                    humidity.textContent = "Humidity: " + dataWeather.list[0].main.humidity +"%";
                    for (var i = 0; i < dataWeather.list.length; i++) {
                        //Only append elements for these items in the array to get 5 day forecast
                        if (i===7 || i===15|| i===23|| i===31|| i===39) {
                        var forecastContainer = document.createElement('div');
                        var forecastCard = document.createElement('div');
                        var dateForecast = document.createElement('p');
                        var iconForecast = document.createElement('i');
                        var temparatureForecast = document.createElement('p');
                        var windForecast = document.createElement('p');
                        var humidityForecast = document.createElement('p');
                        forecastContainer.setAttribute('class', "column")
                        forecastCard.setAttribute('class', "callout primary")
                        forecast.appendChild(forecastContainer);
                        forecastContainer.appendChild(forecastCard);
                        forecastCard.appendChild(dateForecast);
                        forecastCard.appendChild(iconForecast);
                        forecastCard.appendChild(temparatureForecast);
                        forecastCard.appendChild(windForecast);
                        forecastCard.appendChild(humidityForecast);
                        dateForecast.textContent = dataWeather.list[i].dt_txt;
                        iconForecast.textContent = dataWeather.list[i].weather.icon;
                        temparatureForecast.textContent = "Temp: " + dataWeather.list[i].main.temp +"\u00B0 F";
                        windForecast.textContent = "Wind: " + dataWeather.list[i].wind.speed;
                        humidityForecast.textContent = "Humidity: " + dataWeather.list[i].main.humidity +"%";
                    }
                    }
                })

        }
    })

