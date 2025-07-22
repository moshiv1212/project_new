"use strict";
/***********************************************************************
* FILENAME :        burndownData.js             
*
* DESCRIPTION :
*       This file includes the functions required to retrieve the data for the burndown chart
*
* TEAM : 014    
* AUTHOR:  Behnam Mozafari, Tharindu Ranaweera
* LAST MODIFIED DATE : 10/17/2022   
*
**/


/*
    GETS TASKS CONTRIBUTIONS FROM TIMELOG
    STORES IN ARRAY
    AND DISPLAYS AS A LINE GRAPH IN BURNDOWN CHART
*/

function burndownData() {

    let allSprintTasks = [].concat(currentSprint.taskList.notStarted, currentSprint.taskList.inProgress, currentSprint.taskList.complete);

    for (let i = 0; i < allSprintTasks.length; i++) {
        let task = allSprintTasks[i];

        let contributionLen = task.taskContributions.length;
        for (let j = 0; j < contributionLen; j++) {
            let contribution = task.taskContributions[j];
            let dayNum = Math.round((new Date(contribution.date) - new Date(currentSprint.startDate)) / 86400000);
            hours[dayNum] += contribution.workTime;
        }
    }



    for (let i = 1; i < hours.length; i++) {
        hours[i] += hours[i - 1]
    }


    return hours;
}

/*
    USED FOR X AXIS
    CREATES AND RETURNS A RANGE OF DATES IN AN ARRAY
*/
function datesData() {

    let dates = [];
    let startDate = new Date(currentSprint.startDate);
    let endDate = new Date(currentSprint.endDate);


    while (startDate <= endDate) {
        var final = startDate.getFullYear() + '-' + (((startDate.getMonth() + 1) < 10) ? '0' : '') + (startDate.getMonth() + 1) + '-' + ((startDate.getDate() < 10) ? '0' : '') + startDate.getDate();
        dates.push(final);
        startDate.setDate(startDate.getDate() + 1);
    }

    return dates;

    // adds dates on x axis

}

/*
    RETREIVES IDEAL VELOCITY VALUES
    STORES IN AN ARRAY FOR DURATION OF SPRINT
    DISPLAY AS A LINE GRAPH IN BURNDOWN CHART
*/

function idealVelocity() {

    let velocity = currentSprint._idealVelocity;
    let duration = currentSprint.duration; // need duration 
    let dailyVel = velocity / duration;

    for (let i = 0; i <= duration; i++) { // push velocity into data array using duration as length so there length of the array is the same
        data.push(velocity - i * dailyVel);
    }


    return data;
}


/*
    DISPLAYS ACTUAL VELOCITY
    IDEAL VELOCITY - HOURS ARRAY
*/
function actualVelocity() {
    let vel = new Array(currentSprint.duration + 1).fill(0)
    for (let i = 0; i < vel.length; i++) {
        vel[i] = (currentSprint._idealVelocity - hours[i]);
    }

    return vel;
}

// Global Variables
let hours = new Array(currentSprint.duration + 1).fill(0);
let data = [];













