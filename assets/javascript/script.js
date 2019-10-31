function autoSearch(searchName){
    
    $('#searchArea').val(searchName);
    initSearch();
    $('#searchArea').val('')
}

autoSearch('Charlotte')

function initSearch() {
    var searchParam = $('#searchArea').val();
    searchListInit(searchParam);
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?apikey=166a433c57516f51dfab1f7edaed8413&q=" + searchParam + "&units=imperial",
        method: "GET"
    }).then(function (response) {
        date = moment().format('MM/DD/YYYY');
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
            for (let i = 0; i < 6; i++) {
                var cResponse = response.list[(8*i)]
                var d = moment().add(i,'days').format('MM/DD/YYYY')
                if (i===5) {cResponse = response.list[(8*i)-1];}
                var cDay = ($('#day'+ i))
                var cIcon = cResponse.weather[0].icon
                cDay.children('.date').html('<p>' + d + '</p>')
                cDay.children('.icon').html('<img src="http://openweathermap.org/img/wn/'+ cIcon +'.png" alt="weather icon">')
                cDay.children('.temp').html('Temperature: '+ cResponse.main.temp)
                cDay.children('.humid').html('Humidity: ' + cResponse.main.humidity + '%')
            }
            
        })


    })
}
function searchListInit(searchName) {
    $('.input-group').after('<p onclick="autoSearch($(this).text())" class="row item">' + searchName + '</p>');
    
}