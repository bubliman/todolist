
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
  
    deleteTask(id) {
      let task = this.list.find(element => element.id === id)
      task.deleteModelTask(id)
  
      this._commit(this.list)
    }
  
    toggleTask(id) {
      this.list = this.list.map(task => ModelTask.toggleModelTask(id))
  
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
    constructor(todoText) {
      this.id =  ++Model.idCountTask
      this.text = todoText
      this.status = none
      this.schedule = false

      let none = 
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
  
    deleteModelTask(id) {
      this.id === id ? this 
    }
  
    toggleModelTask(id) {
      this.id === id ? !this.complete : this/
  
      this._commit(this.list)
    }
  

    // scheduleModelTask(id, days) {

    //   }
  }
  

  class View {
    constructor() {
      this.app = this.getElement('#root')
      this.form = this.createElement('form')
      this.input = this.createElement('input')
      this.input.type = 'text'
      this.input.placeholder = 'Add task'
      this.input.name = 'task'
      this.submitButton = this.createElement('button')
      this.submitButton.textContent = 'Submit'
      this.form.append(this.input, this.submitButton)
      this.title = this.createElement('h1')
      this.title.textContent = 'Tasks'
      this.todoList = this.createElement('ul', 'task-list')
      this.app.append(this.title, this.form, this.todoList)
  
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
      while (this.todoList.firstChild) {
        this.todoList.removeChild(this.todoList.firstChild)
      }
  
      // Show default message
      if (list.length === 0) {
        const p = this.createElement('p')
        p.textContent = 'Nothing to do! Add a task?'
        this.todoList.append(p)
      } else {
        // Create nodes
        list.forEach(task => {
          const li = this.createElement('li')
          li.id = task.id
  
          const checkbox = this.createElement('input')
          checkbox.type = 'checkbox'
          checkbox.checked = task.complete
  
          const span = this.createElement('span')
          span.contentEditable = true
          span.classList.add('editable')
  
          if (task.complete) {
            const strike = this.createElement('s')
            strike.textContent = task.text
            span.append(strike)
          } else {
            span.textContent = task.text
          }
          
          const todayButton = this.createElement('button', 'today')
          todayButton.textContent = 'Today'
          const tommorowButton = this.createElement('button', 'tommorow')
          tommorowButton.textContent = 'Tommorow'

          const deleteButton = this.createElement('button', 'delete')
          deleteButton.textContent = 'Delete'
          li.append(checkbox, span, deleteButton, tommorowButton, todayButton)
  
          // Append nodes
          this.todoList.append(li)
        })
      }
  
      // Debugging
      console.log(list)
    }
  
    _initLocalListeners() {
      this.todoList.addEventListener('input', event => {
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
  
    bindDeleteTask(handler) {
      this.todoList.addEventListener('click', event => {
        if (event.target.className === 'delete') {
          const id = parseInt(event.target.parentElement.id)
  
          handler(id)
        }
      })
    }
  
    bindEditTask(handler) {
      this.todoList.addEventListener('focusout', event => {
        if (this._temporaryTaskText) {
          const id = parseInt(event.target.parentElement.id)
  
          handler(id, this._temporaryTaskText)
          this._temporaryTaskText = ''
        }
      })
    }
  
    bindToggleTask(handler) {
      this.todoList.addEventListener('change', event => {
        if (event.target.type === 'checkbox') {
          const id = parseInt(event.target.parentElement.id)
  
          handler(id)
        }
      })
    }

    bindScheduleTodayTask(handler) {
      this.todoList.addEventListener('click', event => {
        if (event.target.className === 'today') {
          const id = parseInt(event.target.parentElement.id)
  
          handler(id)
        }
      })
    }
  }
  
  class Controller {
    constructor(model, view) {
      this.model = model
      this.view = view
  
      // Explicit this binding
      this.model.bindTaskListChanged(this.onTaskListChanged)
      this.view.bindAddTask(this.handleAddTask)
      this.view.bindEditTask(this.handleEditTask)
      this.view.bindDeleteTask(this.handleDeleteTask)
      this.view.bindToggleTask(this.handleToggleTask)
      // this.view.bindScheduleTodayTask(this.handleScheduleTodayTask)

      // Display initial list
      this.onTaskListChanged(this.model.list)
    }
    onTaskListChanged = list => {
      this.view.displayTasks(list)
    }
    handleAddTask = todoText => {
      this.model.addTask(todoText)
    }
    handleEditTask = (id, todoText) => {
      this.model.editTask(id, todoText)
    }
    handleDeleteTask = id => {
      this.model.deleteTask(id)
    }
    handleToggleTask = id => {
      this.model.toggleTask(id)
    }
    // handleScheduleTodayTask = id => {
    //   this.model.scheduleTodayTask(id)
    // }
  }
  
  const app = new Controller(new Model(), new View())

 