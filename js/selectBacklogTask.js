"use strict";
/***********************************************************************
* FILENAME :        backlog.js             
*
* DESCRIPTION :
*       This file includes the functions required for the index.html page
*
* TEAM : 014    
* AUTHOR: Behnam Mozafari, Jia Tan, Yue Yao Yan
* LAST MODIFIED DATE : 10/17/2022   
*
*
**/


/**
 * filter function
 * Runs when a filter is selected from the dropdown
 * filters tasks in product backlog by tag
 */
function filter() {
    let tagRef = document.getElementById("filterlist");
    tagRef.addEventListener('change', _ => {
        let tag = tagRef.value;
        filteredTasks = tag == "" ? allTasks : allTasks.filter(e => e.tag.toUpperCase() == tag);
        displayTasks();
    })

}

/**
 * Updates the display of tasks in the backlog backlog.
 */
function displayTasks() {
    let backlogRef = document.getElementById('backlogList');
    backlogRef.innerHTML = ``;
    // If there are no tasks, display 'This list is empty'
    if (!filteredTasks || !filteredTasks.length) {
        backlogRef.innerHTML = `
      <h5 id='middle'>This list is empty</h5>
      `;
        return;
    }

    for (let i = 0; i < filteredTasks.length; i++) {
        let task = filteredTasks[i];
        let taskCard = document.createElement("div");
        taskCard.className = "mdl-cell mdl-cell--3-col";
        // make this element clickable
        taskCard.style.cursor = "pointer";
        taskCard.style.zIndex = 11;
        taskCard.setAttribute('data-index', i);
        let chip = task.priorityColour();
        task.status = 'Not Started'
        // add event listener for clicking
        taskCard.addEventListener("click", e => selectTask(e, taskCard, task));
        taskCard.innerHTML = `
          <div class="mdl-card mdl-shadow--2dp" id="taskcard" data-canSelect="1">
            <form>
              <div class="backlog">
                <br>
                <br>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <label id="card">Task Name: ${task.name}</label>
              </div>
              <br>
              <div class="backlog">
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <label id="card">Tags: ${task.tag}</label>
              </div>
              <br>
              <div class="backlog">
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <label id="card">Priority: ${task.priority}</label>
                <span class="mdl-chip" id="${chip}"></span>
              </div>
              <br>
              <div class="backlog">
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <label id="card">Story Points: ${task.storyPoint}</label>
              </div>
              <div data-canSelect='0'>
                <br>
                <br>
                &nbsp; &nbsp; &nbsp;
                <button id="show-dialog(${i})" input type="button" style="color:black; background-color: lightgray;"
                class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onclick=displayDialog(${i})>Details</button>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;\
                <br>
                <br>
              </div>
            </form>
          </div>
      `;
        if (selectedTask.includes(task)) {
            taskCard.classList.add("selectedCard");
        }
        backlogRef.append(taskCard);
    }
    return;
}

/**
 * Updates the html element's visual look to represent the selection.
 * Then adds selected task to the selectTask list.
 * 
 * @param {MouseEvent} e mouse event that happened.
 * @param {Element} taskCard html card element of the selected task.
 * @param {BacklogTasks} task task associated to selected card.
 * @returns 
 */
function selectTask(e, taskCard, task) {
    if (!selectMode) { return }
    e = e.target;
    let tempIndex = parseInt(e.getAttribute('data-canSelect'));
    while (isNaN(tempIndex) | tempIndex == null) {
        try {
            e = e.parentNode
        } catch (e) {
            return;
        }
        tempIndex = parseInt(e.getAttribute('data-canSelect'));
    }

    if (tempIndex) {
        if (taskCard.classList.contains("selectedCard")) {
            taskCard.classList.remove("selectedCard");
            selectedTask = selectedTask.filter(t => t != task);
        } else {
            taskCard.classList.add("selectedCard");
            selectedTask.push(task);
            selectedCard.push(taskCard);
        }
    };
}


/**
 * Confirm if user wants to delete task, then update deleted task in the local storage.
 * 
 * @param {number} index of the filtered task.
 */
function deleteTask(index) {
    // Confirm if user wants to delete task
    if (confirm(`Confirm to delete "${filteredTasks[index].name}"`)) {
        updateDeletedTask(index);
    }
}

/**
 * Update delete task in backlog.
 * @param {number} index index of the task in filteredTask
 */
