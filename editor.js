var taskCount = 0
var subtaskCount = 0
var x = 0

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
    const newButton = document.createElement('button')

    newSpan.innerText = task
    newButton.innerText = 'X'
    if (checkboxSubTask.checked == false) {
        taskCount = taskCount + 1
        newItem.setAttribute('id','task-' + taskCount)
        newButton.setAttribute('type','button')
        newButton.setAttribute('onclick','removeTask('+taskCount +')')
        newItem.appendChild(newSpan)
        newItem.appendChild(newButton)
        list.appendChild(newItem)
        x = 0
    }
    else
    {
        subtaskCount = subtaskCount + 1
        const subTaskList = document.getElementById('subtask-list' + taskCount)
        

        if (x == 0) {
        newSubList.setAttribute('id','subtask-list' + taskCount)
        newSubItem.setAttribute('class','subtask-item')
        newSubItem.appendChild(newSpan)
        newSubList.appendChild(newSubItem)
        list.appendChild(newSubList)
        console.log('newlist');
        x = 1 
        }
        else{
            newSubItem.setAttribute('class','subtask-item')
            newSubItem.appendChild(newSpan)
            subTaskList.appendChild(newSubItem)
            console.log('newitem');
        }

    }


}
function removeTask(tasknumber) {
    document.getElementById('task-' + tasknumber).remove()
}
