"use strict";
/***********************************************************************
* FILENAME :        addSprint.js             
*
* DESCRIPTION :
*       This file includes the functions required for the addSprint.html page
*
* TEAM : 014    
* AUTHOR:  Behnam Mozafari, Jia Tan, Tharindu Ranaweera
* LAST MODIFIED DATE : 10/17/2022     
*
*
**/

/*
    Detects User input
    Sees if theres any blank values
*/

function verifySprintInputs() {
    let sprintNameRef = document.getElementById("sprintName");
    let startDateRef = document.getElementById("startDate");
    let endDateRef = document.getElementById("endDate");


    let sprintName = sprintNameRef.value;
    let startDate = startDateRef.value;
    let endDate = endDateRef.value;

    var error = "";


    //check that the input is not blank
    if (sprintName == '') {
        error += '-Please enter sprint name\n';
    }
    if (startDate == '') {
        error += '-Please input start date\n';
    }
    if (endDate == '') {
        error += '-Please input end date\n';
    }
    if (startDate > endDate) {
        error += '-Please input the appropriate start date and end date\n'
    }
    if (error != "") {
        alert(error);
    }
    else {
        showsprintsummary()
    }
}


/*
    Called when addSprint button is clicked
    stores values
    updates LOCAL STORAGE
*/
function addSprint() {
    // get variables
    const sprintNameRef = document.getElementById("sprintName");
    const startDateRef = document.getElementById("startDate");
    const endDateRef = document.getElementById("endDate");


    const sprintName = sprintNameRef.value;
    const startDate = startDateRef.value;
    const endDate = endDateRef.value;
    // create new sprint
    let sprint = new Sprint(sprintName, startDate, endDate);
    listOfSprints.addSprint(sprint)
    // Update LS
    updateLSData(SELECTED_SPRINT_KEY, sprint);
    updateLSData(LISTOFSPRINTS_KEY, listOfSprints);

    // Navigate to selectindex.html
    window.location.href = "backlogSelection.html";
}

/*
    Displays sprint values
    Asks for confirmation from the user
*/

function showsprintsummary() {
    let sprintNameRef = document.getElementById("sprintName");
    let startDateRef = document.getElementById("startDate");
    let endDateRef = document.getElementById("endDate");


    let sprintName = sprintNameRef.value;
    let startDate = startDateRef.value;
    let endDate = endDateRef.value;


    let confirmText = `\n Sprint name: ${sprintName} \n Start Date: ${startDate} \n End Date: ${endDate}`;
    if (confirm("Would you like to add the following sprint \n" + confirmText)) {
        addSprint()
    }
}


