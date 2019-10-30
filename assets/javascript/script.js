var history = [];
function initSearch() {
    var searchParam = $('#searchArea').val();
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?apikey=166a433c57516f51dfab1f7edaed8413&q=" + searchParam + "&units=imperial",
        method: "GET"
    }).then(function (response) {
