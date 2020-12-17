
$(document).ready(function(){
    init()
    function init(){
    getChart()
}
})

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function getChart(){
if(localStorage.getItem("countryData") !== null){ // if local storage is not empty
    console.log("LOCAL STORAGE IS NOT EMPTY")
    var countryRetrieved = localStorage.getItem("countryData");
    var countryChosen = JSON.parse(countryRetrieved);
    document.getElementById('countryID').innerHTML = countryChosen.country
    document.getElementById('pageTitle').innerHTML = countryChosen.country
    document.getElementById('population').innerHTML = "POPULATION : " + numberWithCommas(countryChosen.population)
    runIt(countryChosen)
}else{
    console.log("LOCAL STORAGE IS EMPTY")
    URL = "https://corona.lmao.ninja/v3/covid-19/all"
    document.getElementById('countryID').innerHTML = "World"
    document.getElementById('pageTitle').innerHTML = "World"
    $.get(URL, function(chosenData){
        document.getElementById('population').innerHTML = "POPULATION : " + numberWithCommas(chosenData.population)
        runIt(chosenData)
    })
}
function runIt(data){
    if(screen.width < 600){
         
    }


var ctx = document.getElementById('myChart').getContext('2d');
Chart.defaults.global.legend.display = false;
var myChart = new Chart(ctx, {
    type: 'bar',
   
    data: {
        labels: ['Cases', 'Deaths', 'Recovered'],
        datasets: [{
            data: ["\t" + data.cases, "\t" + data.deaths, "\t" + data.recovered],
            backgroundColor: [
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 99, 132, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 3
        }],
        
        
    },
   
    options: {
        scaleLabel: function(label) {
    return value.toLocaleString("en-US",{style:"currency", currency:"USD"});
},   
        scales: {
            yAxes: [{
                ticks: {
                    fontColor:"white",
                    callback: function(value, index, values) {
                            if(screen.width > 1200){
                                if(parseInt(value) >= 1000){
                                return '' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                } else {
                                return '' + value;
                                }
                            }else{
                                console.log(screen.width)
                                return (value < 1000000) ? value/1000 + 'K' : value/1000000 + 'M';
                            }
                       } 
        },
        gridLines: {
            color: "rgba(255,255,255,0.25)"
          },
            }],
        
        xAxes: [{
            ticks:{
                fontColor:"white",
            },
            gridLines: {
                color: "rgba(255,255,255,0.25)"
              },
        }]
        },tooltips: {
          callbacks: {
                label: function(tooltipItem, data) {
                    var value = data.datasets[0].data[tooltipItem.index];
                    if(parseInt(value) >= 1000){
                               return '' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            } else {
                               return '' + value;
                            }
                }
          } // end callbacks:
        },
    }
});

}
}


