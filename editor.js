 class Model {
    static idCountTask = 0
    static finishCount = 0
    static removeCount = 0
    static taskCount = 0
    constructor() {
      const list = JSON.parse(localStorage.getItem('list')) || []
      // const list = new Array()
      let index = 0 
      console.table(this.list)
      this.list = new Array()
      list.forEach((element) => {
        if (element.id > Model.idCountTask) {
          Model.idCountTask = element.id
        }
        if (element.status == ModelTask.statusFinish) {
          ++Model.finishCount
        }
        if (element.status == ModelTask.statusRemove) {
          ++Model.removeCount
        }
        if (element.status == ModelTask.statusNone) {
          ++Model.taskCount
        }

        const task = new ModelTask(element)
        this.list[index++] = task
        
        
        // Model.reloadTask(element.id, element.text, element.status)
      })
      this.list[0] = {
        id: ++Model.idCountTask,
        text: 'finished task example 1',
        status: ModelTask.statusFinish,
        schedule: false,
      }
      this.list[1] = { 
        id: ++Model.idCountTask,
        text: 'finished task example 2',
        status: ModelTask.statusFinish,
        schedule: false,
      }
      this.list[2] = {
        id: ++Model.idCountTask,
        text: 'finished task example 3',
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
      Model.taskCount = 3
      Model.finishCount = 3
      Model.removeCount = 3
    }
  
    bindTaskListChanged(callback) {
      this.onTaskListChanged = callback
    }
  
    _commit(list) {
      this.onTaskListChanged(list)
      localStorage.setItem('list', JSON.stringify(list))
      console.log(list);
    }

  
    addTask(taskObject) {
     
      const task = new ModelTask(taskObject)

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

    recoverTask(id) {
      let task = this.list.find(element => element.id === id)
      task.recoverModelTask(id)

      
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

    constructor(task) {
      if (task.id == undefined) 
        this.id = ++Model.idCountTask
      else 
        this.id = task.id
      this.text = task.text
      if (task.status == undefined) 
        this.status = ModelTask.statusNone
      else 
        this.status = task.status 
      ++Model.taskCount
    }
    
  
    editModelTask(id, updatedText) {
      this.id === id ? this.text = updatedText : this.text
    }
  
    removeModelTask(id) {
      this.id === id ? this.status = ModelTask.statusRemove : this.status
      ++Model.removeCount
      Model.taskCount--
    }
    
    recoverModelTask(id) {
      if (this.id === id) {
        if (this.status == ModelTask.statusFinish) {
          Model.finishCount--
          ++Model.taskCount
        }
        if (this.status == ModelTask.statusRemove) {
          Model.removeCount--
          ++Model.taskCount
        }
        this.status = ModelTask.statusNone 
      }

    }

    finishModelTask(id) {
      this.id === id ? this.status = ModelTask.statusFinish : this.status
      ++Model.finishCount
      Model.taskCount--
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
        this.form.classList.add('task-list-form')

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

        // create u-lists
        this.taskList = this.createElement('ul', 'task-list')
        this.finishList = this.createElement('ul', 'finish-list')
        this.removeList = this.createElement('ul', 'remove-list')
          // add attributes to the bottom lists
          // this.finishList.classList.add('bottom-list')
          // this.removeList.classList.add('bottom-list')
          // add titles to the lists
            // create a h1 title 
            this.h1 = this.createElement('h1')
            // add atributes to the title
            this.h1.textContent = 'Tasks'
            // create a h4 finish title
            this.h4finish = this.createElement('h4')
              // add atributes to the finish-title
              
           

      // append the task input and submit button to the form
      this.form.append(this.input, this.submitButton)

      // create and append finish list to a container
      this.finishListContainer = this.createElement('div')
      this.finishListContainer.classList.add('finish-list-container')
      this.finishListContainer.append(this.h4finish, this.finishList)
           // create a h4 remove title
           this.h4remove = this.createElement('h4')
           // add atributes to the remove-title
           
      // create and append remove list to a container
      this.removeListContainer = this.createElement('div')
      this.removeListContainer.classList.add('remove-list-container')
      this.removeListContainer.append(this.h4remove, this.removeList)

      this.taskListContainer = this.createElement('div')
      this.taskListContainer.classList.add('tasklist-container')

      this.bottomContainer = this.createElement('div')
      this.bottomContainer.classList.add('bottom-container')
      
      this.table = this.createElement('table')
      this.table.classList.add('table')

      this.tableRow = this.createElement('tr')
      this.tableRow.classList.add('table-row')

      this.leftColumn = this.createElement('td')
      this.leftColumn.classList.add('left-column')

      this.centerColumn = this.createElement('td')
      this.centerColumn.classList.add('center-column')

      this.rightColumn = this.createElement('td')
      this.rightColumn.classList.add('right-column')


     
      // append title, task-list, form, finish-list and remove-list to the app
      this.rightColumn.append(this.h1, this.taskList)
      this.tableRow.append( this.leftColumn, this.centerColumn, this.rightColumn)
      this.table.append(this.tableRow)
      this.taskListContainer.append(this.table)
      this.bottomContainer.append(this.form, this.finishListContainer, this.removeListContainer)

      this.app.append(this.taskListContainer, this.bottomContainer)
      
      
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
      if (Model.finishCount == 0) {this.h4finish.textContent = ''}
      else {this.h4finish.textContent = 'Finished tasks ' + Model.finishCount}
      if (Model.removeCount == 0) {this.h4remove.textContent = ''}
      else {this.h4remove.textContent = 'Removed tasks ' + Model.removeCount}
      // this.h4remove.textContent = 'Removed tasks ' + Model.removeCount

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
          // if the task has no status create a checkbox and remove-button 
          if (task.status === ModelTask.statusNone) {
            
            // create button for finishing tasks
            const finishButton = this.createElement('button', 'finish')
            finishButton.textContent = 'Finish'

            // create remove-button for removing tasks
            const removeButton = this.createElement('button', 'remove')
            removeButton.textContent = 'Remove'

            //append the buttons to the list item
            li.append(removeButton, finishButton)
          }

          if (task.status === ModelTask.statusFinish || task.status === ModelTask.statusRemove) {
            // create recover-button for recovering tasks
            const recoverButton = this.createElement('button', 'recover')
            recoverButton.textContent = 'Recover'

            //append the recover-button to the list item
            li.append(recoverButton)
          }
  
          const span = this.createElement('span')
          span.contentEditable = true
          span.classList.add('editable')
  
          
          span.textContent = task.text
          
          
          
          
          const todayButton = this.createElement('button', 'today')
          todayButton.textContent = 'Today'
          const tommorowButton = this.createElement('button', 'tommorow')
          tommorowButton.textContent = 'Tommorow'

          
          li.append( span)
  
          // Append nodes
          // Append to tasklist
          if (task.status === ModelTask.statusNone) {
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
      if (Model.taskCount === 0 && list.length !== 0) {
        const p = this.createElement('p')
        p.textContent = 'Everything done, add more?'
        this.taskList.append(p)
      }
  
      // Debugging
      console.table(list)
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
      this.taskList.addEventListener('click', event => {
        if (event.target.type === 'finish') {
          const id = parseInt(event.target.parentElement.id)
  
          handler(id)
        }
      })
    }

    bindRecoverTask(handler) {
      this.finishList.addEventListener('click', event => {
        if (event.target.className === 'recover') {
          const id = parseInt(event.target.parentElement.id)
  
          handler(id)
        }
      })
      this.removeList.addEventListener('click', event => {
        if (event.target.className === 'recover') {
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
      this.view.bindRecoverTask(this.storeRecoverTask)
      this.view.bindFinishTask(this.storeFinishTask)
      // this.view.bindScheduleTodayTask(this.storeScheduleTodayTask)

      // Display initial list
      this.onTaskListChanged(this.model.list)
    }
    onTaskListChanged = list => {
      this.view.displayTasks(list)
    }
    storeAddTask = todoText => {
      const task = new Object()
      task.text = todoText
      this.model.addTask(task)
    }
    storeEditTask = (id, todoText) => {
      this.model.editTask(id, todoText)
    }
    storeRemoveTask = id => {
      this.model.removeTask(id)
    }
    storeRecoverTask = id => {
      this.model.recoverTask(id)
    }
    storeFinishTask = id => {
      this.model.finishTask(id)
    }
    // handleScheduleTodayTask = id => {
    //   this.model.scheduleTodayTask(id)
    // }
  }
  
  const app = new Controller(new Model(), new View())

 