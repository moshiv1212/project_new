"use strict";
/***********************************************************************
* FILENAME :        timelog.js             
*
* DESCRIPTION :
*       This file includes the functions required for the timelog.html page
*
* TEAM : 014    
* AUTHOR:  Behnam Mozafari, Jia Tan, Tharindu Ranaweera
* LAST MODIFIED DATE : 10/17/2022   
*
*
**/

/**
 * verifyTimelogInputs function
 * Runs when the confirm button on timelog.html is clicked
 * checks whether inputs are valid, then calls showTimelogSummary
 */
function verifyTimelogInputs() {
    let timeInput = document.getElementById("time");
    let dateInput = document.getElementById("date");

    let time = timeInput.value;
    let date = dateInput.value;

    var error = "";

    //check that the input is not blank time > 0
    if (time == '') {
        error += '-Please enter the work time\n';
    }
    if (date == '') {
        error += '-Please enter the date\n';
    }
    if (time != '' && time <= 0) {
        error += '-Please input valid time\n';
    }
    if (new Date(date) < new Date(currentSprint.startDate) || new Date(date) > new Date(currentSprint.endDate)) {
        error += `-Date must be between sprint start and end date\n`;
    }
    if (new Date(date) > (new Date()+1)) {
        error += `-Date cannot be in the future\n`;
    }
    if (error != "") {
        alert(error);
    }
    else {
        showTimelogSummary();
    }
}

/**
 * showTimelogSummary function
 * Asks to confirm whether to add task contribution
 * calls addTimelog function
 */
function showTimelogSummary() {
    let timeInput = document.getElementById("time");
    let dateInput = document.getElementById("date");

    let time = timeInput.value;
    let date = dateInput.value;
    let assignee = currentTask.assignee.name;

    let confirmText = `\n Assignee: ${assignee}, Work Time: ${time} minutes, Date: ${date}`;
    if (confirm("Would you like to add the following task contribution? \n" + confirmText)) {
        addTimelog();
    }
}

/**
 * addTimelog function
 * Adds timelog to task
 * updates LS, navigates back to sprintboard
 */
function addTimelog() {
    let timeInput = document.getElementById("time");
    let dateInput = document.getElementById("date");

    let time = timeInput.value;
    let date = dateInput.value;
    let assignee = currentTask.assignee;

    let taskContribution = new TaskContribution(date, time / 60, assignee.name);

    // add contribution to member
    assignee.addContribution(taskContribution);
    listOfMembers.replaceOldMember(assignee);

    currentTask.addContribution(taskContribution);
    currentTask.assignee = assignee;

    // replace task with new task
    currentSprint.replaceOldTask(currentTask);

    // Update LS listofsprints and listofmembers
    listOfSprints.replaceOldSprint(currentSprint);
    updateLSData(SELECTED_SPRINT_KEY, currentSprint);
    updateLSData(LISTOFSPRINTS_KEY, listOfSprints);
    updateLSData(LISTOFMEMBERS_KEY, listOfMembers);
    // navigate to sprintboard.HTML
    location.href = "sprintboard.HTML";
}