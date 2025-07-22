"use strict";
/***********************************************************************
* FILENAME :        shared.js             
*
* DESCRIPTION :
*       This file includes the definitions of the classes used throughout the web app.
*
* TEAM : 014    
* AUTHOR:  Behnam Mozafari, Jia Tan, Yue Yao Yan, Tharindu Ranaweera, Ropa Chigumadzi
* LAST MODIFIED DATE : 10/17/2022   
*
**/


/**
 * BacklogTasks class
 */
class BacklogTasks {
    constructor() {
        this._criticalPriorityList = [];
        this._highPriorityList = [];
        this._mediumPriorityList = [];
        this._lowPriorityList = [];
    }
    get criticalPriorityList() { return this._criticalPriorityList; }
    get highPriorityList() { return this._highPriorityList; }
    get mediumPriorityList() { return this._mediumPriorityList; }
    get lowPriorityList() { return this._lowPriorityList; }

    set criticalPriorityList(criticalPriorityList) { this._criticalPriorityList = criticalPriorityList; }
    set highPriorityList(highPriorityList) { this._highPriorityList = highPriorityList; }
    set mediumPriorityList(mediumPriorityList) { this._mediumPriorityList = mediumPriorityList; }
    set lowPriorityList(lowPriorityList) { this._lowPriorityList = lowPriorityList; }
    addCriticalPriority(task) {
        this._criticalPriorityList.push(task);
    }
    addHighPriority(task) {
        this._highPriorityList.push(task);
    }
    addMediumPriority(task) {
        this._mediumPriorityList.push(task);
    }
    addLowPriority(task) {
        this._lowPriorityList.push(task);
    }
    removeCriticalPriority(index) {
        this._criticalPriorityList.splice(index, 1);
    }
    removeHighPriority(index) {
        this._highPriorityList.splice(index, 1);
    }
    removeMediumPriority(index) {
        this._mediumPriorityList.splice(index, 1);
    }
    removeLowPriority(index) {
        this._lowPriorityList.splice(index, 1);
    }
    replaceCriticalPriority(index, task) {
        this._criticalPriorityList[index] = task;
    }

    addTask(task) {
        if (task.priority.toUpperCase() == "CRITICAL") {
            this._criticalPriorityList.push(task);
        } else if (task.priority.toUpperCase() == "HIGH") {
            this._highPriorityList.push(task);
        } else if (task.priority.toUpperCase() == "MEDIUM") {
            this._mediumPriorityList.push(task);
        } else {
            this._lowPriorityList.push(task);
        }
    }

    replaceOldTask(newTask) {
        let li = this._criticalPriorityList.find(e => e.equal(newTask)) ? this._criticalPriorityList
            : this._highPriorityList.find(e => e.equal(newTask)) ? this._highPriorityList
                : this._mediumPriorityList.find(e => e.equal(newTask)) ? this._mediumPriorityList : this._lowPriorityList;

        let oldTask = li.find(e => e.equal(newTask));

        if (oldTask.priority == newTask.priority) {
            li[li.findIndex(e => e.equal(oldTask))] = newTask;
        } else {
            li.splice(li.findIndex(e => e.equal(oldTask)), 1);
            this.addTask(newTask);
        }
    }


    replaceHighPriority(index, task) {
        this._highPriorityList[index] = task;
    }
    replaceMediumPriority(index, task) {
        this._mediumPriorityList[index] = task;
    }
    replaceLowPriority(index, task) {
        this._lowPriorityList[index] = task;
    }
    // finds number of tasks
    checkLength() {
        let len1 = this._lowPriorityList.length;
        let len2 = this._mediumPriorityList.length;
        let len3 = this._highPriorityList.length;
        let len4 = this._criticalPriorityList.length;
        return +len1 + +len2 + +len3 + +len4;
    }
    fromData(data) {
        this._criticalPriorityList = [];
        this._highPriorityList = [];
        this._mediumPriorityList = [];
        this._lowPriorityList = [];
        if (data._criticalPriorityList) {
            for (let i = 0; i < data._criticalPriorityList.length; i++) {
                let task = new Task;
                task.fromData(data._criticalPriorityList[i]);
                this._criticalPriorityList.push(task);
            }
        }
        if (data._highPriorityList) {
            for (let i = 0; i < data._highPriorityList.length; i++) {
                let task = new Task;
                task.fromData(data._highPriorityList[i]);
                this._highPriorityList.push(task);
            }
        }
        if (data._mediumPriorityList) {
            for (let i = 0; i < data._mediumPriorityList.length; i++) {
                let task = new Task;
                task.fromData(data._mediumPriorityList[i]);
                this._mediumPriorityList.push(task);
            }
        }
        if (data._lowPriorityList) {
            for (let i = 0; i < data._lowPriorityList.length; i++) {
                let task = new Task;
                task.fromData(data._lowPriorityList[i]);
                this._lowPriorityList.push(task);
            }
        }
    }

}



