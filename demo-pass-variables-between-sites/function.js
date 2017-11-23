var indicator = 2;

function openNewpage (){
    var title = document.getElementById('txt-name').value;

    title = '&#10003;'
    if (indicator === 1) {
    	window.open("../report-page-conservative/report-conservative.html?form/title=" + title);
    }
    if (indicator === 2) {
    	window.open("../report-page-global/report-global.html?form/title=" + title);
    } 
    
};