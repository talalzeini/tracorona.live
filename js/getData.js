

var countriesURL = "https://corona.lmao.ninja/v3/covid-19/countries"
var worldURL = "https://corona.lmao.ninja/v3/covid-19/all"
var unitedStatesURL = 'https://corona.lmao.ninja/v2/states'


$(document).ready(function(){
        init()
        function init(){
            getWorldData()
            $.get(countriesURL, function(countryData){
             
                var numberOfCountries = countryData.length
                sortByCases(numberOfCountries, countryData);
                displayData(numberOfCountries, countryData);
                checkForError();
               
            }) 
}
})

function getStatesData(statesTableHeader){
    $.get(unitedStatesURL, function(statesData){
        $('#loadingDiv').fadeOut(3000);
        $('#table').fadeIn(3000);
        setTimeout(function() { $('#loadingDiv').addClass("hide"); }, 3000);
        var numberOfStates = statesData.length
        document.getElementById('table').innerHTML += statesTableHeader
        for(let j = 0; j < numberOfStates; j++){
        var statesDataSetup = "<tr class='rowColorChange'><td  style='text-align:left;'>" + statesData[j].state  + "</td><td style='color:blue'>" + numberWithCommas(statesData[j].cases) + "</td><td style='color:red'>" + numberWithCommas(statesData[j].deaths) + "</td><td style='color:green;'>" + numberWithCommas(statesData[j].recovered) + "</td><td style='color:#fada5e;'>" + numberWithCommas(statesData[j].active)  + "</td></tr>"
        document.getElementById('table').innerHTML += statesDataSetup
        if (j % 2 == 0){ // if even
            document.getElementsByClassName('rowColorChange')[j].style.backgroundColor = "#eee"
        }
        }
    })
}

// Load google charts

// $.get(countriesURL, function(countryData){
// google.charts.load('current', {'packages':['corechart']});
// google.charts.setOnLoadCallback(drawChart);
// function drawChart() {
//   sortByCases(countryData.length, countryData)
//   var data = google.visualization.arrayToDataTable([
//   ['Data', 'Number'],
//   ['Deaths', countryData[0].deaths],
//   ['Recovered', countryData[0].recovered],
//   ['Critical', countryData[0].critical],
//   ['Active', countryData[0].active]])
  
//   var options = {'title':countryData[0].country + " " + numberWithCommas(countryData[0].cases) + " cases.", 'width':550, 'height':400, 'slices': {0: {color:'red'}, 1: {color:'green'}, 2:{color:'orange'}, 3:{color:'yellow'}}};
//   var chart = new google.visualization.PieChart(document.getElementById('piechart'));
// chart.draw(data, options);
// }
 
// // Display the chart inside the <div> element with id="piechart"

// });