/**
 * Task Class
 */
class Task {
    static _id = 1;
    constructor(name, type, storyPoint, priority, tag, status, assignee, description) {
        this._name = name;
        this._type = type;
        this._storyPoint = storyPoint;
        this._type = type;
        this._tag = tag;
        this._status = status;
        this._priority = priority;
        this._assignee = assignee;
        this._description = description;
        this._totalTime = 0;
        this._taskContributions = [];
        this._id = Task._id;
        Task._id++;
    }
    get name() { return this._name; }
    get type() { return this._type; }
    get storyPoint() { return this._storyPoint; }
    get tag() { return this._tag; }
    get priority() { return this._priority; }
    get status() { return this._status; }
    get assignee() { return this._assignee; }
    get description() { return this._description; }
    get taskContributions() { return this._taskContributions; }
    get totalTime() { return this._totalTime; }
    set name(newName) { this._name = newName; }
    set storyPoint(newStoryPoint) { this._storyPoint = newStoryPoint; }
    set type(newType) { this._type = newType; }
    set tag(newTag) { this._tag = newTag; }
    set priority(newPriority) { this._priority = newPriority; }
    set assignee(assignee) { this._assignee = assignee; }
    set status(status) { this._status = status; }
    set taskContributions(newList) { this._taskContributions = newList; }
    set description(newDescription) { this._description = newDescription; }
    set totalTime(newTime) { this._totalTime = newTime; }
    addContribution(taskContribution) {
        this._taskContributions.push(taskContribution);
        this._totalTime += taskContribution.workTime;
    }
    priorityColour() {
        let chip = '';
        if (this._priority == 'critical') {
            chip = "darkredchip";
        }
        else if (this._priority == 'high') {
            chip = "redchip";
        }
        else if (this._priority == 'medium') {
            chip = "orangechip";
        }
        else {
            chip = "greenchip";
        }
        return chip;
    }
    statusColour() {
        let chip = '';
        if (this._status == 'Not Started') {
            chip = "redchip";
        }
        else if (this._priority == 'In Progress') {
            chip = "orangechip";
        }
        else {
            chip = "greenchip";
        }
        return chip;
    }
    // html to be displayed in popup
    display() {

        return "<p>" +
            "Type: " + this._type +
            "<br>" +
            "Story points: " + this._storyPoint +
            "<br>" +
            "Tags: " + this._tag +
            "<br>" +
            "Priority: " + this._priority + " " + `<span class="mdl-chip" id="${this.priorityColour()}"></span>` +
            "<br>" +
            "Assignee: " + this._assignee.name +
            "<br>" +
            "Status: " + this._status + " " + `<span class="mdl-chip" id="${this.statusColour()}"></span>` +
            "<br>" +
            "Total time: " + this._totalTime.toFixed(2) + " hours" +
            "<br>" +
            "Description: " + this._description +
            "</p>";
    }
    equal(task) {
        return this._id == task._id;
    }
    fromData(data) {
        this._id = data._id;
        this._name = data._name;
        this._type = data._type;
        this._storyPoint = data._storyPoint;
        this._priority = data._priority;
        this._tag = data._tag;
        this._assignee = data._assignee;
        this._description = data._description;
        this._totalTime = data._totalTime;
        this._status = data._status;
        this._taskContributions = [];
        this._assignee = new Member;
        this._assignee.fromData(data._assignee);
        if (data._taskContributions) {
            for (let i = 0; i < data._taskContributions.length; i++) {
                let taskContribution = new TaskContribution;
                taskContribution.fromData(data._taskContributions[i]);
                this._taskContributions.push(taskContribution);
            }
        }
    }
}

