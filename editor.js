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
      let oldTask = this.tasks[id]
      this.tasks[id] = new Task (oldTask.id, oldTask.title, oldTask.listID, oldTask.status)
    }
  }
  /* Encapsulates task into the this.tasks object */
  encapsulateTask(title) {
    let id = Date.now()
    this.tasks[id] = new Task (id, title, this.id)
  }
  /* Renders the List onto the page */
  renderList() {
    const domListTitle = document.getElementById('list-title')
    domListTitle.innerHTML = ``
    domListTitle.innerHTML = `<input placeholder="Untitled list" class="input-title" value=`+ this.title +`>`
    domListTitle.firstChild.addEventListener('focusout', event => {
      this.title = domListTitle.firstChild.value 
      this.renderList()
    })
    domListTitle.firstChild.addEventListener('keypress', event => {
      if (event.key === 'Enter') {
        this.title = domListTitle.firstChild.value 
        this.renderList()
      }
    })
    
    const domList = document.getElementById('tasklist')
    domList.innerHTML = ''
    
    
    for(const id in this.tasks) {
      let task = this.tasks[id]
      if(task.status != 'removed')
      domList.innerHTML += createHTML(this.tasks[id])

      
    }
  
    console.log(this)
    pushChanges()
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
    let taskInput = document.getElementById('add-input')
    if(taskInput.value != '') {
      list.encapsulateTask(taskInput.value)
      taskInput.value = ''
      taskInput.select()
      list.renderList()
    }
  }
  /* Event listeners for tasks buttons */
  const domList = document.getElementById('tasklist')
  const domListTitle = document.getElementById('list-title')
  const domListTitleInput = domListTitle.firstChild
  domList.addEventListener('click', event => {
    if (event.target.className === 'activate') {
      const id = parseInt(event.target.parentElement.id)
      let task = list.tasks[id]
      task.activateTask()
    }
    if (event.target.className === 'remove') {
      const id = parseInt(event.target.parentElement.id)
      let task = list.tasks[id]
      task.removeTask()  
    }
    if (event.target.className === 'finish') {
      const id = parseInt(event.target.parentElement.id)
      let task = list.tasks[id]
      task.finishTask()
    }
  })
  let taskInput = Array.from(document.getElementsByClassName('input-task'))
      taskInput.forEach(input => {addEventListener('focusout', event => {
      let domTaskInput = input
      let value = domTaskInput.value
      task.editTask(value)
  })
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
            <input id="input-task-${id}" class="input-task${task.status == 'finished' ? ' finished' : ''}" value="${task.title}">

            ${task.status == 'finished' ? `
            <button class="activate">✘</button>
            <button class="remove">🗑️</button>
            ` : `
            <button class="finish">✔</button>
            <button class="remove">🗑️</button>
            `
        }
        </li>`
}
