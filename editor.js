var countList = 0
var countTask = 0
var countButton = 0

class List {
    constructor(name) {
        this.id = countList + 1
        this.name = name
    }
}
class Task {

    constructor(name) {
        
        this.id = countTask + 1
        this.name = name
        this.status = false
        this.parent = parentID
        this.nesting = true
        this.removeStatus = true
        this.deadline = false
        this.edited = false

        createTask(this.name)
    }  

    createTask(taskName) {
        const list = document.getElementById('task-list')
        const newItem = document.createElement('li')
        const newSpan = document.createElement('span')
        

        const newIcon = document.createElement('img')
        newIcon.setAttribute('src','/images/trash.png')
        newIcon.setAttribute('alt','Remove')
        newIcon.setAttribute('id','remove-icon')

        const finishChar = '✔️'
        const failChar = '✖️'
        const finishStatus = 'finish'
        const failStatus = 'fail'
        const progressStatus = 'progress'
        const noStatus = 'no'
        
        const finishSwitch = true
        const failSwitch = true
        const progressSwitch = true

    
        class Button {
            constructor(typeButton,htmlClass,htmlID) {
                this.id = countButton + 1 
                this.type = typeButton
            }
            createButton() {
             var createButton = document.createElement('button')
            }
        }

        var removeButton = new Button ('remove') 
        createButton.setAttribute('id','remove-button-' + removeButton.id)
        createButton.setAttribute('class','remove-button')
        createButton.setAttribute('type','button')
        newItem.appendChild(newRemoveButton)  
        const removeButtonListener = document.getElementById('fail-button-' + removeButton.id)
            removeButtonListener.addEventListener('click', () => {
                removeButtonListener.remove()
                });
        
        
            
        newButton.setAttribute('id','fail-button-' + count)
        newButton.setAttribute('class','fail-button')
        newButton.setAttribute('type','button')
        
        newFailButton.setAttribute('onclick','fail(\''+taskType+'\','+count+',\''+failStatus+'\')') 
        // finishSwitch = false;
        
        failArray[count - 1] = false
        newFailButton.innerText = failChar 
    
        
        
        function createFinishButton () {
            newButton.setAttribute('class','finish-button')
            newButton.setAttribute('type','button')
            if (finishSwitch == true) {
            newButton.setAttribute('onclick','status(\''+taskType+'\','+count+',\''+finishStatus+'\')')
            finishArray[count - 1] = 'finish'
            }
            else if (a== b) {}
            newFinishButton.innerText = finishChar 
            newItem.appendChild(newFinishButton) 
            const failButton = document.getElementById('fail-button-' + taskCount)
            failButton.addEventListener('click', () => {
            fail(taskType, count, failStatus)
                });

            }
    }

    newSpan.innerText = task
    
    newItem.setAttribute('id','task-' + taskCount)
    newSubItem.setAttribute('class','task')
        
    createButtons('task')

    newRemoveButton.appendChild(newIcon)
    newItem.appendChild(newSpan)
    
    list.appendChild(newItem)
    subListCreated = false
    
    


    }
    taskNesting() {

    }
    taskStatus () {

    }
    taskSave() {

    }
    taskLoad () {

    }

// id
// status  
// nested
// remove-status
// deadline
// edited    
}

var task1 = new Task('do this you little cunt')
console.log(task1)
var taskString1 = JSON.stringify(task1)
console.log(taskString1);
var taskParse1 = JSON.parse(taskString1)
console.log(taskParse1);

var taskCount = 0
var subTaskCount = 0
var subListCreated = false

var taskFinishArray = Array(taskCount)
var taskFailArray = Array(taskCount)
var subTaskFinishArray = Array(subTaskCount)
var subTaskFailArray = Array(subTaskCount)


const addButton = document.getElementById('add-button')
addButton.addEventListener('click', () => {
   getTask()
  });

function buttonClicked () {
    console.log('clickerino')
}

function checkboxTicked() {
    var select = document.createElement('select')
    var option = document.createElement('option')
    select.appendChild(option)
    document.body.appendChild(select)

}
function getTask() {
    var taskInput = document.getElementById('task-input')
    if (taskInput.value!='') {
    createTask(taskInput.value)
    }
    // else{
    //     alert('we do not allow empty tasks')
    // }
    taskInput.value = ''
}


