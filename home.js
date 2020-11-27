
   
    function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
var countriesURL = "https://corona.lmao.ninja/v3/covid-19/countries"
var worldURL = "https://corona.lmao.ninja/v3/covid-19/all"

    $(document).ready(function(){
        init()
        function init(){
            getWorldData()
            function getWorldData(){
                $.get(worldURL, function(worldData){
                    document.getElementById('worldData').innerHTML += "<td style='text-align:left;'> WORLD </td><td style='color:blue'>" + numberWithCommas(worldData.cases) + "</td><td style='color:red'>" + numberWithCommas(worldData.deaths) + "</td><td style='color:green;'>" + numberWithCommas(worldData.recovered) + "</td><td style='color:orange;'>" + numberWithCommas(worldData.critical) + "</td><td style='color:#fada5e;'>" + numberWithCommas(worldData.active) + "</td>"
                    document.getElementById('totalCases').innerText = numberWithCommas(worldData.cases)
                    document.getElementById('totalDeaths').innerText = numberWithCommas(worldData.deaths)
                    document.getElementById('totalRecovered').innerText = numberWithCommas(worldData.recovered)
                    document.getElementById('totalCritical').innerText = numberWithCommas(worldData.critical)
                    document.getElementById('totalActive').innerText = numberWithCommas(worldData.active)
                    document.getElementById('totalTests').innerText = numberWithCommas(worldData.tests)
                })
            } 
            
            $.get(countriesURL, function(countryData){
                var numberOfCountries = countryData.length
                console.log(countryData)
                for (let i = 0; i < numberOfCountries; i++) {
                    for (let j = 1; j < numberOfCountries-1; j++) {
                        if (countryData[j].cases > countryData[j - 1].cases) {
                            let tmp = countryData[j - 1];
                            countryData[j - 1] = countryData[j];
                            countryData[j] = tmp;
                        }
                    }
            }
                for(let i = 0; i < numberOfCountries-200; i++){
                    var countryDataSetup = "<tr class='talal'><td style='text-align:left;' onclick='console.log(countryData.indexOf(countryData[i].country))'>" + countryData[i].country  + "</td><td style='color:blue'>" + numberWithCommas(countryData[i].cases) + "</td><td style='color:red'>" + numberWithCommas(countryData[i].deaths) + "</td><td style='color:green;'>" + numberWithCommas(countryData[i].recovered) + "</td><td style='color:orange;'>" + numberWithCommas(countryData[i].critical) + "</td><td style='color:#fada5e;'>" + numberWithCommas(countryData[i].active)    + "</td></tr>"
                    document.getElementById('table').innerHTML += countryDataSetup
                    if (i % 2 == 0){
                        document.getElementsByClassName('talal')[i].style.backgroundColor = "#eee"
                    }
                }
            })
            
}
})

// Load google charts


// Draw the chart and set the chart values

$.get(countriesURL, function(countryData){
  
  google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
function drawChart() {

  console.log(countryData[207].country)
  var data = google.visualization.arrayToDataTable([
  ['Data', 'Number'],
  ['Deaths', countryData[207].deaths],
  ['Recovered', countryData[207].recovered],
  ['Active', countryData[207].active],
  ['Critical', countryData[207].critical]])
  var options = {'title':countryData[207].country + " " + numberWithCommas(countryData[207].cases) + " cases.", 'width':550, 'height':400};
  var chart = new google.visualization.PieChart(document.getElementById('piechart'));
chart.draw(data, options);
}
 
// Display the chart inside the <div> element with id="piechart"

});


