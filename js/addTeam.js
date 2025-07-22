"use strict";
/***********************************************************************
* FILENAME :        addTeam.js             
*
* DESCRIPTION :
*       This file includes the functions required for the addTeam.html page
*
* TEAM : 014    
* AUTHOR: Behnam Mozafari, Jia Tan, Tharindu Ranaweera
* LAST MODIFIED DATE : 10/17/2022     
*
*
**/

/*
    Checks user inputs
    Shows error if any blank inputs
    calls Team summary
*/
function verifyTeamNameInputs() {
    let teamNameInput = document.getElementById("teamName");
    let emailInput = document.getElementById("email");

    let teamName = teamNameInput.value;
    let email = emailInput.value;

    var error = "";

    if (teamName == '') {
        error += '-Please enter your name \n'
    }
    if (email == '') {
        error += '-Please enter your email\n';
    }
    if (error != "") {
        alert(error);
    }
    else {
        showTeamSummary();
    }
}

/**
 * showTimelogSummary function
 * Asks to confirm whether to add task contribution
 * calls addTimelog function
 */
function showTeamSummary() {
    let teamNameInput = document.getElementById("teamName");
    let emailInput = document.getElementById("email");

    let teamName = teamNameInput.value;
    let email = emailInput.value;

    let confirmText = `\n Name: ${teamName}, Email Address: ${email}`;
    if (confirm("Would you like to add the following team member? \n" + confirmText)) {
        addTeamMember();
    }
}

/**
 * addTimelog function
 * Adds timelog to task
 * updates LS, navigates back to sprintboard
 */
function addTeamMember() {
    let teamNameInput = document.getElementById("teamName");
    let emailInput = document.getElementById("email");

    let teamName = teamNameInput.value;
    let email = emailInput.value;

    // create new member
    let sprint = new Member(teamName, email);
    listOfMembers.addMember(sprint)
    // Update LS
    updateLSData(LISTOFMEMBERS_KEY, listOfMembers);

    window.location.href = "listOfTeamMembers.html";
}