"use strict";
/***********************************************************************
* FILENAME :        listOfSprints.js             
*
* DESCRIPTION :
*       This file includes the functions required for the listOfSprints.html page
*
* TEAM : 014    
* AUTHOR:  Behnam Mozafari, Jia Tan, Yue Yao Yan, Ropa Chigumadzi
* LAST MODIFIED DATE : 10/17/2022   
*
**/

/**
 * displaySprints function
 * Runs when page loads
 * display sprints from listOfSprints on page
 */
function displaySprints() {
    let output = `
    <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp" id="listofsprints">
        <thead>
        <tr style="background-color: black;">
            <th class="mdl-data-table__cell--non-numeric">Sprint Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th class="mdl-data-table__cell--non-numeric">State</th>
            <th class="mdl-data-table__cell--non-numeric"></th>
            <th class="mdl-data-table__cell--non-numeric"></th>
        </tr>
        </thead>`;
    let listOfSprintsRef = document.getElementById('listofsprints');
    let sprintList = listOfSprints.listOfSprints;
    let len = sprintList.length;
    let sprint;
    if (len == 0) {
        output += `
            <tbody>
                <tr>
                <td class="mdl-data-table__cell--non-numeric"></td>
                <td></td>
                <td>This list is empty</td>
                <td class="mdl-data-table__cell--non-numeric"></td>
                <td class="mdl-data-table__cell--non-numeric">
                </td>
                <td class="mdl-data-table__cell--non-numeric"><a href="">
                </td>
                </tr>
            </tbody>
        </table>
        `
    }
    else {
        output += `
                <tbody>
        `

        for (let i = 0; i < len; i++) {
            sprint = sprintList[i];
            let targetDate = new Date(sprint.endDate)
            var dt = new Date();
            if (targetDate < dt) {
                sprint.state = "completed"
            }
            output += `
                    <tr>
                    <td class="mdl-data-table__cell--non-numeric">${sprint.name}</td>
                    <td>${sprint.startDate}</td>
                    <td>${sprint.endDate}</td>
                    <td class="mdl-data-table__cell--non-numeric">${sprint.state}</td>
                    <td class="mdl-data-table__cell--non-numeric">
                        <a href="#">
                            <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" input type = "button" id="expand" onclick="expandSprint(${i})">
                                ${sprint.state.toUpperCase() == "NOT STARTED" ? 'select' : 'Kanban'}
                            </button>
                        </a>
                    </td>
                    <td class="mdl-data-table__cell--non-numeric"><a href="">
                        <a href="">
                            <button style="color:white; background-color: rgb(184, 0, 0);"
                                class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect button" onclick=deleteSprint(${i})> Delete
                            </button>
                        </a>
                    </td>
                    </tr>
            `;
        }
        output += `
            </tbody>
        </table>
        `;
    }
    listOfSprintsRef.innerHTML = output;
    return;
}

/**
 * expandSprint function
 * Runs when the expand button on a sprint table row is clicked
 * opens sprint backlog selection if sprint is not started, opens sprintboard if it is started
 * @param {number} index - index of sprint to be expanded
 */
function expandSprint(index) {
    let currentSprint = listOfSprints.listOfSprints[index];
    updateLSData(SELECTED_SPRINT_KEY, currentSprint);
    window.location.href = currentSprint.state.toUpperCase() == "NOT STARTED" ? "backlogSelection.HTML" : "sprintboard.HTML";
}


/**
 * deleteSprint function
 * Runs when the delete button on a sprint table row is clicked
 * deletes sprint from list of sprints
 * @param {number} index - index of sprint to be deleted
 */
function deleteSprint(index) {
    if (confirm(`Confirm to delete "${listOfSprints.listOfSprints[index].name}"`)) {
        listOfSprints.removeSprint(index);
        updateLSData(LISTOFSPRINTS_KEY, listOfSprints);
        displaySprints();
    }
}

// Display sprints when page loads if listOfSprints is not empty
displaySprints();


let actualDateRef = document.getElementById("")
var dt = new Date();
document.getElementById("datetime").innerHTML = dt.toLocaleDateString();

