var history = [];

$('#searchArea').val('charlotte');
initSearch();
$('#searchArea').val('')

function initSearch() {
    var searchParam = $('#searchArea').val();
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?apikey=166a433c57516f51dfab1f7edaed8413&q=" + searchParam + "&units=imperial",
        method: "GET"
    }).then(function (response) {
        var today = new Date();
        var date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
        var icon = response.weather[0].icon
        $('#cityName').html(response.name + " " + date + "<img id='ico'>")
        $('#ico').attr('src', 'http://openweathermap.org/img/wn/'+ icon +'.png')
        $('#temp').html("Temperature: " + response.main.temp + "°F")
        $('#humid').html("Humidity: " + response.main.humidity)
        $('#windSpeed').html("Wind Speed: " + response.wind.speed)
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/uvi?appid=166a433c57516f51dfab1f7edaed8413&lat=" + response.coord.lat + "&lon=" + response.coord.lon + "",
            method: "GET"
        }).then(function (response) {
            $('#uvIndex').html("UVIndex: " + response.value)
        })
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/forecast?apikey=166a433c57516f51dfab1f7edaed8413&q=" + searchParam + "&units=imperial",
            method: "GET"
        }).then(function (response) {
            //I know this isn't dry, I just don't have the spare brainpower to make it so
            var day1 = $('#day1')
            var day2 = $('#day2')
            var day3 = $('#day3')
            var day4 = $('#day4')
            var day5 = $('#day5')
            
            console.log(response.list[1].wind.speed)
            
        })


    })
}