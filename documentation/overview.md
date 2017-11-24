# Elements Quiz: Overview #

## About This Project ##

### Problem Space ###

The original (and current) Elements Quiz is built as a flash player, rendering its updating process and maintenance both expensive and inconvenient. 
This project was created as a stand-in for the current quiz.

### Our Goal ###

Re-create the Elements Quiz using resources that cut third-party maintenance costs by making it accessible and easy to update regularly, without sacrificing any of its original functionality. 

### Our Solution ###

Using JavaScript (jQuery, AJAX, Chart.js) and HTML/CSS, data is read from dynamic JSON files and elements of the quiz are generated from this data.

The implementation of external JSON files allows for an easier updating process, as the quiz components (questions, graphs, result page information, etc.) can be changed without the need to go directly into the source code. Character strings and values can be altered and added/removed in the user-intuitive JSON files, and the source code will then parse the objects into the variables used to build the dynamic elements.

## About This Quiz ##

This questionnaire was designed to help investors choose the right investment to meet their needs by matching their financial situation to the profile of one of five investor portfolios. 
