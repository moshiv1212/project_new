"use strict";
/***********************************************************************
* FILENAME :        sprintboard.js             
*
* DESCRIPTION :
*       This file includes the functions required for the sprintboard.html page
*
* TEAM : 014    
* AUTHOR:  Yue Yao Yan, Behnam Mozafari, Jia Tan
* LAST MODIFIED DATE : 10/17/2022   
*
**/

/**
 * complete sprint function
 * Runs when the complete sprint button is clicked
 * marks sprint to be completed and return to the listOfSprint page.
 */
function completeSprint() {
  if (confirm("Would you like to complete this sprint?")) {
    currentSprint.state = "completed"
    listOfSprints.replaceOldSprint(currentSprint);
    updateLSData(SELECTED_SPRINT_KEY, currentSprint);
    updateLSData(LISTOFSPRINTS_KEY, listOfSprints);

    alert("Sprint is now marked completed!");
    // Navigate to index.html
    displaySprint();
  }
  else {
    return;
  }
}
/**
 * Display detail of the sprint and its tasks.
 */
function displaySprint() {
  // references
  let nameRef = document.getElementById("sprintName");
  let dateRef = document.getElementById("sprintDate");

  let notStartedRef = document.getElementById('not_started_content');
  let inProgressRef = document.getElementById('in_progress_content');
  let completedRef = document.getElementById('completed_content');

  // display sprint name and dates
  nameRef.textContent = currentSprint.name;
  dateRef.textContent = `${currentSprint.startDate} - ${currentSprint.endDate}`;

  // Display task for each status
  displayTasks(currentSprint.taskList.notStarted, notStartedRef);
  displayTasks(currentSprint.taskList.inProgress, inProgressRef);
  displayTasks(currentSprint.taskList.complete, completedRef);

  checkSprintComplete();
}

/**
 * Creates HTML card for given task.
 * 
 * @param {Task} task task to be displayed
 * @param {number} index of task
 * @returns HTML for task card.
 */
function getTaskHTML(task, i) {
  let chip = task.priorityColour();
  return `
          <div class="mdl-card mdl-shadow--2dp" id="taskcard" data-canSelect="1">
            <form>
              <div class="backlog">
                <br>
                <label id="card">Task Name: ${task.name}</label>
              </div>
              <br>
              <div class="backlog">
                <label id="card">Tags: ${task.tag}</label>
              </div>
              <br>
              <div class="backlog">
                <label id="card">Priority: ${task.priority}</label>
                <span class="mdl-chip" id="${chip}"></span>
              </div>
              <br>
              <div class="backlog">
                <label id="card">Story Points: ${task.storyPoint}</label>
              </div>
              <div>
                <br>
                <br>
                <button id="show-dialog" input type="button" style="color:black; background-color: lightgray;"
                class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onclick="displayDialog('${task.status}',${i})">
                Details
                </button>
                ${(currentSprint.state != "completed") ? `<button id="show-dialog" input type="button" style="color:black; background-color: lightgray;"
      class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onclick="timelog('${task.status}',${i})">
      Log your time
    </button>`: ``}
                
              </div>
            </form>
          </div>
      `;
}

/**
 * Displays the provided list of task in cards. 
 * If tasksList is empty then "Nothing is here!" would be displayed.
 * 
 * @param {string} status Status of task to be time logged 
 * @param {int} index Index of task to be time logged
 */
function timelog(status, index) {
  let task = getTaskFromHTML(status, index);
  currentTask = task;
  currentTaskIndex = index;
  updateLSData(CURRENTTASKINDEX_KEY, currentTaskIndex);
  updateLSData(CURRENTTASK_KEY, currentTask);
  window.location.href = 'timelog.html';
}


/**
 * Displays the provided list of task in cards. 
 * If tasksList is empty then "Nothing is here!" would be displayed.
 * 
 * @param {Task[]} taskList Array of tasks
 * @param {Element} docRef reference to document for innerHTML to be updated.
 */
function displayTasks(taskList, reference) {
  reference.innerHTML = ``;

  if (currentSprint.state != "completed") {
    reference.addEventListener('dragover', draggedOver);
    reference.addEventListener('dragend', dropped);
  }
  // If there are no tasks, display 'This list is empty'
  if (!taskList || !taskList.length) {
    reference.innerHTML = `
      <h5 class='middle'>This list is empty</h5>
      `;
    return;
  }
  // create card for all task in the taskList and append them to the reference
  for (let i = 0; i < taskList.length; i++) {
    let task = taskList[i];
    let taskCard = document.createElement("div");
    taskCard.className = "mdl-cell mdl-cell--3-col";
    taskCard.style.zIndex = 11;

    // set data attributes
    taskCard.innerHTML = getTaskHTML(task, i);

    // add event listeners to drag and drop if sprint is not completed
    if (currentSprint.state != "completed") {
      taskCard.draggable = true;
      taskCard.style.cursor = 'move';
      taskCard.setAttribute('data-status', task.status);
      taskCard.setAttribute('data-index', i);
      taskCard.addEventListener('dragover', draggedOver);
      taskCard.addEventListener('drag', dragged);
      taskCard.addEventListener('dragend', dropped);
    }

    // append card to the reference list
    reference.append(taskCard);
  }
}
/**
 * Display detail of the task in dialog. 
 * 
 * @param {string} status of task
 * @param {number} index of task in the status list
 */
