
class List {
  constructor(title) {
    this.id = Date.now()
    this.title = title
    this.tasksMap = new Map();
    const id = Date.now()
    this.tasksMap.set(id, new Task (id, 'Click here to add a task', this.id))
  }
  addTaskToList(title) {
    let taskID = Date.now()
    this.tasksMap.set(taskID, new Task (taskID, title, this.id))
    console.log(this.tasksMap)
    
  }
  renderList() {
    const domListTitle = document.getElementById('list-title')
    domListTitle.innerText = this.title
    const domList = document.getElementById('tasklist')
    domList.innerHTML = ''

    this.tasksMap.forEach(task => {
      if(task.status != 'removed')
      domList.innerHTML += createHTML(task)
      this.bindButtons()
    })
    
    
    
    // domList.addEventListener('click', event => {
    //   if (event.target.className === 'remove') {
    //     const id = parseInt(event.target.parentElement.id)
    //     let task = this.tasksMap.get(id)
    //     task.removeTask(id)
    //   }
    // })
    // domList.addEventListener('click', event => {
    //   if (event.target.className === 'finish') {
    //     const id = parseInt(event.target.parentElement.id)
    //     let task = this.tasksMap.get(id)
    //     task.finishTask(id)
    //   }
    // })

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
    this.title = title
    this.listID = listID
    this.status = 'active'
    
  }
  static listID = this.listID
  finishTask(id) {
    this.status = 'finished'
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
      list.addTaskToList(taskInput.value)
      taskInput.value = ''
      taskInput.select()
      list.renderList()
    }
  }
  
  const domList = document.getElementById('tasklist')
  domList.addEventListener('click', event => {
    if (event.target.className === 'activate') {
      const id = parseInt(event.target.parentElement.id)
      let task = list.tasksMap.get(id)
      task.activateTask(id)
      list.renderList
    }
    if (event.target.className === 'remove') {
      const id = parseInt(event.target.parentElement.id)
      let task = list.tasksMap.get(id)
      task.removeTask(id)
      list.renderList
    }
    if (event.target.className === 'finish') {
      const id = parseInt(event.target.parentElement.id)
      let task = list.tasksMap.get(id)
      task.finishTask(id)
      list.renderList
    }
    
  })

  

/*
 * status: active | removed | finished
*/


/* Save all tasks to localStorage */
function pushChanges() {
    localStorage.setItem('lists', JSON.stringify(list));
}
function taskManager(task, id, command) {
  command === 'finish' ? task.finishTask(id) : { }
  command === 'activate' ? task.activateTask(id) : { }
  command === 'remove' ? task.removeTask(id) : { }

}
/* Template for a task */
function createHTML(task) {
  let id = task.id
    return `
        <li id="${id}">
            <span class="task-title ${task.status == 'finished' ? 'finished' : ''} editable" contenteditable="true">${task.title}</span>

            ${task.status == 'finished' ? `
            <button class="activate">Activate</button>
            <button class="remove">Remove</button>
            ` : `
            <button class="finish">Finish</button>
            <button class="remove">Remove</button>
            `
        }
        </li>`
}
