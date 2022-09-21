 class Model {
    static idCountTask = 0
    constructor() {
      // this.list = JSON.parse(localStorage.getItem('list')) || []
      this.list = new Array()
      this.list.forEach((element) => {
        if (element.id > Model.idCountTask) {
          Model.idCountTask = element.id
        }
      })
      this.list[0] = {
        id: ++Model.idCountTask,
        text: 'finised task example 1',
        status: ModelTask.statusFinish,
        schedule: false,
      }
      this.list[1] = {
        id: ++Model.idCountTask,
        text: 'finised task example 2',
        status: ModelTask.statusFinish,
        schedule: false,
      }
      this.list[2] = {
        id: ++Model.idCountTask,
        text: 'finised task example 3',
        status: ModelTask.statusFinish,
        schedule: false,
      }
      this.list[3] = {
        id: ++Model.idCountTask,
        text: 'task example 1',
        status: ModelTask.statusNone,
        schedule: false,
      }
      this.list[4] = {
        id: ++Model.idCountTask,
        text: 'task example 2',
        status: ModelTask.statusNone,
        schedule: false,
      }
      this.list[5] = {
        id: ++Model.idCountTask,
        text: 'task example 3',
        status: ModelTask.statusNone,
        schedule: false,
      }
      this.list[6] = {
        id: ++Model.idCountTask,
        text: 'removed task example 1',
        status: ModelTask.statusRemove,
        schedule: false,
      }
      this.list[7] = {
        id: ++Model.idCountTask,
        text: 'removed task example 2',
        status: ModelTask.statusRemove,
        schedule: false,
      }
      this.list[8] = {
        id: ++Model.idCountTask,
        text: 'removed task example 3',
        status: ModelTask.statusRemove,
        schedule: false,
      }
    }
  
    bindTaskListChanged(callback) {
      this.onTaskListChanged = callback
    }
  
    _commit(list) {
      this.onTaskListChanged(list)
      localStorage.setItem('list', JSON.stringify(list))
    }
  
    addTask(todoText) {
     
      const task = new ModelTask(todoText)
      // const task = {
      //   id: ++Model.idCountTask,
      //   text: todoText,
      //   complete: false,
      //   schedule: false,
      // }

      this.list.push(task)
      this._commit(this.list)
    }
  
    editTask(id, updatedText) {
      let task = this.list.find(element => element.id === id)
      task.editModelTask(id, updatedText)
  
      this._commit(this.list)
    }
  
    removeTask(id) {
      let task = this.list.find(element => element.id === id)
      task.removeModelTask(id)
  
      this._commit(this.list)
    }
  
    finishTask(id) {
      let task = this.list.find(element => element.id === id)
      task.finishModelTask(id)
  
      this._commit(this.list)
    }  

    // scheduleTask(id, days) {
    //   var currentDate = Date()
    //   this.list = this.list.map(task =>
    //     task.id === id ? { id: task.id, text: task.text, complete: task.complete, schedule: currentDate.getDate() + days} : task
    //     )
    //     this._commit(this.list)
    //   }
  }
  class ModelTask {
    static statusNone = 0
    static statusFinish = 1
    static statusRemove = 2

    constructor(todoText) {
      this.id =  ++Model.idCountTask
      this.text = todoText
      this.status = ModelTask.statusNone
      this.schedule = false    
    }
    addModelTask(todoText) {
     
      const task = new Task (todoText)
      console.log(task);
      

      this.list.push(task)
      this._commit(this.list)
    }
  
    editModelTask(id, updatedText) {
      this.id === id ? this.text = updatedText : this.text
    }
  
    removeModelTask(id) {
      this.id === id ? this.status = ModelTask.statusRemove : this.status
    }
  
    finishModelTask(id) {
      this.id === id ? this.status = ModelTask.statusFinish : this.status
    }
  

    // scheduleModelTask(id, days) {

    //   }
  }
  

  class View {
    // construct the initial View
    constructor() {
      // find a place to render our application
      this.app = this.getElement('#root')
      // asign the creation of certain HTML element to class attributes
        // create a form
        this.form = this.createElement('form')
        // create input for entering new tasks inside of the form
        this.input = this.createElement('input')
          // add atributes to the input
          this.input.type = 'text'
          this.input.placeholder = 'Add task'
          this.input.name = 'task'
        // create a submit button
        this.submitButton = this.createElement('button')
          // add atributes to the submit button
          this.submitButton.textContent = 'Submit'
        // create a title of the list
        this.title = this.createElement('h1')
          // add atributes to the submit button
          this.title.textContent = 'Tasks'
        // create u-lists
        this.taskList = this.createElement('ul', 'task-list')
        this.finishList = this.createElement('ul', 'finish-list')
        this.removeList = this.createElement('ul', 'remove-list')
          // add attributes to the bottom lists
          this.finishList.classList.add('bottom-list')
          this.removeList.classList.add('bottom-list')
      // append the task input and submit button to the form
      this.form.append(this.input, this.submitButton)
      // append title, task-list, form, finish-list and remove-list to the app
      this.app.append(this.title, this.taskList, this.form, this.finishList, this.removeList)
      
      
      this._temporaryTaskText = ''
      this._initLocalListeners()
    }
  
    get _todoText() {
      return this.input.value
    }
  
    _resetInput() {
      this.input.value = ''
    }
  
    createElement(tag, className) {
      const element = document.createElement(tag)
  
      if (className) element.classList.add(className)
  
      return element
    }
  
    getElement(selector) {
      const element = document.querySelector(selector)
  
      return element
    }
  
    displayTasks(list) {
      // Delete all nodes
      while (this.taskList.firstChild) {
        this.taskList.removeChild(this.taskList.firstChild)
      }
      while (this.finishList.firstChild) {
        this.finishList.removeChild(this.finishList.firstChild)
      }
      while (this.removeList.firstChild) {
        this.removeList.removeChild(this.removeList.firstChild)
      }
  
      // Show default message
      if (list.length === 0) {
        const p = this.createElement('p')
        p.textContent = 'Nothing to do! Add a task?'
        this.taskList.append(p)
      } 
      else {
        // Create nodes
        list.forEach(task => {
          const li = this.createElement('li')
          li.id = task.id
          if (task.status == ModelTask.statusNone) {
          const checkbox = this.createElement('input')
          checkbox.type = 'checkbox'
          checkbox.checked = Model.statusFinish
          li.append(checkbox)
          }
  
          const span = this.createElement('span')
          span.contentEditable = true
          span.classList.add('editable')
  
          
          span.textContent = task.text
          
          
          
          
          const todayButton = this.createElement('button', 'today')
          todayButton.textContent = 'Today'
          const tommorowButton = this.createElement('button', 'tommorow')
          tommorowButton.textContent = 'Tommorow'

          const removeButton = this.createElement('button', 'remove')
          removeButton.textContent = 'Remove'
          li.append( span, removeButton)
  
          // Append nodes
          // Append to tasklist
          if (task.status == ModelTask.statusNone) {
          this.taskList.append(li)
          }
          // Append to finishlist
          if (task.status == ModelTask.statusFinish) {
            this.finishList.append(li)
            }
          // Append to removelist
          if (task.status == ModelTask.statusRemove) {
            this.removeList.append(li)
            }  
        })
      }
  
      // Debugging
      console.log(list)
    }
  
    _initLocalListeners() {
      this.taskList.addEventListener('input', event => {
        if (event.target.className === 'editable') {
          this._temporaryTaskText = event.target.innerText
        }
      })
    }
  
    bindAddTask(handler) {
      this.form.addEventListener('submit', event => {
        event.preventDefault()
  
        if (this._todoText) {
          handler(this._todoText)
          this._resetInput()
        }
      })
    }
  
    bindRemoveTask(handler) {
      this.taskList.addEventListener('click', event => {
        if (event.target.className === 'remove') {
          const id = parseInt(event.target.parentElement.id)
  
          handler(id)
        }
      })
    }
  
    bindEditTask(handler) {
      this.taskList.addEventListener('focusout', event => {
        if (this._temporaryTaskText) {
          const id = parseInt(event.target.parentElement.id)
  
          handler(id, this._temporaryTaskText)
          this._temporaryTaskText = ''
        }
      })
    }
  
    bindFinishTask(handler) {
      this.taskList.addEventListener('change', event => {
        if (event.target.type === 'checkbox') {
          const id = parseInt(event.target.parentElement.id)
  
          handler(id)
        }
      })
    }

    // bindScheduleTodayTask(handler) {
    //   this.todoList.addEventListener('click', event => {
    //     if (event.target.className === 'today') {
    //       const id = parseInt(event.target.parentElement.id)
  
    //       handler(id)
    //     }
    //   })
    // }
  }
  
  class Controller {
    constructor(model, view) {
      this.model = model
      this.view = view
  
      // Explicit this binding
      this.model.bindTaskListChanged(this.onTaskListChanged)
      this.view.bindAddTask(this.storeAddTask)
      this.view.bindEditTask(this.storeEditTask)
      this.view.bindRemoveTask(this.storeRemoveTask)
      this.view.bindFinishTask(this.storeFinishTask)
      // this.view.bindScheduleTodayTask(this.storeScheduleTodayTask)

      // Display initial list
      this.onTaskListChanged(this.model.list)
    }
    onTaskListChanged = list => {
      this.view.displayTasks(list)
    }
    storeAddTask = todoText => {
      this.model.addTask(todoText)
    }
    storeEditTask = (id, todoText) => {
      this.model.editTask(id, todoText)
    }
    storeRemoveTask = id => {
      this.model.removeTask(id)
    }
    storeFinishTask = id => {
      this.model.finishTask(id)
    }
    // handleScheduleTodayTask = id => {
    //   this.model.scheduleTodayTask(id)
    // }
  }
  
  const app = new Controller(new Model(), new View())

 