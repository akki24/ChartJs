
// Windows load event to display chart
$(document).ready(function(){
    
	window.onload=function(){
		ShowPlanBarChart();
    };

});

// click event on button show plan success bar chart
$(document).ready(function(){
	
    $("#button1").click(function(){
		// enable button for click
        document.getElementById("button3").disabled=false;
		hideDropDown();
		ShowPlanBarChart();
    })
	
});

// click event on button show script success bar chart
$(document).ready(function(){
    
	$("#button2").click(function(){
		// enable button for click
		document.getElementById("button3").disabled=false;
		hideDropDown();
		scriptResultsChart();
		
    });
	
});

// click event on button iteration success bar chart
$(document).ready(function(){

    $("#button3").click(function(){
		
        showDropDown();
		iterationChart();
		// disable button for consecutive click
		document.getElementById("button3").disabled=true;
		hideDropDown();
		
    });
		
});

// change event for dropdown list
$(document).ready(function(){

    $("#selectId").change(function(){
		iterationChart();
    });
	
});



// function for drawing plan success bar chart
function ShowPlanBarChart(){
	// read json file from proxy sever 
	$.getJSON("http://localhost:8080/sentry.json", function(obj){
		
		var dateLables=[];
		var planSuccessRate=[];
		var barColor=['#ff0000','#ffff00','#00ffff','#00ff00','#ff00cc'];
		var data=obj.result;
		
		// iterating over json data and pushing data in array
		for(var i in data)
		{
			var planDate= data[i].date;
			var planSuccessPercent=data 	[i].plan.successPercentage;
			planSuccessRate.push(planSuccessPercent);
			dateLables.push(planDate);
		}
		
		// data object for chart.js
		var planData={
			labels:dateLables,
			datasets:[{
				label:"PLAN",
				data: planSuccessRate,
				backgroundColor:barColor
			}]
		};	

		// options for charts
		var	options={
			responsive: true,
			maintainAspectRatio: false,
			events:['click'],
			 legend: {
				display: false,
				position: 'right',
				labels: {
					fontColor: 'rgb(255, 99, 132)'
				}
			},
			title:{
				display:true,
				text:"Plan Success Percent per day",
				fontSize:30,
				fontColor:'blue'			
				},
				scales: {
					yAxes: [{
						scaleLabel: {
							display: true,
							labelString: 'Plan Success Rate',
							fontSize:20,
							fontColor:'blue'
					    },
						ticks: {
							
							fontSize:20,
                            min: 0,
							max: 100,
							stepSize: 20,
							fontColor:'black'
						}
					}],
					xAxes: [{
						scaleLabel: {
							display: true,
							labelString: 'Plan Date',
							fontSize:20,
							fontColor:'blue'
						  },
						ticks:{
							fontSize:20,
							fontColor:'black'  
						},
						barPercentage: 0.6
					}]
						
				} 
									
		}
		//document.getElementById("myChart").height=130;
		
		//draw a plan chart
		var myChart=document.getElementById("myChart").getContext('2d');
			
		var myBarChart = Chart.Bar(myChart, {
					
			data: planData,
			options:options,
			
		});
				
	});
	
	
}

