
$(document).ready(function(){
    init()
    function init(){
    getLine()
}
})


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

    
    var usaURL = "https://api.covidtracking.com/v1/us/daily.json"
function getLine(data){


$.get(usaURL, function(usaDATA){
    usaDATA.reverse()
    console.log(usaDATA)
    var deathList = []
    var datesList = []
    var recoveredList = []
    
    for(let i = 0; i < usaDATA.length; i+=14){
        if(usaDATA[i].death == null){
            usaDATA[i].death = 0;
        }
        if(usaDATA[i].recovered == null){
            usaDATA[i].recovered = 0;
        }
        if(usaDATA[i].totalTestResults == null){
            usaDATA[i].totalTestResults = 0;
        }
        deathList.push(usaDATA[i].death)
        recoveredList.push(usaDATA[i].recovered)
        
        datesList.push(usaDATA[i].date.toString()[4] + usaDATA[i].date.toString()[5] + "/" + usaDATA[i].date.toString()[6] + usaDATA[i].date.toString()[7])
    }
  
    console.log(deathList)
    console.log(recoveredList)
var ctx = document.getElementById('myChart').getContext('2d');

var myChart = new Chart(ctx, {
    type: 'line',
   
    data: {
        labels: datesList,
        datasets: [{
            label:"Deaths",
            data: deathList,
            backgroundColor: [
             'rgba(255, 99, 132, 0.5)',
                'rgba(255, 99, 132, 0.5)',
               
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 3,

        }, {
            label:"Recovered",
            data:recoveredList,
            backgroundColor: [
                'rgba(75, 192, 192, 0.5)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 3,
         
        },
       ]

    },

        
        

   
    options: {
        responsive:true,
        scaleLabel: function(label) {
    return value.toLocaleString("en-US",{style:"currency", currency:"USD"});
        },
        

    
        scales: {
            yAxes: [{
                gridLines: {
                    display: true,
                    color: "rgba(255,255,255,0.2)"
                  },
                ticks: {
                    min:0,
                    fontColor: "white",
                    callback: function(value, index, values) {
                            if(parseInt(value) >= 1000){
                               return '' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            } else {
                               return '' + value;
                            }
                       } 
        }
            }],
            xAxes:[{
                gridLines: {
                    display: true,
                    color: "rgba(255,255,255,0.2)"
                  },ticks: {
                    min:0,
                    fontColor: "rgba(255,255,255,0.5)",
                  }
             } ]
            
           
        

        }
    }
   
});
})
}



