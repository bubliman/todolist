/* Load in tasks from Localstorage */
let tasks = JSON.parse(localStorage.getItem('tasks')) ?? { }
renderTasks()

function addTask() {
    if(document.getElementById('task-input').value != '') {
        setTask(Date.now(), document.getElementById('task-input').value, 'active')
        document.getElementById('task-input').value = ''
        document.getElementById('task-input').select()
    }
}

/*
 * status: active | removed | finished
*/
function setTask(id, title, status) {
    tasks[id] = {
        "title": title,
        "status": status,
    }
    renderTasks()
    pushChanges()
}

function renderTasks() {
    const list = document.getElementById('task-list')
    list.innerHTML = ''

    for(const id in tasks)
    {
        if(tasks[id].status != 'removed')
            list.innerHTML += createHTML(tasks[id], id)
    }

    /* Also update the JSON if SPAN is changed, eh hacky */
    document.querySelectorAll('[class~=task-title]').forEach(element => {
        element.addEventListener("input", function(e) {
            tasks[e.srcElement.parentElement.id].title = e.explicitOriginalTarget.textContent
            pushChanges()
        }, false);
    });
}

/* Save all tasks to localStorage */
function pushChanges() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

/* Template for a task */
function createHTML(task, id) {
    return `
        <li id="${id}">
            <span class="task-title ${task.status == 'finished' ? 'finished' : ''} editable" contenteditable="true">${task.title}</span>

            ${task.status == 'finished' ? `
            <button onclick="setTask(${id}, '${task.title}', 'active')" class="recover">Recover</button>
            <button onclick="setTask(${id}, '${task.title}', 'removed')" class="remove">Remove</button>
            ` : `
            <button onclick="setTask(${id}, '${task.title}', 'finished')" class="finish">Finish</button>
            <button onclick="setTask(${id}, '${task.title}', 'removed')" class="remove">Remove</button>
            `
        }
        </li>`
}