// function for drawing script result bar chart
function scriptResultsChart(){
	// read json file from proxy sever 
	$.getJSON("http://localhost:8080/sentry.json", function(obj){
		// data for labels on x-axis
		var scriptDateLabels=[];
		// data on y-axis
		var scriptSuccessRate=[];
		var barColor=['#ff0000','#00ffff','#00ff00','#0000ff','#ff00cc'];
		var data=obj.result;
        
		// iterating over json data and pushing data in array
		for(var i in data)
		{
			var scriptDate= data[i].date;
			var scriptSuccessPercent=data[i].scriptResults[0].successPercentage;
			
			scriptSuccessRate.push(scriptSuccessPercent);
			scriptDateLabels.push(scriptDate);
		
		}
		
		//data object for chart.js 
		var scriptData={
			labels:scriptDateLabels,
			datasets:[{
				label:"ScriptResults",
				data: scriptSuccessRate,
				backgroundColor:barColor
			}]
		};	
	
		// options for chart.js
		var	options={
			events:['click'],
			legend: {
				display: false,
				position: 'right',
				labels: {
					fontColor: 'rgb(255, 99, 132)'
				}
			},
			title:{
				display:true,
				text:"Script Success Rate per day",
				fontSize:25,
				fontColor:'blue'
				
			},
			scales: {
				yAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'Script Success Rate',
						fontSize:20,
						fontColor:'blue'
					},
					ticks: {
						fontSize:20,
                        min: 0,
						max: 100,
						stepSize: 20,
						fontColor:'black'
                    }
				}],
				xAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'Script Date',
						fontSize:20,
						fontColor:'blue'
					},
					ticks:{
						fontSize:20 ,
						fontColor:'black'								
					},
					  barPercentage: 0.6
				}]
			}
		}		
		// draw script chart
		var myChart=document.getElementById("myChart").getContext('2d');
		var myBarChart = Chart.Bar(myChart, {
			data: scriptData,
			options:options,
		});			
    });
}

// function for drawing iteration success bar chart
function iterationChart(){
	// read json file from proxy sever 
	$.getJSON("http://localhost:8080/sentry.json", function(obj){
		// data on x-axis
		var iterationNumberLabels=[];
		// data on y-aaxis
		var iterationSuccessRate=[];
		var barColor=['#ff0000','#ffff00','#cccccc','#00ff00','#ff00cc'];
		
		
		var data=obj.result;
			
		// iterating over data in json file
		for(var i in data)
		{
			// Get selected date from dropdown
			var e = document.getElementById("selectId");
			var selectedDate = e.options[e.selectedIndex].value;
			
			// provide data to chart depending on date 
			if(selectedDate==data[i].date){
				var iterationData=data[i].scriptResults[0].iterations;
				for(var j in iterationData){
					var iterationNumber= parseInt(j)+1;
					var iterationSuccessPercent=iterationData[j].successPercentage;
					iterationSuccessRate.push(iterationSuccessPercent);
					iterationNumberLabels.push(iterationNumber);
						
				}
				break;
			}	
		}
		
		var iterationdata={
			labels:iterationNumberLabels,
			datasets:[{
				label:"iterationResults",
				data: iterationSuccessRate,
				backgroundColor:barColor
			}]
		};	
			
			
			
		var	options={
			events:['click'],
			legend: {
				display: false,
				position: 'right',
				labels: {
					fontColor: 'rgb(255, 99, 132)'
				}
			},
			title:{
				display:true,
				text:"Iteration Success Percent on "+selectedDate,
				fontSize:25,
				fontColor:'blue'
				
			},
			scales: {
				yAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'iteration  Success Percent',
						fontSize:20,
						fontColor:'blue'
					},
					ticks: {
						fontSize:20, 
						min: 0,
						max: 100,
						stepSize: 20,
						fontColor:'black'
					}
			
				}],
				xAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'Iteration Number',
						fontSize:20,
						fontColor:'blue'
					},
					  
					ticks:{
						fontSize:20,
						fontColor:'black'
					},
					  
					barPercentage: 0.4
				}]
					
			} 
								
		}
			
		// Draw bar chart
		var myChart=document.getElementById("myChart").getContext('2d');
		
		var myBarChart = Chart.Bar(myChart, {
				
			data: iterationdata,
			options:options,
		});
			
    });
}

	

// show dropdown option for selecting date in iteration chart
function showDropDown() {
		
		$.getJSON("http://localhost:8080/sentry.json", function(obj) {
			var data=obj.result;
			
			
			for(var i in data){
				$("#selectId").append("<option>" + data[i].date + "</option>");
			}
			
		document.getElementById("myDropdown").classList.toggle("show");	
    })
	}


// hide dropdown option in other chart
function hideDropDown(){
	// delete dropdown option after clicking other buttons
	$("#selectId option").remove();
	
	
	// close dropdown after clicking other chart button
	if (!event.target.matches('#button3')) {
		var dropdowns = document.getElementsByClassName("dropdown-content");
		var i;
		for (i = 0; i < dropdowns.length; i++) {
		  var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show');
			}
		}
	}

}