var searchBtn = document.getElementById('search-button');
var historyContainer = document.getElementById('history');


fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + 'Chicago' + '&limit=1&appid=cc23144d939d4c97fd8e518be3041b20')
    .then(function (responseGeo) {
        return responseGeo.json();
    })
    .then(function (dataGeo) {
        console.log(dataGeo);
        for (var i = 0; i < dataGeo.length; i++) {
            var lon = (dataGeo[i].lon);
            var lat = (dataGeo[i].lat);
            fetch('http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=cc23144d939d4c97fd8e518be3041b20')
                .then(function (responseWeather) {
                    return responseWeather.json();
                })
                .then(function (dataWeather) {
                    console.log(dataWeather);
                })
        }
    })
