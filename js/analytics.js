"use strict";
/***********************************************************************
* FILENAME :        analytics.js             
*
* DESCRIPTION :
*       This file includes the functions required for the analytics.html page
*
* TEAM : 014    
* AUTHOR:  Behnam Mozafari, Tharindu Ranaweera, Ropa Chigumadzi
* LAST MODIFIED DATE : 10/17/2022   
*
**/

/*
    CREATES AND RETURNS AN ARRAY OF DATES
    USES CURRENT DATE
    APPLIED TO THE X AXIS OF THE BAR CHART GRAPH
*/

function xAxisData() {

    let dates = [];

    let today = new Date();


    let startdate = new Date();
    startdate.setDate(startdate.getDate() - 6);

    while (startdate <= today) {
        let final = startdate.getFullYear() + '-' + (((startdate.getMonth() + 1) < 10) ? '0' : '') + (startdate.getMonth() + 1) + '-' + ((startdate.getDate() < 10) ? '0' : '') + startdate.getDate();
        dates.push(final);
        startdate.setDate(startdate.getDate() + 1);
    }



    return dates;


}


/**
 * memberAnalytics function
 * returns an array of total time contributions per day for the last seven 
 * days for the current member.
 */
function memberAnalytics() {
    let hours = new Array(7).fill(0);
    let currentDate = new Date();
    let contributions = currentMember.memberContributions;
    let currentContribution;
    let contributionDate;
    let day;
    for (let i = 0; i < contributions.length; i++) {
        currentContribution = contributions[i];
        contributionDate = new Date(currentContribution.date);
        if ((currentDate - contributionDate) / 86400000 < 7 && (currentDate - contributionDate) >= 0) {
            day = (7 - Math.round((currentDate - contributionDate) / 86400000));
            hours[day - 1] += currentContribution.workTime;
        }
    }

    return hours;
}


/*
    RETRIEVES TEAM MEMBER DETIALS
    UPDATES DISPLAY WITH EMAIL AND NAME OF SPECIFIC TEAM MEMBER
*/

function displayInfo() {
    let titleRef = document.getElementById("centre11");
    let emailRef = document.getElementById('top-left11');

    titleRef.textContent = `Member Analytics: ${currentMember.name}`
    emailRef.textContent = `Email: ${currentMember.email}`

}

displayInfo();
memberAnalytics();