function updateDeletedTask(index) {
    let task = filteredTasks[index];
    let priority = task.priority;
    let matchTask = (element) => element == task;
    if (priority == 'critical') {
        let index = backlogTasks.criticalPriorityList.findIndex(matchTask);
        backlogTasks.removeCriticalPriority(index);
    }
    else if (priority == 'high') {
        let index = backlogTasks.highPriorityList.findIndex(matchTask);
        backlogTasks.removeHighPriority(index);
    }
    else if (priority == 'medium') {
        let index = backlogTasks.mediumPriorityList.findIndex(matchTask);
        backlogTasks.removeMediumPriority(index);
    }
    else if (priority == 'low') {
        let index = backlogTasks.lowPriorityList.findIndex(matchTask);
        backlogTasks.removeLowPriority(index);
    }

    // Update LS
    updateLSData(BACKLOGTASKS_KEY, backlogTasks);
    allTasks = [].concat(backlogTasks.criticalPriorityList, backlogTasks.highPriorityList, backlogTasks.mediumPriorityList, backlogTasks.lowPriorityList);

    // Update display
    filter();
}

/**
 * Display detail of the task in a dialog.
 * 
 * @param {number} index of the filtered task.
 */
function displayDialog(index) {
    let task = filteredTasks[index];
    // Update LS
    updateLSData(CURRENTPAGE_KEY, 'backlogSelection.html');
    updateLSData(CURRENTTASK_KEY, task);
    updateLSData(CURRENTTASKINDEX_KEY, index);
    // update content
    document.getElementById("dialog_title").innerHTML = task.name;
    document.getElementById("dialog_content").innerHTML = task.display();

    // display dialog
    dialog.showModal();

    //closes when clicked
    dialog.querySelector('.close').addEventListener('click', function () {
        dialog.close();
    });
}

/**
 * Called when selection of tasks are about to be confirmed. 
 * Confirming if user wants to add select tasks to sprint.
 * Updating backlog by deleting the added tasks from them.
 */
function saveSelection() {
    // confirming if user wants to add selected task
    if (confirm(`Confirm to make these selections?`)) {
        currentSprint.clearAllTask();
        selectedTask.forEach(task => { currentSprint.addTask(task); }
        );

        // removes tasks from backlog 
        backlogTasks.lowPriorityList = backlogTasks.lowPriorityList.concat(currentSprintTask.filter(e => e.priority == "low")).filter(e => !selectedTask.includes(e));
        backlogTasks.highPriorityList = backlogTasks.highPriorityList.concat(currentSprintTask.filter(e => e.priority == "high")).filter(e => !selectedTask.includes(e));
        backlogTasks.mediumPriorityList = backlogTasks.mediumPriorityList.concat(currentSprintTask.filter(e => e.priority == "medium")).filter(e => !selectedTask.includes(e));
        backlogTasks.criticalPriorityList = backlogTasks.criticalPriorityList.concat(currentSprintTask.filter(e => e.priority == "critical")).filter(e => !selectedTask.includes(e));

        // updating local storage
        listOfSprints.replaceOldSprint(currentSprint)
        updateLSData(LISTOFSPRINTS_KEY, listOfSprints);
        updateLSData(BACKLOGTASKS_KEY, backlogTasks);
        updateLSData(SELECTED_SPRINT_KEY, currentSprint);
        return true;
    }
    return false;
}

/**
 * Called when complete sprint button is clicked.
 * Changes the state of sprint to completed.
 */
function startSprint() {
    if (confirm("Would you like to start this sprint?")) {
        saveSelection();
        currentSprint.state = "In Progress"
        listOfSprints.replaceOldSprint(currentSprint);
        updateLSData(SELECTED_SPRINT_KEY, currentSprint);
        updateLSData(LISTOFSPRINTS_KEY, listOfSprints);
        window.location.href = "sprintboard.HTML";
    }
}

let currentSprintTask = [].concat(currentSprint.taskList.notStarted, currentSprint.taskList.inProgress, currentSprint.taskList.complete);
let allTasks = [].concat(currentSprintTask, backlogTasks.criticalPriorityList, backlogTasks.highPriorityList, backlogTasks.mediumPriorityList, backlogTasks.lowPriorityList);

let filteredTasks = allTasks;
// register dialog
var dialog = document.querySelector('dialog');
if (!dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
}

// sets up selection mode
let selectMode = true;
let selectedTask = [].concat(currentSprint.taskList.notStarted, currentSprint.taskList.inProgress, currentSprint.taskList.complete);
let selectedCard = Array();
document.getElementById("startButton").addEventListener('click', _ => startSprint());

// confirms
document.getElementById("saveButton").addEventListener('click', _ => {
    if (saveSelection()) window.location = "listOfSprints.html";
})
// Display tasks when page loads if backlogTasks is not empty
filter();
displayTasks();

