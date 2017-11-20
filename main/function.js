
$.getJSON("data.json", function(json) {

	function createCoverPageSlide(slide, i){

	// add quiz title 
	var title = document.createElement("h2");
	title.appendChild(document.createTextNode(json[i].title));
	slide.appendChild(title);

	// add intro paragraph 
	var subTitle = document.createElement("p");
	subTitle.appendChild(document.createTextNode(json[i].intro));
	slide.appendChild(subTitle);

	// add button 
	// click to process to next slide 
	var nextButton = document.createElement("button");
	nextButton.appendChild(document.createTextNode("Take the questionnaire >>"));
	nextButton.className = "next";
	nextButton.id = "questionnaire";
	slide.appendChild(nextButton);

	// add portfolio drop-down 
	var numOfOptions = json[i].dropDown.length; // get amount of options 
	var dropDown = document.createElement("select");
	dropDown.className = "drop-down";

	// add options to drop-down 
	for (var j = 0; j < numOfOptions; j++) {
		var option = document.createElement("option");
		option.appendChild(document.createTextNode(json[i].dropDown[j]));
		dropDown.appendChild(option);
	}

	slide.appendChild(dropDown);
}


function createSectionSlide(slide, i){

	var title = document.createElement("h2"); 
	title.appendChild(document.createTextNode(json[i].intro))

	var intro = document.createElement("p");
	intro.appendChild(document.createTextNode(json[i].intro));
	slide.appendChild(intro);

	var previouButton = document.createElement("button");
	previouButton.appendChild(document.createTextNode("PREVIOUS"));
	previouButton.className = "previous";
	slide.appendChild(previouButton);

	var nextButton = document.createElement("button");
	nextButton.appendChild(document.createTextNode("NEXT"));
	nextButton.className = "next";
	slide.appendChild(nextButton);
}

function createQuestionSlide(slide, i){

	// Question 
	var question = document.createElement("h4");
	question.appendChild(document.createTextNode(json[i].question));
	slide.appendChild(question);

	// Form 
	var formElement = document.createElement("form"); 
	slide.appendChild(formElement); 
	formElement.id = "form" + i;

	// add Answers to the slide 
	var count = json[i].answers.length;
	for (var j = 0; j < count; j++) {

		function addRadioButton(text, value){

			var label = document.createElement("label");
			var radio = document.createElement("input");

			radio.setAttribute("type", "radio");
			radio.setAttribute("name", "radioButton");
			radio.setAttribute("value", value);
			radio.id = i;

			label.appendChild(radio);
			label.appendChild(document.createTextNode(text));

			formElement.appendChild(label);
		}

		addRadioButton(json[i].answers[j].text, json[i].answers[j].value);
    }

    // add chart to the question 
    if (json[i].img != null) {
    	// add img the slide 
        var img = document.createElement("IMG");
        img.setAttribute("src", json[i].img);
    	img.setAttribute("width", "100");
    	img.setAttribute("height", "100");
   		img.setAttribute("alt", "chart display error");
        slide.appendChild(img);
    }

    if (json[i].disclaimer != null){
    	// add disclaimer
        var disclaimer = document.createElement("p");
        disclaimer.appendChild(document.createTextNode(json[i].disclaimer));
        disclaimer.className = "disclaimer";
        slide.appendChild(disclaimer);
    }

    // Previous and Next button 
    var previouButton = document.createElement("button");
	previouButton.appendChild(document.createTextNode("PREVIOUS"));
	previouButton.className = "previous";
	slide.appendChild(previouButton);

	var nextButton = document.createElement("button");
	nextButton.appendChild(document.createTextNode("NEXT"));
	nextButton.className = "next";
	nextButton.id = ("next" + i);
	nextButton.disabled = true;
	slide.appendChild(nextButton);

}


function createPieChart(slide, i, portfolio) {

	// console.log(portfolio.title);

	var slideTitle = document.getElementById("results-slide-title");
	slideTitle.appendChild(document.createTextNode(portfolio.title));

	var leftColumn = document.getElementById("leftColumn");
	leftColumn.appendChild(document.createTextNode(portfolio.left_column.subtitle));
	leftColumn.appendChild(document.createTextNode(portfolio.left_column.intro));
	var rightColumn = document.getElementById('rightColumn');
	// rightColumn.appendChild(document.createTextNode(json[i].portfolio.right_column.subtitle));

	var fundBox = document.createElement("div");
	fundBox.id = "fundBox"; 
	rightColumn.appendChild(fundBox);
	var funds = document.createElement("p");
	funds.id = "funds";
	fundBox.appendChild(funds);


/*	var rightColumn = document.getElementById("rightColumn");
	rightColumn.appendChild(document.createTextNode(json[i].portfolio.right_column.subtitle));*/
	
	
			var chartLabel = []; //declaring variable to store chart labels
			var chartValue = []; //declaring variable to store chart valuese
			var chartColour = []; //declaring variable to store chart colours
			var chartTitle = []; //declaring variable to store chart title
			var fundNames = []; //declaring variable to store each label's fund name(s)
			var objHeading = []; //declaring variable to store the objective heading
			var objDescription = []; //declaring variable to store the objective description 

			/*var leftColumn = json[i].portfolio.left_column;
			var rightColumn = json[i].portfolio.right_column;
*/
			// console.log(leftColumn);
			// console.log(rightColumn);

			// console.log(rightColumn.subtitle);
			// console.log(rightColumn.pieChart);

			// objHeading.push(leftColumn.subtitle); //load objHeading "array" with objective heading 
			chartTitle.push(portfolio.right_column.subtitle); //load chartTitle "array" with chart title
			// objDescription.push(leftColumn.intro); //load objDescription "array" with objective description

			// console.log(objHeading);
			// console.log(chartTitle);
			// console.log(objDescription);


			var pie_Chart = portfolio.right_column.pieChart;

			for (j = 0; j < pie_Chart.length; j++){
				chartLabel.push(pie_Chart[j].label); //load chartLabel array with label values
				chartValue.push(pie_Chart[j].value); //load chartValue array with value values
				chartColour.push(pie_Chart[j].colour); //load chartColour array with colour values
				fundNames.push(pie_Chart[j].funds); //load fundNames array with ARRAYS of each label's fund name(s); an array of arrays
			}

			// console.log(chartLabel);
			// console.log(chartValue);
			// console.log(chartColour);
			// console.log(fundNames);




			//--------------------------------------BUILDING THE PIE CHART------------------------------------------------------------------------------


			var ctx = document.getElementById("pieChart").getContext('2d'); //declaring variable 'ctx' (context) for div to display pie chart
			var selectedIndex = null; //declaring variable to represent index selected for separation animation
			var selectedIndexFunds = null;

			var pieChart = new Chart(ctx, { //creating chart with the below attributes
				type: 'pie',
				data: {
					labels: chartLabel, //setting labels for the legend 
					datasets: [{
						backgroundColor: chartColour, //setting background colour of each slice with chartColour array
						data: chartValue, //setting values of each slice with chartValue array
						borderWidth: 2, //setting value of the border around each slice
					}]
				},
				options: { //options is an object of objects of objects of attributes... very meta
					tooltips: {
						callbacks: { //invoked after you hover over a slice
							label: function(tooltipItem, data){ //function alters the tooltip so that it displays label + percentage of slice instead of value
								var allData = data.datasets[tooltipItem.datasetIndex].data;
								var tooltipLabel = data.labels[tooltipItem.index];
								var tooltipData = allData[tooltipItem.index];
								var total = 0;
								for (var j in allData) {
									total += allData[j];
								}
								var tooltipPercentage = Math.round((tooltipData/total) * 100); //calculate the percentage of each slice
								return tooltipLabel + ' (' + tooltipPercentage + '%)';
							}
						}
					},
					legend: { //settings for the legend within the canvas
						display: true, //show or hide the library's default legend
						position: 'right',
						labels: {
							fontColor: 'black',
							fontFamily: 'Segoe UI',
							fontSize: 11,
							padding: 0,
							boxWidth: 20,
							fontStyle: 'normal'
						}
					},
					cutoutPercentage: 0, //set radius of circle to cut out to create donut chart
					title: {
						display: true,
						// padding: 0,
						text: chartTitle, //title of the graph
						// fontColor: '#333',
						fontSize: 16,
						fontFamily: 'Segoe UI'
					},
					layout: {
						padding: 5//padding necessary so that the exploded slice fits within the canvas div
					},
					onClick: function (evt, elements) { //function to create exploded slice upon click
						if (elements && elements.length) {
							var segment = elements[0];
							pieChart.update();

							if (selectedIndex !== segment["_index"]) {
								selectedIndex = segment["_index"];
								segment._model.outerRadius += 6;
								console.log(selectedIndex); //console output the index of selected piece. use this to decide which funds to show!

								if (fundNames[selectedIndex].length > 1) {
									var fundString = "";
									for (j = 0; j < fundNames[selectedIndex].length; j++){
									fundString = fundString + fundNames[selectedIndex][j] + "<br>";
									} 

									document.getElementById("funds").innerHTML = "<b><u>" + chartLabel[selectedIndex] + "</u></b><p>" + fundString;
								}
								else {
									var funds = fundNames[selectedIndex][0];
									console.log(funds);
									document.getElementById("funds").innerHTML = "<b><u>" + chartLabel[selectedIndex] + "</u></b><p>" + funds;
								} 
							}
							else {
								selectedIndex = null;
							}
						}
					},

				}
			})


}



function createResultsSlide(slide, i, arr, sum){


	// slide title
	var title = document.createElement("h4");
	title.id = "results-slide-title";
	slide.appendChild(title);


	var row = document.createElement("div");
	row.className = "row";
	slide.appendChild(row);
	// create two Divs on RESULTS slide 
	var leftColumn = document.createElement("div");
	leftColumn.className = "column";
	leftColumn.id = "leftColumn";
	slide.appendChild(leftColumn);
	var rightColumn = document.createElement("div");
	rightColumn.className = "column";
	rightColumn.id = "rightColumn";
	slide.appendChild(rightColumn);

	

	var pieChart = document.createElement("div");
	pieChart.id = "canvas-holder";
	rightColumn.appendChild(pieChart);

	var canvas = document.createElement("canvas");
	canvas.id = "pieChart";
	pieChart.appendChild(canvas);

	
	$("#next" + (i-1)).click(function(){

		for (var j = 0; j < arr.length; j++) {
			sum = sum + parseInt(arr[j]);
		}
		console.log("the sum is: " + sum);



		if (sum < 18) {
			createPieChart(slide, i, json[i].yield);
		} else if (sum >= 18 && sum <= 30) {
			createPieChart(slide, i, json[i].conservative);

		} else if (sum >= 31 && sum <= 43) {
			createPieChart(slide, i, json[i].balanced);

		} else if (sum >= 44 && sum <= 55) {
			createPieChart(slide, i, json[i].growth);

		} else if (sum > 55) {
			createPieChart(slide, i, json[i].global);
		}

	});



	// add portfolio drop-down 
	var numOfOptions = json[i].dropDown.length; // get amount of options 
	var dropDown = document.createElement("select");
	dropDown.className = "drop-down";

	// add options to drop-down 
	for (var j = 0; j < numOfOptions; j++) {
		var option = document.createElement("option");
		option.appendChild(document.createTextNode(json[i].dropDown[j]));
		dropDown.appendChild(option);
	}
	slide.appendChild(dropDown);


 	// Previous and Next button 
    var previouButton = document.createElement("button");
	previouButton.appendChild(document.createTextNode("PREVIOUS"));
	previouButton.className = "previous";
	slide.appendChild(previouButton);

 	var reportButton = document.createElement("button");
	reportButton.appendChild(document.createTextNode("report"));
	reportButton.id = "report";
	slide.appendChild(reportButton);


	var modal = document.createElement("div");
	modal.id = "myModal";
	slide.appendChild(modal);

	// createModal();
}





// ------------------------------------------------------------------------------------------------------------------------------


	var numOfSlides = json.length; // get the amount of questions 
	var arr = [];


	for (var i = 0; i < numOfSlides; i++) {
		arr.push(0);
	}
	console.log("the length of array is: " + arr.length)
	var sum = 0; 

	$("#all-slides").width(numOfSlides*8940); // set length of all slides 
												// have to be decided after getting the amount of slides 

	var all_slides = document.getElementById("all-slides"); // containing the list of all slides 
 	var footer = document.getElementById("footer");


 	for (var i = 0; i < numOfSlides; i++) {

 	 	// create the slide                                                                      
 	 	var slide = document.createElement("li"); 
		slide.id = "slide" + i;
		all_slides.appendChild(slide);


 	 	if (json[i].type == "coverPage") { 
 	 		createCoverPageSlide(slide, i);
 	 	} else if (json[i].type == "section") {
 	 		createSectionSlide(slide, i);
 	 	} else if (json[i].type == "question"){
 	 		createQuestionSlide(slide, i);
 	 	} else if (json[i].type == "results"){
 	 		createResultsSlide(slide, i, arr, sum);
 	 	}

	}


	// add pagination 
	for (var i = 0; i < (numOfSlides - 1); i++) {
			var pagination = document.createElement("button");

	if (i == (numOfSlides - 2)) {
		pagination.appendChild(document.createTextNode("RESULTS"));
	} else {
		pagination.appendChild(document.createTextNode(i + 1));
	}
		pagination.className = "bt";
		pagination.id = "pagination" + i;
		pagination.value = i + 1;
		pagination.disabled = false; ///////////////////////////////////////////////////////// enable pagination 
		footer.appendChild(pagination);
	} // pagination 


	// enable next button 
	$("input").on('change', function(){

    	var value = this.getAttribute("value");
        var id = this.getAttribute("id");
        arr[id] = value;
        $("#next" + id).removeAttr("disabled");
        console.log("the value is: " + value);
    });


	// 
    var currSlide = 0;
	$(".next").click(function(){ 
	    $("#all-slides").animate({marginLeft: "-=745px"}, 500);
	    currSlide++;
	    console.log("-------------------------");
        console.log("Current page is: " + currSlide);
	    $("#pagination" + currSlide).removeAttr("disabled");
	});

    $(".previous").click(function(){ 
        $("#all-slides").animate({marginLeft: "+=745px"}, 500);
        currSlide--;
        console.log("-------------------------");
        console.log("Current page is: " + currSlide); 
    });

    var diff;
    $(".bt").click(function(){

        var desirSlide = this.getAttribute("value");
        diff = currSlide - desirSlide;
        console.log("Current slide is: " + currSlide + " Desired page is: " + desirSlide + " Difference is: " + diff);


        if (diff > 0) {
            diff = currSlide - desirSlide;
            for (var i = 0; i < diff; i++) {
                $("#all-slides").animate({marginLeft: "+=745px"}, 300);
                currSlide = desirSlide;
            }
        }
        if (diff < 0) {
            diff = desirSlide - currSlide;
            for (var i = 0; i < diff; i++) {
                $("#all-slides").animate({marginLeft: "-=745px"}, 300);
                currSlide = desirSlide;
            }
        }
        
    });












});