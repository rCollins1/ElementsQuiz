$(document).ready(function () {
	var button = document.getElementById("show-repot-button");
	button.onclick = openNewpage;

});

function openNewpage (){
    var title = document.getElementById('txt-name').value;
    window.open("../report-page-conservative/report-conservative.html?form/title=" + title);
};