/**
 * TaskContribution class
 */
class TaskContribution {
    static _id = 1;
    constructor(date, workTime, user) {
        this._date = date;
        this._workTime = workTime;
        this._user = user;
        this._id = TaskContribution._id;
        TaskContribution._id++;
    }
    get date() { return this._date; }
    get workTime() { return this._workTime; }
    get user() { return this.user; }
    set date(newDate) { this._date = newDate; }
    set workTime(newWorkTime) { this._workTime = newWorkTime; }
    set user(newUser) { this._user = newUser; }
    equal(other) {
        return this._id == other._id;
    }
    fromData(data) {
        this._id = data._id;
        this.date = data._date;
        this.workTime = data._workTime;
        this.user = data._user;
    }
}

/**
 * Team class
 */
class Team {
    constructor() {
        this._memberList = []
    }
    get memberList() { return this._memberList; }
    addMember(member) {
        this._memberList.push(member);
    }
    getMember(index) {
        return this._memberList[index];
    }
    getMemberIndex(member) {
        return this._memberList.findIndex(e => e.name == member.name && e.email == member.email && e.meanWorkHours == member.meanWorkHours);
    }
    removeMember(index) {
        this._memberList.splice(index, 1);
    }
    replaceOldMember(member) {
        this._memberList[this._memberList.findIndex(e => e.equal(member))] = member;
    }
    replaceMember(index, member) {
        this._memberList[index] = member;
    }
    fromData(data) {
        this._memberList = [];
        if (data._memberList) {
            for (let i = 0; i < data._memberList.length; i++) {
                let member = new Member;
                member.fromData(data._memberList[i]);
                this._memberList.push(member);
            }
        }
    }
}

/**
 * Member class
 */
class Member {
    static _id = 1;
    constructor(name, email) {
        this._name = name;
        this._email = email;
        this._meanWorkHours = 0;
        this._totalWorkHrs = 0
        this._no_of_days = 0
        this._memberContributions = [];
        this._id = Member._id;
        Member._id++;
    }
    get name() { return this._name; }
    get email() { return this._email; }
    get meanWorkHours() { return this._meanWorkHours; }
    get memberContributions() { return this._memberContributions; }
    get startDateHrsDisplay() { return this._startDateHrsDisplay; }
    get endDateHrsDisplay() { return this._endDateHrsDisplay; }
    addContribution(taskContribution) {
        this._memberContributions.push(taskContribution);
        this.meanWorkHoursCalc()
    }
    meanWorkHoursCalc(startDateHrsDisplay, endDateHrsDisplay) {
        let startDate = new Date(startDateHrsDisplay);
        let endDate = new Date(endDateHrsDisplay);
        this._totalWorkHrs = 0;
        this._no_of_days = [];
        for (let i = 0; i < this._memberContributions.length; i++) {
            let dt = new Date(this._memberContributions[i].date);
            if ((dt > startDate) && (dt < endDate)) {
                this._totalWorkHrs += this._memberContributions[i].workTime;
                this._no_of_days.find(e => e == dt) ? this._no_of_days : this._no_of_days.push(dt);
            }
        }
        this._meanWorkHours = Math.round((this._totalWorkHrs * 1000 / this._no_of_days.length)) / 1000;
        this._meanWorkHours = this._meanWorkHours ? this._meanWorkHours : 0;
        console.log(this._meanWorkHours);
    }

    equal(other) {
        return this._id == other._id;
    }

    fromData(data) {
        this._id = data._id;
        this._name = data._name;
        this._email = data._email;
        this._meanWorkHours = data._meanWorkHours;
        this._memberContributions = [];
        if (data._memberContributions) {
            for (let i = 0; i < data._memberContributions.length; i++) {
                let taskContribution = new TaskContribution;
                taskContribution.fromData(data._memberContributions[i]);
                this._memberContributions.push(taskContribution);
            }
        }
    }
}

/**
 * ListOfSprints class
 */
