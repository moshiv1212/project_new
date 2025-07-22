"use strict";
/***********************************************************************
* FILENAME :        backlog.js             
*
* DESCRIPTION :
*       This file includes the functions required for the index.html page
*
* TEAM : 014    
* AUTHOR:  Behnam Mozafari, Jia Tan, Yue Yao Yan, Ropa Chigumadzi
* LAST MODIFIED DATE : 10/17/2022   
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
 * displayTasks function
 * Runs when page loads
 * display tasks from backlog on page
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
    let chip = task.priorityColour();
    // make this element clickable
    taskCard.setAttribute('data-index', i);
    taskCard.innerHTML = `
          <div class="mdl-card mdl-shadow--4dp" id="taskcard" data-canSelect="1">
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
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <a href="">
                  <button style="color:white; background-color: rgb(184, 0, 0);"
                    class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" onclick=deleteTask(${i})> Delete
                  </button>
                </a>
                <br>
                <br>
              </div>
            </form>
          </div>
      `;
    backlogRef.append(taskCard);
  }
  return;
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
 * Update deleted task in the local storage.
 * 
 * @param {number} index of the filtered task.
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
 * displayDialog function
 * Runs when the expand button on a task card is clicked
 * displays popup
 * @param {number} index - index of task to be displayed in allTasks array
 */
function displayDialog(index) {
  let task = filteredTasks[index];
  // Update LS
  updateLSData(CURRENTPAGE_KEY, 'index.html');
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

let allTasks = [].concat(backlogTasks.criticalPriorityList, backlogTasks.highPriorityList, backlogTasks.mediumPriorityList, backlogTasks.lowPriorityList);
let filteredTasks = allTasks;

console.log(backlogTasks)

// register dialog
var dialog = document.querySelector('dialog');
if (!dialog.showModal) {
  dialogPolyfill.registerDialog(dialog);
}

// Display tasks when page loads if backlogTasks is not empty
filter();
displayTasks();

