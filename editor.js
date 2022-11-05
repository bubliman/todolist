
class List {
  constructor(title) {
    this.id = Date.now()
    this.title = title
    this.tasksMap = new Map();
    this.tasksMap.set(1, new Task ('Click here to add a task', this.id))
  }
  addTaskToList(title) {
    taskID = Date.now()
    this.id === id ? this.tasksMap.set(taskID, new Task (taskID, title, this.id)) : this.tasksMap
  }
  renderList() {
    const domListTitle = document.getElementById('list-title')
    domListTitle.innerText = this.title
    const domList = document.getElementById('tasklist')
    domList.innerHTML = ''

    this.tasksMap.forEach(task => {
      if(task.status != 'removed')
      domList.innerHTML += createHTML(task)
    })

    /* Also update the JSON if SPAN is changed, eh hacky */
    // document.querySelectorAll('[class~=task-title]').forEach(element => {
    //     element.addEventlistener("input", function(e) {
    //         tasks[e.srcElement.parentElement.id].title = e.explicitOriginalTarget.textContent
    //         pushChanges()
    //     }, false);
    // });
  }
  
}
class Task {
  constructor(id, title, listID) {
    this.id = id
    this.listID = listID
    this.title = title
    this.status = 'active'
    
  }
  static listID = this.listID
  finishTask(id) {
    this.id === id ? this.status = 'finished' : this.status
  }
  activateTask(id) {
    this.id === id ? this.status = 'active' : this.status
  }
  removeTask(id) {
    this.id === id ? this.status = 'removed' : this.status
  }
}

// /* Load in lists from Localstorage */
// let list = JSON.parse(localStorage.getItem('list')) ?? { }
// if (list) {
  let list = new List ('Untitled List')
// }
list.renderList()  
  
function addTask() {
    let taskInput = document.getElementById('task-input')
    if(taskInput.value != '') {
      list.addTaskToList(taskinput.value)
      taskInput.value = ''
      taskInput.select()
      renderList()
    }
  }

/*
 * status: active | removed | finished
*/


/* Save all tasks to localStorage */
function pushChanges() {
    localStorage.setItem('lists', JSON.stringify(list));
}

/* Template for a task */
function createHTML(task) {
  let id = task.id
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