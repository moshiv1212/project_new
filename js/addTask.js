"use strict";
/***********************************************************************
* FILENAME :        addTask.js             
*
* DESCRIPTION :
*       This file includes the functions required for the addTask.html page
*
* TEAM : 014    
* AUTHOR:  Behnam Mozafari, Yue Yao Yan, Jia Tan
* LAST MODIFIED DATE : 10/17/2022   
*
*
**/

/**
 * verifyInputs function
 * Runs when the confirm button on addTask.html is clicked
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

    const taskName = taskNameRef.value;
    const type = typeRef.value;
    const tag = tagRef.value;
    const assignee = assigneeRef.value;
    const description = descriptionRef.value;
    const points = pointsRef.value;
    const priority = priorityRef.value;

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
    if (error != "") {
        alert(error);
    }
    else {
        showtasksummary()
    }
}

/**
 * addTask function
 * Adds task to backlog
 * updates LS, navigates back to index.html
 */
function addTask() {
    // get variables
    const taskNameRef = document.getElementById("taskName");
    const typeRef = document.getElementById("type");
    const tagRef = document.getElementById("tag");
    const assigneeRef = document.getElementById("assignee");
    const descriptionRef = document.getElementById("description");
    const pointsRef = document.getElementById("points");
    const priorityRef = document.getElementById("priority");

    const name = taskNameRef.value;
    const type = typeRef.value;
    const tag = tagRef.value;
    const assignee = listOfMembers.memberList[assigneeRef.value];
    const description = descriptionRef.value;
    const storyPoint = pointsRef.value;
    const priority = priorityRef.value;
    const status = "Not Started";

    // create new task 
    let task = new Task(name, type, storyPoint, priority, tag, status, assignee, description);
    // adding task to appropriate task list
    if (priority == 'critical') {
        backlogTasks.addCriticalPriority(task);
    }
    else if (priority == 'high') {
        backlogTasks.addHighPriority(task);
    }
    else if (priority == 'medium') {
        backlogTasks.addMediumPriority(task);
    }
    else if (priority == 'low') {
        backlogTasks.addLowPriority(task);
    }
    // Update LS
    updateLSData(BACKLOGTASKS_KEY, backlogTasks);
    // Navigate to index.html
    location.href = "index.html";
}

/**
 * showtasksummary function
 * Asks to confirm whether to add task
 * calls addTask function
 */
function showtasksummary() {
    const taskNameRef = document.getElementById("taskName");
    const typeRef = document.getElementById("type");
    const tagRef = document.getElementById("tag");
    const assigneeRef = document.getElementById("assignee");
    const descriptionRef = document.getElementById("description");
    const pointsRef = document.getElementById("points")
    const priorityRef = document.getElementById("priority");

    const taskName = taskNameRef.value;
    const type = typeRef.value;
    const tag = tagRef.value;
    const assignee = listOfMembers.memberList[assigneeRef.value].name;
    const description = descriptionRef.value;
    const points = pointsRef.value;
    const priority = priorityRef.value;

    let confirmText = `\n Task name: ${taskName} \n Assignee: ${assignee} \n Description: ${description} \n Story Points: ${points} \n Type: ${type} \n Tag: ${tag} \n Priority: ${priority} \n`;
    if (confirm("Would you like to add the following task to product backlog \n" + confirmText)) {
        addTask()
    }
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


displayAssignee("assignee");