function createTask(task) {

    var checkboxSubTask = document.getElementById('checkbox-subtask')
    const list = document.getElementById('task-list')

    const newItem = document.createElement('li')
    const newSubList = document.createElement('ul')
    const newSubItem = document.createElement('li')
    const newSpan = document.createElement('span')
    const newRemoveButton = document.createElement('button')
    const newFinishButton = document.createElement('button')
    const newFailButton = document.createElement('button')

    const newIcon = document.createElement('img')
    newIcon.setAttribute('src','/images/trash.png')
    newIcon.setAttribute('alt','Remove')
    newIcon.setAttribute('id','remove-icon')
    const finishChar = '✔️'
    const failChar = '✖️'
    const finishStatus = 'finish'
    const failStatus = 'fail'
    const progressStatus = 'progress'
    const noStatus = 'no'
    
    const finishSwitch = true
    const failSwitch = true
    const progressSwitch = true

    function createButtons(buttonType) {
        

        if (buttonType == 'task') {
            var count = taskCount
            var functionEnder = 'Task'
            var finishArray = taskFinishArray
            var failArray = taskFailArray
            var taskType = 'task'
        }
        else if (buttonType == 'subtask') {
            var count = subTaskCount
            var functionEnder = 'SubTask'
            var finishArray = subTaskFinishArray
            var failArray = subTaskFailArray
            var taskType = 'subtask'
        }
     
    
        newFinishButton.setAttribute('id','finish-button-' + count)
        newFinishButton.setAttribute('class','finish-button')
        newFinishButton.setAttribute('type','button')
        if (finishSwitch == true) {
        newFinishButton.setAttribute('onclick','status(\''+taskType+'\','+count+',\''+finishStatus+'\')')
        finishArray[count - 1] = 'finish'
        }
        else if (a== b) {}
        newFinishButton.innerText = finishChar 

        
            
        newFailButton.setAttribute('id','fail-button-' + count)
        newFailButton.setAttribute('class','fail-button')
        newFailButton.setAttribute('type','button')
        
        newFailButton.setAttribute('onclick','fail(\''+taskType+'\','+count+',\''+failStatus+'\')') 
        // finishSwitch = false;
        
        failArray[count - 1] = false
        newFailButton.innerText = failChar 
    
        newRemoveButton.setAttribute('id','remove-button-' + count)
        newRemoveButton.setAttribute('class','remove-button')
        newRemoveButton.setAttribute('type','button')
        newRemoveButton.setAttribute('onclick','remove(\''+taskType+'\','+count+')')
        
    }

    newSpan.innerText = task
    
    if (checkboxSubTask.checked == false) {
        taskCount = taskCount + 1
        newItem.setAttribute('id','task-' + taskCount)
        newSubItem.setAttribute('class','task')
        
        createButtons('task')

        newRemoveButton.appendChild(newIcon)
        newItem.appendChild(newSpan)
        newItem.appendChild(newRemoveButton)  
        newItem.appendChild(newFailButton) 
        newItem.appendChild(newFinishButton) 
        list.appendChild(newItem)
        subListCreated = false
        
        const failButton = document.getElementById('fail-button-' + taskCount)
        failButton.addEventListener('click', () => {
        fail(taskType, count, failStatus)
        });

        
    }
    else
    {
        subTaskCount = subTaskCount + 1
        const subTaskList = document.getElementById('subtask-list' + taskCount)

        createButtons('subtask')

        if (subListCreated == false) {
        newSubList.setAttribute('id','subtask-list' + taskCount)
        newSubItem.setAttribute('id','subtask-' + subTaskCount)
        newSubItem.setAttribute('class','subtask')

        newRemoveButton.appendChild(newIcon)
        newSubItem.appendChild(newSpan)
        newSubItem.appendChild(newRemoveButton) 
        newSubItem.appendChild(newFailButton) 
        newSubItem.appendChild(newFinishButton)
        newSubList.appendChild(newSubItem)
        list.appendChild(newSubList)
        subListCreated = true 
        }
        else{
            newSubItem.setAttribute('id','subtask-' + subTaskCount)
            newSubItem.setAttribute('class','subtask')

            newRemoveButton.appendChild(newIcon)
            newSubItem.appendChild(newSpan)
            newSubItem.appendChild(newRemoveButton) 
            newSubItem.appendChild(newFailButton) 
            newSubItem.appendChild(newFinishButton)
            subTaskList.appendChild(newSubItem)
        }

    }


}
function remove(taskType, taskNumber) {
    if (taskType == 'task') {
        document.getElementById('task-' + taskNumber).remove()
    }
    else if (taskType == 'subtask') {
        document.getElementById('subtask-' + taskNumber).remove()
    }
}

function taskStatus(taskType, taskNumber, statusType) {
    if (taskType == 'task') {
        var count = taskCount
        var statusArray = taskStatusArray
        var idTag = 'task-'
    }
    else if (taskType == 'subtask') {
        var count = subTaskCount        
        var statusArray = subTaskStatusArray
        var idTag = 'subtask-'
    }
    const numberArray = taskNumber - 1
    const task = document.getElementById(idTag + taskNumber)
    if (statusArray[numberArray] == 'finished') {
        task.setAttribute('class','finished')
    }
    else if (statusArray[numberArray] == 'failed') {
        task.setAttribute('class','failed')
    }
    // else if (statusArray[numberArray] == 'progress') {
    //     task.setAttribute('class','progress')
    // }
    else if (statusArray[numberArray] == false){
        task.removeAttribute('class')
    }

}

function finish(taskType, taskNumber) {
    if (taskType == 'task') {
        var count = taskCount
        var finishArray = taskFinishArray
        var idTag = 'task-'
    }
    else if (taskType == 'subtask') {
        var count = subTaskCount        
        var finishArray = subTaskFinishArray
        var idTag = 'subtask-'
    }
    const numberArray = taskNumber - 1
    const task = document.getElementById(idTag + taskNumber)
    if (finishArray[numberArray] == false) {
        task.setAttribute('class','finished')
        finishArray[numberArray] = true
    }
    else {
        task.removeAttributeNS('class','finished')
        task.removeAttribute('class')
        finishArray[numberArray] = false
    }
}


function fail(taskType, taskNumber) {
    if (taskType == 'task') {
        var count = taskCount
        var failArray = taskFailArray
        var idTag = 'task-'
    }
    else if (taskType == 'subtask') {
        var count = subTaskCount        
        var failArray = subTaskFailArray
        var idTag = 'subtask-'
    }
    const numberArray = taskNumber - 1
    const task = document.getElementById(idTag + taskNumber)
    if (failArray[numberArray] == false) {
        task.setAttribute('class','failed')
        failArray[numberArray] = true
    }
    else {
        task.removeAttributeNS('class','failed')
        task.removeAttribute('class')
        failArray[numberArray] = false
    }
}

