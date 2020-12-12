 
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
var countriesURL = "https://corona.lmao.ninja/v3/covid-19/countries"
var worldURL = "https://corona.lmao.ninja/v3/covid-19/all"
var unitedStatesURL = 'https://corona.lmao.ninja/v2/states'


function sortByCases(numberOfCountries, countryData){
        for (let i = 0; i <= numberOfCountries; i++) {
            for (let j = 1; j <= numberOfCountries-1; j++) {
                if (countryData[j].cases > countryData[j - 1].cases) {
                    let tmp = countryData[j - 1];
                    countryData[j - 1] = countryData[j];
                    countryData[j] = tmp;
                }
            }
    }
}
function displayData(numberOfCountries, countryData){
    for(let i = 0; i < numberOfCountries; i++){                                                                            //cursor:pointer; onclick checkCountry(this.innerText)
        var countryDataSetup = "<tr id='underTable' class='rowColorChange'><td class='countryButton' style='text-align:left;'>" + countryData[i].country  + "</td><td style='color:rgb(0, 100, 200)'>" + numberWithCommas(countryData[i].cases) + "</td><td style='color:red'>" + numberWithCommas(countryData[i].deaths) + "</td><td style='color:green;'>" + numberWithCommas(countryData[i].recovered) + "</td><td style='color:orange;'>" + numberWithCommas(countryData[i].critical) + "</td><td style='color:#fada5e;'>" + numberWithCommas(countryData[i].active)    + "</td></tr>"
        document.getElementById('table').innerHTML += countryDataSetup
    }
}
function checkCountry(country, statesTableHeader, countryData){
    if(country == "USA"){
        $('#table').fadeOut(1000);
        setTimeout(function() { document.getElementById('table').innerHTML = "" }, 1000);
        setTimeout(function() { $('#loadingDiv').removeClass("hide"); }, 1000);
        $('#loadingDiv').addClass("fadeIn");
        var statesTableHeader = "<tr><th>STATE</th><th>CASES</th><th>DEATHS</th><th>RECOVERED</th><th>ACTIVE</th></tr>"
        setTimeout(function() { getStatesData(statesTableHeader); }, 3000);
    }else{
        $.get(countriesURL +  "/" + country, function(countryData){
            console.log(countryData)
            localStorage.removeItem("countryData", JSON.stringify(countryData));
            localStorage.setItem("countryData", JSON.stringify(countryData));
            window.location = "../html/charts.html"
        })
    }
}
function timeDiffCalc(dateFuture, dateNow) {
    let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;

    // calculate days
    const days = Math.floor(diffInMilliSeconds / 86400);
    diffInMilliSeconds -= days * 86400;
    console.log('calculated days', days);

    // calculate hours
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;
    console.log('calculated hours', hours);

    // calculate minutes
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    diffInMilliSeconds -= minutes * 60;
    console.log('minutes', minutes);

    let difference = '';
    if (days > 0) {
      difference += (days === 1) ? `${days} day, ` : `${days} days, `;
    }



    difference += (minutes === 0 || hours === 1) ? `${minutes} minutes` : `${minutes} minutes`; 

    return difference;
  }

function getWorldData(){
    $.get(worldURL, function(worldData){
        var updatedAgo =  timeDiffCalc(new Date(), new Date(worldData.updated));
        document.getElementById('updatedAgo').innerHTML = "Updated "  + updatedAgo + " ago"
        document.getElementById('worldData').innerHTML += "<td style='text-align:left;'> WORLD </td><td style='color:rgb(0, 100, 200)'>" + numberWithCommas(worldData.cases) + "</td><td style='color:red'>" + numberWithCommas(worldData.deaths) + "</td><td style='color:green;'>" + numberWithCommas(worldData.recovered) + "</td><td style='color:orange;'>" + numberWithCommas(worldData.critical) + "</td><td style='color:#fada5e;'>" + numberWithCommas(worldData.active) + "</td>"
        document.getElementById('totalCases').innerText = numberWithCommas(worldData.cases)
        document.getElementById('totalDeaths').innerText = numberWithCommas(worldData.deaths)
        document.getElementById('totalRecovered').innerText = numberWithCommas(worldData.recovered)
        document.getElementById('totalCritical').innerText = numberWithCommas(worldData.critical)
        document.getElementById('totalActive').innerText = numberWithCommas(worldData.active)
        document.getElementById('totalTests').innerText = numberWithCommas(worldData.tests)
    })
}

function drawChart(countryData) {

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

  function checkForError(){
    if(document.getElementById('underTable') == null){
        window.location = "../html/error.html"
    }
  }

