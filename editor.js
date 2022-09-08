var taskCount = 0
var subTaskCount = 0
var subListCreated = false
var taskFinished = Array(taskCount)
var subTaskFinished = Array(subTaskCount)
// var taskFinished = taskFinished.fill(false)

// const form = document.getElementById('edit-form')
// form.addEventListener('onsumbit', getTask())

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

    newSpan.innerText = task
    
    if (checkboxSubTask.checked == false) {
        taskCount = taskCount + 1
        newItem.setAttribute('id','task-' + taskCount)
        newRemoveButton.setAttribute('id','remove-button-' + taskCount)
        newRemoveButton.setAttribute('type','button')
        newRemoveButton.setAttribute('onclick','removeTask('+taskCount +')')
        newRemoveButton.innerText = 'X'

        newFinishButton.setAttribute('id','finish-button-' + taskCount)
        newFinishButton.setAttribute('type','button')
        newFinishButton.setAttribute('onclick','finishTask('+taskCount +')')
        taskFinished[taskCount - 1] = false
        newFinishButton.innerText = 'Finish' 
        newItem.appendChild(newSpan)
        newItem.appendChild(newRemoveButton)     
        newItem.appendChild(newFinishButton)  
        list.appendChild(newItem)
        subListCreated = false
    }
    else
    {
        subTaskCount = subTaskCount + 1
        const subTaskList = document.getElementById('subtask-list' + taskCount)
        

        if (subListCreated == false) {
        newSubList.setAttribute('id','subtask-list' + taskCount)
        newSubItem.setAttribute('id','subtask-' + subTaskCount)

        newRemoveButton.setAttribute('id','remove-button-' + subTaskCount)
        newRemoveButton.setAttribute('type','button')
        newRemoveButton.setAttribute('onclick','removeSubTask('+subTaskCount+')')
        newRemoveButton.innerText = 'X'

        newFinishButton.setAttribute('id','finish-button-' + subTaskCount)
        newFinishButton.setAttribute('type','button')
        newFinishButton.setAttribute('onclick','finishSubTask('+subTaskCount+')')
        subTaskFinished[subTaskCount - 1] = false
        newFinishButton.innerText = 'Finish' 

        newSubItem.appendChild(newSpan)
        newSubItem.appendChild(newRemoveButton)
        newSubItem.appendChild(newFinishButton)
        newSubList.appendChild(newSubItem)
        list.appendChild(newSubList)
        subListCreated = true 
        }
        else{
            newSubItem.setAttribute('id','subtask-' + subTaskCount)

            newRemoveButton.setAttribute('id','remove-button-' + subTaskCount)
            newRemoveButton.setAttribute('type','button')
            newRemoveButton.setAttribute('onclick','removeSubTask('+subTaskCount+')')
            newRemoveButton.innerText = 'X'
    
            newFinishButton.setAttribute('id','finish-button-' + subTaskCount)
            newFinishButton.setAttribute('type','button')
            newFinishButton.setAttribute('onclick','finishSubTask('+subTaskCount+')')
            subTaskFinished[subTaskCount - 1] = false
            newFinishButton.innerText = 'Finish' 

            newSubItem.appendChild(newSpan)
            newSubItem.appendChild(newRemoveButton)
            newSubItem.appendChild(newFinishButton)
            subTaskList.appendChild(newSubItem)
        }

    }


}
function removeTask(taskNumber) {
    document.getElementById('task-' + taskNumber).remove()
}
function finishTask(taskNumber) {
    const taskNumberArray = taskNumber - 1
    const task = document.getElementById('task-' + taskNumber)
    if (taskFinished[taskNumberArray] == false) {
        task.setAttribute('class','finished')
        taskFinished[taskNumberArray] = true
    }
    else {
        task.removeAttributeNS('class','finished')
        task.removeAttribute('class')
        taskFinished[taskNumberArray] = false
    }
}
function removeSubTask(subTaskNumber) {
    console.log(subTaskNumber);
    document.getElementById('subtask-' + subTaskNumber).remove()
}
function finishSubTask(subTaskNumber) {
    const subTaskNumberArray = subTaskNumber - 1
    const subTask = document.getElementById('subtask-' + subTaskNumber)
    if (subTaskFinished[subTaskNumberArray] == false) {
        subTask.setAttribute('class','finished')
        subTaskFinished[subTaskNumberArray] = true
    }
    else {
        subTask.removeAttributeNS('class','finished')
        subTask.removeAttribute('class')
        subTaskFinished[subTaskNumberArray] = false
    }
}

