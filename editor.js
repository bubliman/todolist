/* Load in lists from Localstorage */
let list = JSON.parse(localStorage.getItem('list')) ?? { }
if (list = undefined) {
  let list = new List ('Untitled List', , )
}
renderList()  
  
class List {
  constructor(title) {
    this.id = Date.now()
    this.title = title
    this.tasksMap = new Map();
    tasksMap.set(new Task ('Click here to add a task', this.id))
  }
  updateList(tasks) {
    this.id === id ? this.tasks = tasks : this.status
  }
  addTaskToList() {
    new Task
  }
}
/* Load in tasks from Localstorage */
// let tasks = JSON.parse(localStorage.getItem('tasks')) ?? { }
// renderTasks()

function addTask() {
    let taskInput = document.getElementById('task-input')
    if(taskInput.value != '') {
      addTaskToList()
      taskInput.value = ''
      taskInput.select()
      renderList()
    }
  }

/*
 * status: active | removed | finished
*/
class Task {
  constructor(title, listID) {
    this.id = Date.now()
    this.listID = listID
    this.title = title
    this.status = 'active'
    
  }
  static listID = this.listID
  finishTask(id) {
    this.id === id ? this.status = 'finished' : this.status
  }
  activateTask() {
    this.id === id ? this.status = 'active' : this.status
  }
  removeTask() {
    this.id === id ? this.status = 'removed' : this.status
  }
}

function renderList() {
    const domListTitle = document.getElementById('list-title')
    const domList = document.getElementById('tasklist')
    domList.innerHTML = ''

    for(const id in tasks)
    {
        if(tasks[id].status != 'removed')
        domList.innerHTML += createHTML(tasks[id], id)
    }

    /* Also update the JSON if SPAN is changed, eh hacky */
    // document.querySelectorAll('[class~=task-title]').forEach(element => {
    //     element.addEventlistener("input", function(e) {
    //         tasks[e.srcElement.parentElement.id].title = e.explicitOriginalTarget.textContent
    //         pushChanges()
    //     }, false);
    // });
}

/* Save all tasks to localStorage */
function pushChanges() {
    localStorage.setItem('lists', JSON.stringify(list));
}

/* Template for a task */
function createHTML(task, id) {
    return `
        <li id="${id}">
            <span class="task-title ${task.status == 'finished' ? 'finished' : ''} editable" contenteditable="true">${task.title}</span>

            ${task.status == 'finished' ? `
            <button onclick="activateTask(${id})" class="activate">Activate</button>
            <button onclick="removeTask(${id})" class="remove">Remove</button>
            ` : `
            <button onclick="finishTask(${id})" class="finish">Finish</button>
            <button onclick="removeTask(${id})" class="remove">Remove</button>
            `
        }
        </li>`
}