var countriesURL = "https://corona.lmao.ninja/v3/covid-19/countries";
var worldURL = "https://corona.lmao.ninja/v3/covid-19/all";

$(document).ready(function () {
  init();
  function init() {
    getWorldData();
    $.get(countriesURL, function (countryData) {
      var numberOfCountries = countryData.length;
      sortByCases(numberOfCountries, countryData);
      displayData(numberOfCountries, countryData);
      checkForError();
    });
  }
});
