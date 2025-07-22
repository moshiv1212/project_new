"use strict";
/***********************************************************************
* FILENAME :        edit.js             
*
* DESCRIPTION :
*       This file includes the functions required for the edit.html page
*
* TEAM: 014    
* AUTHOR:  Yue Yao Yan, Behnam Mozafari
* LAST MODIFIED DATE : 10/17/2022   
*
*
**/

/**
 * editPrefill function
 * Runs when the page loads
 * prefils input fields with task details
 */
function editPrefill() {

    let taskNameRef = document.getElementById("taskName");
    let typeRef = document.getElementById("type");
    let tagRef = document.getElementById("tag");
    let assigneeRef = document.getElementById("assignee");
    let descriptionRef = document.getElementById("description");
    let pointsRef = document.getElementById("points")
    let priorityRef = document.getElementById("priority");
    let taskstatusRef = document.getElementById("taskStatus");

    taskNameRef.value = currentTask.name;
    typeRef.value = currentTask.type;
    tagRef.value = currentTask.tag;
    assigneeRef.value = listOfMembers.getMemberIndex(currentTask.assignee);
    descriptionRef.value = currentTask.description;
    pointsRef.value = currentTask.storyPoint;
    priorityRef.value = currentTask.priority;
    taskstatusRef.value = currentTask.status;
}

/**
 * verifyInputs function
 * Runs when the confirm button on edit.html is clicked
 * checks whether inputs are valid, then calls showtasksummary
 */
function verifyInputs() {
    const taskNameRef = document.getElementById("taskName");
    const typeRef = document.getElementById("type");
    const tagRef = document.getElementById("tag");
    const assigneeRef = document.getElementById("assignee");
    const descriptionRef = document.getElementById("description");
    const pointsRef = document.getElementById("points")
    const priorityRef = document.getElementById("priority");
    const taskstatusRef = document.getElementById("taskStatus");

    const taskName = taskNameRef.value;
    const type = typeRef.value;
    const tag = tagRef.value;
    const assignee = assigneeRef.value;
    const description = descriptionRef.value;
    const points = pointsRef.value;
    const priority = priorityRef.value;
    const taskstatus = taskstatusRef.value;


    var error = "";

    //check that the input is not blank
    if (taskName == '') {
        error += '-Please enter the task name\n';
    }
    if (assignee == '') {
        error += '-Please enter one assignee\n';
    }
    if (description == '') {
        error += '-Please write task description\n';
    }
    if (points == '') {
        error += '-Please input the story points\n';
    }
    if (points <= 0) {
        error += '-Please input valid story points\n';
    }
    if (type == '') {
        error += '-Please select an option for type\n';
    }
    if (priority == '') {
        error += '-Please select an option for priority\n';
    }
    if (tag == '') {
        error += '-Please select an option for tag\n';
    }
    if (taskstatus == '') {
        error += '-Please select an option for task status\n';
    }
    if (error != "") {
        alert(error);
    }
    else {
        showtasksummary()
    }
}

/**
 * showtasksummary function
 * Asks to confirm whether to edit task
 * calls editTask function
 */
function showtasksummary() {
    const taskNameRef = document.getElementById("taskName");
    const typeRef = document.getElementById("type");
    const tagRef = document.getElementById("tag");
    const assigneeRef = document.getElementById("assignee");
    const descriptionRef = document.getElementById("description");
    const pointsRef = document.getElementById("points")
    const priorityRef = document.getElementById("priority");
    const taskstatusRef = document.getElementById("taskStatus");

    const taskName = taskNameRef.value;
    const type = typeRef.value;
    const tag = tagRef.value;
    const assignee = listOfMembers.memberList[assigneeRef.value].name;
    const description = descriptionRef.value;
    const points = pointsRef.value;
    const priority = priorityRef.value;
    const taskstatus = taskstatusRef.value;

    let confirmText = `\n Task name: ${taskName} \n Assignee: ${assignee} \n Description: ${description} \n Story Points: ${points} \n Type: ${type} \n Tag: ${tag} \n Priority: ${priority} \n Task Status: ${taskstatus}`;
    if (confirm("Would you like to confirm the edits to the specified task? \n" + confirmText)) {
        editTask()
    }
}


/**
 * editTask function
 * Edits current task
 * updates LS, navigates back to index.html
 */
function editTask() {
    // get variables
    const taskNameRef = document.getElementById("taskName");
    const typeRef = document.getElementById("type");
    const tagRef = document.getElementById("tag");
    const assigneeRef = document.getElementById("assignee");
    const descriptionRef = document.getElementById("description");
    const pointsRef = document.getElementById("points");
    const priorityRef = document.getElementById("priority");
    const taskStatusRef = document.getElementById("taskStatus");

    const name = taskNameRef.value;
    const type = typeRef.value;
    const tag = tagRef.value;
    const assignee = listOfMembers.memberList[assigneeRef.value];
    const description = descriptionRef.value;
    const storyPoint = pointsRef.value;
    const priority = priorityRef.value;
    const status = taskStatusRef.value;

    // update task
    currentTask.name = name;
    currentTask.type = type;
    currentTask.tag = tag;
    currentTask.assignee = assignee;
    currentTask.description = description;
    currentTask.storyPoint = storyPoint;
    currentTask.priority = priority;
    currentTask.status = status;

    // check if task is in backlog tasks
    let bTasks = [].concat(backlogTasks.criticalPriorityList, backlogTasks.highPriorityList, backlogTasks.mediumPriorityList, backlogTasks.lowPriorityList);
    let pbi = false;

    for (let i = 0; i < bTasks.length; i++) {
        if (bTasks[i].id == currentTask.id) {
            pbi = true;
        }
    }

    // replace task
    if (pbi == true) {
        backlogTasks.replaceOldTask(currentTask);
        // Update LS
        updateLSData(BACKLOGTASKS_KEY, backlogTasks);
    }
    else {
        // replace task with new task
        currentSprint.replaceOldTask(currentTask);

        // Update LS listofsprints and listofmembers
        listOfSprints.replaceOldSprint(currentSprint);
        updateLSData(SELECTED_SPRINT_KEY, currentSprint);
        updateLSData(LISTOFSPRINTS_KEY, listOfSprints);
    }

    // Navigate to index.html
    location.href = currentPage;
}

/**
 * Display all assignee thats is in the list.
 * 
 * @param {string} id of Dropdown Element that is required to display members.
 */
function displayAssignee(id) {
    let assigneeVal = `<option value="" selected disabled hidden>Assignee</option>`;
    document.getElementById(id).innerHTML = listOfMembers.memberList.reduce((a, e, i) => a += `<option value=${i} >${e.name}</option>`, assigneeVal);

}

/**
 * cancel function
 * cancels edit
 * navigates back to original page
 */
function cancel() {
    location.href = currentPage;
}

displayAssignee("assignee");

// Prefill fields
editPrefill();
