var historyArr = ['']

// Checks if a history list already exists
if (localStorage.getItem('historyList') !== 'null') {
    historyArr = JSON.parse(localStorage.getItem('historyList'))
}
// this function originally had a purpose in locally storing, but now it only exists to have the page filled with content on load
function autoSearch(searchName) {
    
    $('#searchArea').val(searchName);
    initSearch();
    $('#searchArea').val('')
}

autoSearch('Charlotte')

// This function controls the entire process of getting api results and putting them in the right places
function initSearch() {
    var searchParam = $('#searchArea').val();
    checkHistory(searchParam);
    // ajax url call gets the data for today's weather
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?apikey=166a433c57516f51dfab1f7edaed8413&q=" + searchParam + "&units=imperial",
        method: "GET"
    }).then(function (response) {
        date = moment().format('MM/DD/YYYY');
        var icon = response.weather[0].icon
        $('#cityName').html(response.name + " " + date + "<img id='ico'>")
        $('#ico').attr('src', 'https://openweathermap.org/img/wn/' + icon + '.png')
        $('#temp').html("Temperature: " + response.main.temp + "°F")
        $('#humid').html("Humidity: " + response.main.humidity)
        $('#windSpeed').html("Wind Speed: " + response.wind.speed)
        // this ajax url call gets the UVIndex from openweathermap.org
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/uvi?appid=166a433c57516f51dfab1f7edaed8413&lat=" + response.coord.lat + "&lon=" + response.coord.lon + "",
            method: "GET"
        }).then(function (response) {
            $('#uvIndex').html("UVIndex: " + response.value)
        })
        // this ajax url call gets the 5-day forecast
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?apikey=166a433c57516f51dfab1f7edaed8413&q=" + searchParam + "&units=imperial",
            method: "GET"
        }).then(function (response) {
            for (let i = 0; i < 6; i++) {
                var cResponse = response.list[(8 * i)]
                var d = moment().add(i, 'days').format('MM/DD/YYYY')
                if (i === 5) { cResponse = response.list[(8 * i) - 1]; }
                var cDay = ($('#day' + i))
                var cIcon = cResponse.weather[0].icon
                cDay.children('.date').html('<p>' + d + '</p>')
                cDay.children('.icon').html('<img src="https://openweathermap.org/img/wn/' + cIcon + '.png" alt="weather icon">')
                cDay.children('.temp').html('Temperature: ' + cResponse.main.temp)
                cDay.children('.humid').html('Humidity: ' + cResponse.main.humidity + '%')
            }

        })


    })
}
//  This function runs whenever someone searches something and, after checking if it already exists, adds it to the list
function checkHistory(searchName) {
    for (let i = 0; i < historyArr.length; i++) {
        if (searchName === historyArr[i]) {
            historyArr.splice(i, 1)
        }
    }
    historyArr.push(searchName)
    renderHistory();
}

// this function re-renders the history list whenever it's run
function renderHistory() {
    $('.item').remove();
    for (let i = 0; i < historyArr.length; i++) {
        $('.input-group').after('<p onclick="autoSearch($(this).text())" class="row item">' + historyArr[i] + '</p>');
        localStorage.clear();
    }
    localStorage.setItem('historyList', JSON.stringify(historyArr));
}
