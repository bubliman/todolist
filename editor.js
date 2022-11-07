class List {
  constructor() {
    this.id = Date.now()
    this.title = 'Untitled List'
    this.tasksMap = new Map();
    const id = Date.now()
    // this.tasksMap.set(id, new Task (id, 'Click here to add a task', this.id))
  }
  addTaskToList(title) {
    let taskID = Date.now()
    this.tasksMap.set(taskID, new Task (taskID, title, this.id))
    console.log(this.tasksMap)
  }
  renderList() {
    const domListTitle = document.getElementById('list-title')
    domListTitle.innerHTML = ''
    let domListTitleInput = document.createElement('input')
    domListTitleInput.classList = 'title-input'
    if (this.title === 'Untitled List') {
      domListTitleInput.classList.add('untitled')
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
    domListTitleInput.value = this.title
    domListTitle.append(domListTitleInput)
    const domList = document.getElementById('tasklist')
    domList.innerHTML = ''

    this.tasksMap.forEach(task => {
      if(task.status != 'removed')
      domList.innerHTML += createHTML(task)
    })
    domList.addEventListener('focusout', event => {
      let task = event.parentElement
      // task.editTask(task.value)
    })
    domList.addEventListener('keypress', event => {
      if (event.key === 'Enter') {
      domListTitleInput.value = list.editTitle(domListTitleInput.value)
      }
    })

    /* Also update the JSON if SPAN is changed, eh hacky */
    // document.querySelectorAll('[class~=task-title]').forEach(element => {
    //     element.addEventlistener("input", function(e) {
    //         tasks[e.srcElement.parentElement.id].title = e.explicitOriginalTarget.textContent
    //         pushChanges()
    //     }, false);
    // });
  }
  editTitle(title) {
    this.title = title
    this.renderList()
  }
  listTitle

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
    list.renderList()
  }
  activateTask(id) {
    this.id === id ? this.status = 'active' : this.status
    list.renderList()
  }
  removeTask(id) {
    this.id === id ? this.status = 'removed' : this.status
    list.renderList()
  }
  editTask() {}
}

// /* Load in lists from Localstorage */
// let list = JSON.parse(localStorage.getItem('list')) ?? { }
// if (list) {
  let list = new List()
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
  const domListTitle = document.getElementById('list-title')
  const domListTitleInput = domListTitle.firstChild
  domList.addEventListener('click', event => {
    if (event.target.className === 'activate') {
      const id = parseInt(event.target.parentElement.id)
      let task = list.tasksMap.get(id)
      task.activateTask(id)
    }
    if (event.target.className === 'remove') {
      const id = parseInt(event.target.parentElement.id)
      let task = list.tasksMap.get(id)
      task.removeTask(id)
      
    }
    if (event.target.className === 'finish') {
      const id = parseInt(event.target.parentElement.id)
      let task = list.tasksMap.get(id)
      task.finishTask(id)
    }
  
  })
 
  

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
            <input class="task-title ${task.status == 'finished' ? 'finished' : ''}" value="${task.title}">

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