class ListOfSprints {
    constructor() {
        this._listOfSprints = [];
    }
    get listOfSprints() { return this._listOfSprints; }
    addSprint(sprint) {
        this._listOfSprints.push(sprint);
    }
    removeSprint(index) {
        this._listOfSprints.splice(index, 1);
    }
    getSprint(index) {
        return this._listOfSprints[index];
    }
    replaceOldSprint(sprint) {
        this._listOfSprints[this._listOfSprints.findIndex(e => e.equal(sprint))] = sprint;
    }
    replaceSprint(index, sprint) {
        this._listOfSprints[index] = sprint;
    }
    fromData(data) {
        this._listOfSprints = [];
        if (data._listOfSprints) {
            for (let i = 0; i < data._listOfSprints.length; i++) {
                let sprint = new Sprint;
                sprint.fromData(data._listOfSprints[i]);
                this._listOfSprints.push(sprint);
            }
        }
    }
}

/**
 * Sprints class
 */
class Sprint {
    static _id = 1;
    constructor(name, startDate, endDate) {
        this._name = name;
        this._startDate = startDate;
        this._endDate = endDate;
        // Duration in days
        this._duration = ((new Date(this._endDate)) - (new Date(this._startDate))) / 86400000;
        this._state = "Not Started";
        this._taskList = {
            notStarted: [],
            inProgress: [],
            complete: []
        };
        this._id = Sprint._id;
        Sprint._id++;
        this._idealVelocity = 0;
    }
    get name() { return this._name; }
    get startDate() { return this._startDate; }
    get endDate() { return this._endDate; }
    get duration() { return this._duration; }
    get state() { return this._state; }
    get taskList() { return this._taskList; }
    set state(newState) {
        this.idealVelocityCalc();
        this._state = newState;
    }
    clearAllTask() {
        this._taskList = {
            notStarted: [],
            inProgress: [],
            complete: []
        };
    }
    addTask(task) {
        if (task.status.toUpperCase() == "NOT STARTED") {
            this._taskList.notStarted.push(task)
        }
        else if (task.status.toUpperCase() == "IN PROGRESS") {
            this._taskList.inProgress.push(task)
        }
        else {
            this._taskList.complete.push(task)
        }
    }
    addTaskAtIndex(task, index) {
        if (task.status.toUpperCase() == "NOT STARTED") {
            this._taskList.notStarted.splice(index, 0, task);
        }
        else if (task.status.toUpperCase() == "IN PROGRESS") {
            this._taskList.inProgress.splice(index, 0, task);
        }
        else {
            this._taskList.complete.splice(index, 0, task);
        }
    }

    removeTask(index, status) {
        if (status.toUpperCase() == "NOT STARTED") {
            this._taskList.notStarted.splice(index, 1)
        }
        else if (status.toUpperCase() == "IN PROGRESS") {
            this._taskList.inProgress.splice(index, 1)
        }
        else {
            this._taskList.complete.splice(index, 1)
        }
    }
    removeTaskAbstract(task) {
        if (task.status.toUpperCase() == "NOT STARTED") {
            this._taskList['notStarted'] = this._taskList['notStarted'].filter(e => e != task) || [];
        }
        else if (task.status.toUpperCase() == "IN PROGRESS") {
            this._taskList['inProgress'] = this._taskList['inProgress'].filter(e => e != task) || [];
        }
        else {
            this._taskList['complete'] = this._taskList['complete'].filter(e => e != task) || [];
        }
    }
    replaceTask(index, status, task) {
        if (status.toUpperCase() == "NOT STARTED") {
            this._taskList.notStarted[index] = task;
        }
        else if (status.toUpperCase() == "IN PROGRESS") {
            this._taskList.inProgress[index] = task;
        }
        else {
            this._taskList.complete[index] = task;
        }
    }

    replaceOldTask(newTask) {
        let li = this._taskList.notStarted.find(e => e.equal(newTask)) ? this._taskList.notStarted
            : this._taskList.inProgress.find(e => e.equal(newTask)) ? this._taskList.inProgress
                : this._taskList.complete;

        let oldTask = li.find(e => e.equal(newTask));

        if (oldTask.status == newTask.status) {
            li[li.findIndex(e => e.equal(oldTask))] = newTask;
        } else {
            li.splice(li.findIndex(e => e.equal(oldTask)), 1);
            this.addTask(newTask);
        }
    }

