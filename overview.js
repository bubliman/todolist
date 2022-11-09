/* Load in lists from Localstorage */
let lists = JSON.parse(localStorage.getItem('lists')) ?? { }
renderLists()


function renderList() {
    const board = document.getElementById('board-container')
    board.innerHTML = ''

    for(const id in lists)
    {
        if(lists[id].status != 'removed')
            board.innerHTML += createHTML(lists[id], id)
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
    localStorage.setItem('lists', JSON.stringify(lists));
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