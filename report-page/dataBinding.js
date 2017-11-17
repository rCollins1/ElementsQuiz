var jsonSource = "https://api.myjson.com/bins/b13t7";

$.getJSON(jsonSource, function (json) {

	var reportTitleSection = document.getElementById("report-protofolio-type");
	var title = json.reportProfolioTitle;
	reportTitleSection.appendChild(document.createTextNode(title));

	var benefitSection = document.getElementById("benefit-list");

	var benefitsLength = json.benefits.length;

	for (var i = 0; i < benefitsLength; ++i) {
		var benefitItem = document.createElement("li");
		benefitItem.appendChild(document.createTextNode(json.benefits[i]));
		benefitSection.appendChild(benefitItem);

	}
});