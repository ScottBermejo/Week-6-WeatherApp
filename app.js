const apiKey = "4102a266be2c22b0569905fabdf0f617";
// const form = document.querySelector(".weatherApp form");
var initialState = $('#reset').clone();
var weatherApp = $('#weatherApp');
var selectedCity;
var url;
$("input").keyup(function () {
    selectedCity = $(this).val();
})
    .keyup();

function fetchData() {
    $.get(url, function (res) {
        var data = res;
        var temp = Math.round((data.main.temp - 273.15) * 9 / 5 + 32);
        var temp_max = Math.round((data.main.temp_max - 273.15) * 9 / 5 + 32);
        var temp_min = Math.round((data.main.temp_min - 273.15) * 9 / 5 + 32);
        var feels_like = Math.round((data.main.feels_like - 273.15) * 9 / 5 + 32);
        var humidity = data.main.humidity;

        let unix_timestamp = data.dt;
        var date = new Date(unix_timestamp * 1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();

        $('#reset').html(`<h2><strong>${selectedCity.toUpperCase()}</strong></h2>`);
        $('#reset').append(`<p class="time" >${date}</p>`);
        $('#reset').append(`<p class="time" >${hours} : ${minutes.substr(-2)} : ${seconds.substr(-2)} </p>`);
        $('#reset').append(`<p class="temps" >Weather: ${data.weather[0].main} </p>`);
        $('#reset').append(`<p class="temps" >Description: ${data.weather[0].description}</p>`);
        $('#reset').append(`<p class="temps" >Current Temp: ${temp} ℉</p>`);
        $('#reset').append(`<p class="temps" >HI: ${temp_max} ℉</p>`);
        $('#reset').append(`<p class="temps" >LOW: ${temp_min} ℉</p>`);
        $('#reset').append(`<p class="temps" >Feels Like: ${feels_like} ℉</p>`);
        $('#reset').append(`<p class="temps" >Humidity: ${humidity}</p>`);
        $('#reset').append(`<button id="changeCity" class="resetBtn btn btn-info" >Change City</button>`);

        var backgroundImage = chooseImage(data.weather[0].main)
        $("body").css("background-image", "url(" + backgroundImage + ")");
        // $(".weatherApp").css("background-color","gray");

        $('#changeCity').on('click', function (e) {
            $('#reset').replaceWith(initialState);
        })


    })
}
function chooseImage(weather) {
    if (weather == "Thunderstorm") {
        return 'https://www.itl.cat/pngfile/big/6-63017_beautiful-desktop-live-wallpaper-free-thunderstorm-lightning-strike.jpg'
    }
    if (weather == "Drizzle") {
        return 'https://www.shemazing.net/wp-content/uploads/2017/10/drizzle-656x437.jpg'
    }
    if (weather == "Rain") {
        return 'https://townsquare.media/site/10/files/2019/06/RS12193_467157357-scr.jpg?w=980&q=75'
    }
    if (weather == "Snow") {
        return 'https://s7d2.scene7.com/is/image/TWCNews/nyc_snow_storm_gettyimages-938154410jpg'
    }
    if (weather == "Clear") {
        return 'https://windeurope.org/wp-content/uploads/wind-turbines-clear-weather-yellow-flower-field-vibrant-blue-sky.jpg'
    }
    if (weather == "Clouds") {
        return 'https://www.keremeosreview.com/wp-content/uploads/2019/09/18730383_web1_clouds-1571778_1920.jpg'
    }
    if (weather == "Mist") {
        return 'https://d1acid63ghtydj.cloudfront.net/09-10-2018/t_bc3e74a6f3cd4aa7827169e691066448_name_fog.JPG'
    }

}
$('#searchBtn').on('click', function (e) {
    e.preventDefault();
    url = `http://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${apiKey}`;
    $(".reset").remove();
    fetchData();
})

