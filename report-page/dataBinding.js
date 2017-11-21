var jsonSource = "https://api.myjson.com/bins/qwug7";

function buildIncomeDiv (divToBeAppend, incomeObject, divIndex) {
	
	//build the outer section
	var incomeDiv = document.createElement("table");
	incomeDiv.classList.add("income-div");

	//build the income title section, will displayed in different color
	var incomeTitle = document.createElement("tr");
	incomeTitle.classList.add("income-title");
	incomeTitle.classList.add("color-" + divIndex);

	//build the sub-div of income-title: percentage
	var incomePercentage = document.createElement("td");
	incomePercentage.classList.add("income-percentage");
	incomePercentage.appendChild(document.createTextNode(incomeObject.incomePercentage + "%"));

	//build the sub-div of income-title: income name
	var incomeName = document.createElement("td");
	incomeName.classList.add("income-name");
	incomeName.appendChild(document.createTextNode(incomeObject.incomeType));

	incomeTitle.appendChild(incomePercentage);
	incomeTitle.appendChild(incomeName);
	incomeDiv.appendChild(incomeTitle);

	//build the fund section
	//var fundDiv = document.createElement("div");
	//fundDiv.classList.add("fund-div");

	var fundTypeLength = incomeObject.fundType.length;

	for (var i = 0; i < fundTypeLength; ++i) {
		var incomeFund = document.createElement("tr");
		incomeFund.classList.add("income-fund");

		var fundPercentage = document.createElement("td");
		fundPercentage.classList.add("fund-percentage");
		fundPercentage.appendChild(document.createTextNode(incomeObject.fundType[i].fundPercentage + "%"));

		var fundName = document.createElement("td");
		fundName.classList.add("fund-name");
		fundName.appendChild(document.createTextNode(incomeObject.fundType[i].fundName));

		//check if the fund has superscript. If has, add it to the end of its fund name
		if ("undefined" !== typeof(incomeObject.fundType[i]["superscript"])) {
			var superNumber = document.createElement("sup");
			superNumber.appendChild(document.createTextNode(incomeObject.fundType[i].superscript));
			fundName.appendChild(superNumber);
		}

		incomeFund.appendChild(fundPercentage);
		incomeFund.appendChild(fundName);
		incomeDiv.appendChild(incomeFund);
	}
	
	//incomeDiv.appendChild(fundDiv);
	divToBeAppend.appendChild(incomeDiv);
};

$(document).ready(function() {
	$.ajax({
		url: jsonSource,
		type: 'get',
		cache: false,
		success: function (json) {

			//----------------------------------------------------- Title Section ----------------------------------------------------------
			//Get the profolio type and feed into title area.
			var reportTitleSection = document.getElementById("report-protofolio-type");
			reportTitleSection.appendChild(document.createTextNode(json.reportProfolioTitle));

			//----------------------------------------------------- Benefit Section --------------------------------------------------------
			//Get the benefit array from json (json.benefits),use for loop to add <li> one by one.
			var benefitSection = document.getElementById("benefit-list");

			var benefitsLength = json.benefits.length;

			for (var i = 0; i < benefitsLength; ++i) {
				//appendChild won't work if the object is null, have to create an element.
				var benefitItem = document.createElement("li");
				benefitItem.appendChild(document.createTextNode(json.benefits[i]));
				benefitSection.appendChild(benefitItem);
			}

			//----------------------------------------------- Income/Fund Table Section ----------------------------------------------------
			//build the income and fund table
			var incomeTableSection = document.getElementById("table-section-0");
			var fundsChartLength = json.fundsChart.length;

			for (var i = 0; i < fundsChartLength; ++i) {
				buildIncomeDiv(incomeTableSection, json.fundsChart[i], i);
			}

			//----------------------------------------------------- Pie Chart Section -------------------------------------------------------- 
			var chartValue = []; //declaring variable to store chart valuese
			var chartColour = []; //declaring variable to store chart colours

			for (i = 0; i < json.fundsChart.length; ++i){
				chartValue.push(json.fundsChart[i].incomePercentage); //load chartValue array with value values
				chartColour.push(json.fundsChart[i].colour); //load chartColour array with colour values
			}

			var ctx = document.getElementById("pie-chart-0").getContext('2d'); //declaring variable 'ctx' (context) for div to display pie chart
			var selectedIndex = null; //declaring variable to represent index selected for separation animation
			var selectedIndexFunds = null;

			var pieChart = new Chart(ctx, { //creating chart with the below attributes
				type: 'pie',
				data: {
					datasets: [{
						backgroundColor: chartColour, //setting background colour of each slice with chartColour array
						data: chartValue, //setting values of each slice with chartValue array
						borderWidth: 2, //setting value of the border around each slice
					}]
				},
				options: { //options is an object of objects of objects of attributes... very meta
					tooltips: {enabled: false},
    				hover: {mode: null},
    				//maintainAspectRatio: false
				}
			})
		}
	})
});