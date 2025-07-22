/***********************************************************************
* FILENAME :        listOfTeamMembers.js             
*
* DESCRIPTION :
*       This file includes the functions required for the listOfTeamMembers.html page
*
* TEAM : 014    
* AUTHOR:  Behnam Mozafari, Jia Tan, Yue Yao Yan, Tharindu Ranaweera
* LAST MODIFIED DATE : 10/17/2022   
*
*
**/


/*
    CALCULATES MEAN WORK HOURS
    WITHIN A DATE RANGE
*/

function dateRange() {
    let startDateRef = document.getElementById('startDateHrsDisplay');
    let endDateRef = document.getElementById('endDateHrsDisplay');
    let startDate = startDateRef.value;
    let endDate = endDateRef.value;
    let memberList = listOfMembers.memberList;
    let len = memberList.length
    for (let i = 0; i < len; i++) {
        let member = listOfMembers.memberList[i]
        member.meanWorkHours = member.meanWorkHoursCalc(startDate, endDate)
        updateLSData(CURRENTMEMBER_KEY, member);
    }
    displayMembers();
}

/**
 * displayMembers function
 * Runs when page loads
 * display Members from MemberList on page
 */
function displayMembers() {
    let output = `
    <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp" id="listofsprints">
                <thead>
                <tr style="background-color: black;">
                    <th class="mdl-data-table__cell--non-numeric">Name</th>
                    <th>Email</th>
                    <th>Average Work Hours Per Day</th>
                    <th class="mdl-data-table__cell--non-numeric"></th>
                    <th class="mdl-data-table__cell--non-numeric"></th>
                </tr>
                </thead>`;
    let listOfMembersRef = document.getElementById('listofmembers');
    let memberList = listOfMembers.memberList;
    let len = memberList.length
    let member;
    if (len == 0) {
        output += `
        <tbody>
        <tr>
            <td class="mdl-data-table__cell--non-numeric"></td>
            <td class="mdl-data-table__cell">This List Is Empty</td>
            <td class="mdl-data-table__cell--non-numeric"> </td>
            <td class="mdl-data-table__cell--non-numeric"> </td>
            <td class="mdl-data-table__cell--non-numeric"> </td>
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
            member = memberList[i];
            output += `
                    <tr>
                    <td class="mdl-data-table__cell--non-numeric">${member.name}</td>
                    <td class="mdl-data-table_cell--non-numeric">${member.email}</td>
                    <td class="mdl-data-table__cell">${member.meanWorkHours || 0}</td>
                    <td class="mdl-data-table__cell--non-numeric">
                            <a href="#">
                                <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" input type = "button" id="expand" onclick="expandMember(${i})">
                                    Analytics
                                </button>
                            </a>
                        </td>
                        <td class="mdl-data-table__cell--non-numeric"><a href="">
                            <a href="">
                                <button style="color:white; background-color: rgb(184, 0, 0);"
                                class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect button" onclick=deleteMember(${i})>
                                    Delete
                                </button>
                            </a>
                        </td>
                    </tr>
            `
        }
        output += `
            </tbody>
        </table>
        `
    }
    listOfMembersRef.innerHTML = output;
    return;
}

/**
 * expandMember function
 * Runs when the expand button on a member table row is clicked
 * opens member analytics page
 * @param {number} index - index of member to be expanded
 */
function expandMember(index) {
    let currentMember = listOfMembers.memberList[index];
    updateLSData(CURRENTMEMBER_KEY, currentMember);
    window.location.href = "analytics.html";
}


/**
 * deleteMember function
 * Runs when the delete button on a member table row is clicked
 * deletes member from list of members
 * @param {number} index - index of member to be deleted
 */
function deleteMember(index) {
    let deletedMember = listOfMembers.memberList[index];
    if (confirm(`Confirm to delete "${deletedMember.name}"`)) {
        listOfMembers.removeMember(index);
        updateLSData(LISTOFMEMBERS_KEY, listOfMembers);
        displayMembers();
    }
}

// Display members when page loads if listOfMembers is not empty
displayMembers();