function displayDialog(status, index) {
  let task = getTaskFromHTML(status, index);

  updateLSData(CURRENTPAGE_KEY, 'sprintboard.HTML');
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
 * Returns the task from given status and index in the status.
 * 
 * @param {string} status of the task.
 * @param {number} index of the task in its status list.
 * @returns Task.
 */
function getTaskFromHTML(status, index) {
  if (status == "Not Started") {
    return currentSprint.taskList.notStarted[index];
  }
  else if (status == "In Progress") {
    return currentSprint.taskList.inProgress[index];
  }
  return currentSprint.taskList.complete[index];
}

/**
 * Returns the task's card element reference.
 * 
 * @param {string} status of the task.
 * @param {number} index of the task in its status list.
 * @returns Element of the task's card.
 */
function getTaskCard(status, index) {
  return getStatusListRef(status).childNodes[index];
}
/**
 * Get status list's reference Element.
 * 
 * @param {sting} status of the reference
 * @returns Element of the status list
 */
function getStatusListRef(status) {
  if (status == "Not Started") {
    return document.getElementById('not_started_content');
  }
  else if (status == "In Progress") {
    return document.getElementById('in_progress_content');
  }
  return document.getElementById('completed_content');
}

/**
 * Updates drag card to its new status.
 */
function insertCard() {
  // variables for new status and position
  let newStatus = draggingOverCard[0];
  let newIndex = draggingOverCard[1];

  // variables for new status and position
  let oldStatus = draggingCard[0];
  let oldIndex = draggingCard[1];
  let moveTask = getTaskFromHTML(oldStatus, oldIndex);

  // update current sprint data
  console.log(moveTask)
  currentSprint.removeTaskAbstract(moveTask);
  moveTask.status = newStatus;
  (newIndex < 0) ? currentSprint.addTask(moveTask) : currentSprint.addTaskAtIndex(moveTask, newIndex);

  //update local storage
  updateLSData(SELECTED_SPRINT_KEY, currentSprint);
  listOfSprints.replaceOldSprint(currentSprint);
  updateLSData(LISTOFSPRINTS_KEY, listOfSprints);

  displaySprint();
}
/**
 * This function is called when the event listener for "drag" triggers
 * for the BacklogTask and gets the index of the Task being dragged. 
 * 
 * @param {MouseEvent} e the BacklogTask that we are targeting
 */
function dragged(e) {
  draggingCard = [(e.target.getAttribute('data-status')), parseInt(e.target.getAttribute('data-index'))];
}
/**
 * This function is called when the event listener for "dragover" triggers
 * for the Task and gets the index where the task card has been dragged to. 
 * 
 * @param {MouseEvent} e the BacklogTask that we are targeting 
 */
function draggedOver(e) {
  e = e.target
  let tempIndex = parseInt(e.getAttribute('data-index'));
  while (isNaN(tempIndex) | tempIndex == null) {
    try {
      e = e.parentNode
    } catch (e) {
      return;
    }
    tempIndex = parseInt(e.getAttribute('data-index'));
  }
  console.log(e.getAttribute('data-index'));
  draggingOverCard = [(e.getAttribute('data-status')), tempIndex];
}

/**
 * burndownLink function
 * This function is called when the burndown button is clicked on the 
 * kanban view of a sprint. It updates the current sprint and navigates to burndown page.
 */
function burndownLink() {
  let sprintName = (element) => element.name == currentSprint.name;
  let ind = listOfSprints.listOfSprints.findIndex(sprintName);
  currentSprint = listOfSprints.listOfSprints[ind];
  updateLSData(SELECTED_SPRINT_KEY, currentSprint);
  window.location.href = "burndown.html";
}

/**
 * This function is called when the event listener for "dragend" triggers
 * for the Task and inserts the relevant Task into its new position using 
 * the values calculated using draggedOver and dragged. Then cards are 
 * then redrawn in the correct positions
 */
function dropped() {
  if (draggingOverCard) {
    insertCard();
  }
  draggingCard = null;
  draggingOverCard = null;
}

/**
 * Checks if a sprint is completed or not and 
 * removes the complete sprint button if it is completed.
 */
function checkSprintComplete() {
  if (currentSprint.state.toUpperCase() == "COMPLETED") {
    document.getElementById('completeSprint').hidden = true;
  }
}

// drag and drop of cards
let draggingCard;
let draggingOverCard;

// register dialog
var dialog = document.querySelector('dialog');
if (!dialog.showModal) {
  dialogPolyfill.registerDialog(dialog);
}

// Display tasks when page loads if backlogTasks is not empty
displaySprint();


