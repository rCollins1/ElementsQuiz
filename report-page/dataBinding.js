var jsonSource = "https://api.myjson.com/bins/b13t7";

function buildIncomeDiv (divToBeAppend, incomeObject, divIndex) {
	
	//build the outer section
	var incomeDiv = document.createElement("div");
	incomeDiv.classList.add("income-div");

	//build the income title section, will displayed in different color
	var incomeTitle = document.createElement("div");
	incomeTitle.classList.add("income-title");
	incomeTitle.classList.add("color-" + divIndex);

	//build the sub-div of income-title: percentage
	var incomePercentage = document.createElement("div");
	incomePercentage.classList.add("income-percentage");
	incomePercentage.appendChild(document.createTextNode(incomeObject.incomePercentage));

	//build the sub-div of income-title: income name
	var incomeName = document.createElement("div");
	incomeName.classList.add("income-name");
	incomeName.appendChild(document.createTextNode(incomeObject.incomeType));

	incomeTitle.appendChild(incomePercentage);
	incomeTitle.appendChild(incomeName);
	incomeDiv.appendChild(incomeTitle);

	//build the fund section
	var fundDiv = document.createElement("div");
	fundDiv.classList.add("fund-div");

	var fundTypeLength = incomeObject.fundType.length;

	for (var i = 0; i < fundTypeLength; ++i) {
		var incomeFund = document.createElement("div");
		incomeFund.classList.add("income-fund");

		var fundPercentage = document.createElement("div");
		fundPercentage.classList.add("fund-percentage");
		fundPercentage.appendChild(document.createTextNode(incomeObject.fundType[i].fundPercentage));

		var fundName = document.createElement("div");
		fundName.classList.add("fund-name");
		fundName.appendChild(document.createTextNode(incomeObject.fundType[i].fundName));

		incomeFund.appendChild(fundPercentage);
		incomeFund.appendChild(fundName);
		fundDiv.appendChild(incomeFund);
	}
	
	incomeDiv.appendChild(fundDiv);
	divToBeAppend.appendChild(incomeDiv);
};

$.getJSON(jsonSource, function (json) {

	//Get the profolio type and feed into title area.
	var reportTitleSection = document.getElementById("report-protofolio-type");
	reportTitleSection.appendChild(document.createTextNode(json.reportProfolioTitle));

	//Get the benefit array from json (json.benefits),use for loop to add <li> one by one.
	var benefitSection = document.getElementById("benefit-list");

	var benefitsLength = json.benefits.length;

	for (var i = 0; i < benefitsLength; ++i) {
		//appendChild won't work if the object is null, have to create an element.
		var benefitItem = document.createElement("li");
		benefitItem.appendChild(document.createTextNode(json.benefits[i]));
		benefitSection.appendChild(benefitItem);
	}

	//build the income and fund table
	var incomeTableSection = document.getElementById("table-section");
	var fundsChartLength = json.fundsChart.length;

	for (var i = 0; i < fundsChartLength; ++i) {
		buildIncomeDiv(incomeTableSection, json.fundsChart[i], i);
	}


});