    equal(other) {
        return this._id == other._id;
    }
    // Ideal velocity calculation
    idealVelocityCalc() {
        for (let i = 0; i < this.taskList.notStarted.length; i++) {
            this._idealVelocity += this.taskList.notStarted[i].storyPoint * 4;
        }
        console.log(this._idealVelocity);
    }
    fromData(data) {
        this._id = data._id;
        this._name = data._name;
        this._idealVelocity = data._idealVelocity
        this._startDate = data._startDate;
        this._endDate = data._endDate;
        this._duration = data._duration;
        this._state = data._state;
        if (data._taskList.notStarted) {
            for (let i = 0; i < data._taskList.notStarted.length; i++) {
                let task = new Task;
                task.fromData(data._taskList.notStarted[i]);
                this._taskList.notStarted.push(task);
            }
        }
        if (data._taskList.inProgress) {
            for (let i = 0; i < data._taskList.inProgress.length; i++) {
                let task = new Task;
                task.fromData(data._taskList.inProgress[i]);
                this._taskList.inProgress.push(task);
            }
        }

        if (data._taskList.complete) {
            for (let i = 0; i < data._taskList.complete.length; i++) {
                let task = new Task;
                task.fromData(data._taskList.complete[i]);
                this._taskList.complete.push(task);
            }
        }
    }

}

/**
 * checkLSData function
 * Used to check if any data in LS exists at a specific key
 * @param {string} key LS Key to be used
 * @returns true or false representing if data exists at key in LS
 */
function checkLSData(key) {
    if (localStorage.getItem(key) != null) {
        return true;
    }
    return false;
}

/**
 * retrieveLSData function
 * Used to retrieve data from LS at a specific key. 
 * @param {string} key LS Key to be used
 * @returns data from LS in JS format
 */
function retrieveLSData(key) {
    let data = localStorage.getItem(key);
    try {
        data = JSON.parse(data);
    }
    catch (err) { }
    finally {
        return data;
    }
}

/**
 * updateLSData function
 * Used to store JS data in LS at a specific key
 * @param {string} key LS key to be used
 * @param {any} data data to be stored
 */
function updateLSData(key, data) {
    let json = JSON.stringify(data);
    localStorage.setItem(key, json);
}

// Global BacklogTasks, ListOfSprints and currentTask variables
let backlogTasks = new BacklogTasks();
let listOfSprints = new ListOfSprints();
let currentTask = new Task();
let currentTaskIndex = 0;
let currentSprint = new Sprint();
let currentMember = new Member();
let listOfMembers = new Team();
let currentPage = "index.html"
// Checking if data available in LS before continuing
if (checkLSData(BACKLOGTASKS_KEY)) {
    let data = retrieveLSData(BACKLOGTASKS_KEY);
    backlogTasks.fromData(data);
}
if (checkLSData(LISTOFSPRINTS_KEY)) {
    let data = retrieveLSData(LISTOFSPRINTS_KEY);
    listOfSprints.fromData(data);
}
if (checkLSData(CURRENTTASK_KEY)) {
    let data = retrieveLSData(CURRENTTASK_KEY);
    currentTask.fromData(data);
}
if (checkLSData(CURRENTTASKINDEX_KEY)) {
    let data = retrieveLSData(CURRENTTASKINDEX_KEY);
    currentTaskIndex = data;
}
if (checkLSData(SELECTED_SPRINT_KEY)) {
    let data = retrieveLSData(SELECTED_SPRINT_KEY);
    currentSprint.fromData(data);
}
if (checkLSData(LISTOFMEMBERS_KEY)) {
    let data = retrieveLSData(LISTOFMEMBERS_KEY);
    listOfMembers.fromData(data);
}
if (checkLSData(CURRENTMEMBER_KEY)) {
    let data = retrieveLSData(CURRENTMEMBER_KEY);
    currentMember.fromData(data);
}
if (checkLSData(CURRENTPAGE_KEY)) {
    let data = retrieveLSData(CURRENTPAGE_KEY);
    currentPage = data;
}