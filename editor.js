class List {
  constructor() {
    this.id = Date.now()
    this.title = ''
    this.tasks = {}
  }
  /* Loads list from JSON object into class object */
  loadList(jsonList) {
    this.id = jsonList.id
    this.title = jsonList.title
    this.tasks = jsonList.tasks
    for(const id in this.tasks) {
      let oldTask = this.tasks[id].task
      this.tasks[id] = {task:new Task (oldTask.id, oldTask.title, oldTask.listID, oldTask.status)}
    }
  }
  /* Encapsulates task into the this.tasks object */
  encapsulateTask(title) {
    let id = Date.now()
    this.tasks[id] = {task:new Task (id, title, this.id)}
  }
  /* Renders the List onto the page */
  renderList() {
    const domListTitle = document.getElementById('list-title')
    domListTitle.innerHTML = ''
    let domListTitleInput = document.createElement('input')
    domListTitleInput.classList = 'title-input'
    if (this.title === '') {
      // domListTitleInput.classList.add('untitled')
      domListTitleInput.addEventListener('focus', event => {
        domListTitleInput.select()
      })
    }
    domListTitleInput.addEventListener('focusout', event => {
      domListTitleInput.value = list.editTitle(domListTitleInput.value)
    })
    domListTitleInput.addEventListener('keypress', event => {
      if (event.key === 'Enter') {
      domListTitleInput.value = list.editTitle(domListTitleInput.value)
      }
    })
    
    
    const domList = document.getElementById('tasklist')
    domList.innerHTML = ''
    domList.addEventListener('focusout', event => {
      let domTaskInput = event.target
      let id = parseInt(domTaskInput.parentElement.id)
      let value = domTaskInput.value
      let task = this.tasks[id].task
      
      task.editTask(value)
    })
    domList.addEventListener('keypress', event => {
      if (event.key === 'Enter') {
      domListTitleInput.value = list.editTitle(domListTitleInput.value)
      }
    })
    domListTitleInput.value = this.title
    domListTitle.append(domListTitleInput)
    for(const id in this.tasks) {
      let task = this.tasks[id].task
      if(task.status != 'removed')
      domList.innerHTML += createHTML(this.tasks[id].task)
    }
    console.log(this)
    pushChanges()
  }
  editTitle(title) {
    this.title = title
    this.renderList()
  }
}
class Task {
  constructor(id, title, listID, status = 'active') {
    this.id = id
    this.title = title
    this.listID = listID
    this.status = status
    }
  static listID = this.listID
  finishTask() {
    this.status = 'finished'
    list.renderList()
  }
  activateTask() {
    this.status = 'active'
    list.renderList()
  }
  removeTask() {
    this.status = 'removed'
    list.renderList()
  }
  editTask(newTitle) {
    this.title = newTitle
    list.renderList()
  }
}
/* Load in lists from Localstorage */
let list = new List() 
let jsonList = JSON.parse(localStorage.getItem('list'))
if (jsonList != undefined) {
  list.loadList(jsonList)
}
list.renderList()  
function addTask() {
    let taskInput = document.getElementById('task-input')
    if(taskInput.value != '') {
      list.encapsulateTask(taskInput.value)
      taskInput.value = ''
      taskInput.select()
      list.renderList()
    }
  }
  const domList = document.getElementById('tasklist')
  const domListTitle = document.getElementById('list-title')
  const domListTitleInput = domListTitle.firstChild
  domList.addEventListener('click', event => {
    if (event.target.className === 'activate') {
      const id = parseInt(event.target.parentElement.id)
      let task = list.tasks[id].task
      task.activateTask()
    }
    if (event.target.className === 'remove') {
      const id = parseInt(event.target.parentElement.id)
      let task = list.tasks[id].task
      task.removeTask()  
    }
    if (event.target.className === 'finish') {
      const id = parseInt(event.target.parentElement.id)
      let task = list.tasks[id].task
      task.finishTask()
    }
  })
/* Save all tasks to localStorage */
function pushChanges() {
    localStorage.setItem('list', JSON.stringify(list));
}
/* Template for a task */
function createHTML(task) {
  let id = task.id
    return `
        <li id="${id}">
            <input class="task-title${task.status == 'finished' ? ' finished' : ''}" value="${task.title}" placeholder="Untitled todolist">

            ${task.status == 'finished' ? `
            <button class="activate">???</button>
            <button class="remove">???????</button>
            ` : `
            <button class="finish">???</button>
            <button class="remove">???????</button>
            `
        }
        </li>`
}
