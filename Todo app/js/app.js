//get all the vars
const taskForm = document.querySelector('.task-form')
const taskInput = document.querySelector('.task-input')
const taskFilter = document.querySelector('.task-filter')
const addTask = document.querySelector('.add-task')
const taskList = document.querySelector('.list-group')
const clearTasks = document.querySelector('.clear-tasks')


loadEventListener()

//all even isterns are loaded here
function loadEventListener() {

    document.addEventListener('DOMContentLoaded', getTask)
        //this is to add task
    taskForm.addEventListener('submit', taskAdd)

    //remove task
    taskList.addEventListener('click', removeTask)

    //clear task
    clearTasks.addEventListener('click', taskCleared)

    //filter Task
    taskFilter.addEventListener('keyup', filterTask)

}
//getting the task from the local storage
function getTask() {

    let tasks

    if (localStorage.getItem('tasks') == null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task) {
        let li = document.createElement('li')
        li.className = 'list-group-item text-dark float-left justify-content-between'
        li.appendChild(document.createTextNode(task))
        let removeIcon = document.createElement('a')
        removeIcon.className = "remove-task"
        removeIcon.innerHTML = '<i class="d-block float-right mt-1 text-danger active fa fa-trash"></i>'
        li.appendChild(removeIcon)
        taskList.appendChild(li)
    })
}

function taskAdd(e) {
    e.preventDefault()
    if (taskInput.value === '') {
        alert('Kindly input a task')
    } else {
        let li = document.createElement('li')
        li.className = 'list-group-item text-dark float-left justify-content-between'
        li.appendChild(document.createTextNode(taskInput.value))
        let removeIcon = document.createElement('a')
        removeIcon.className = "remove-task"
        removeIcon.innerHTML = '<i class="d-block float-right mt-1 text-danger active fa fa-trash"></i>'
        li.appendChild(removeIcon)
        taskList.appendChild(li)
    }

    //store in ls
    localStorageTask(taskInput.value)

    // Clear input text field
    taskInput.value = '';
}

//add the task input to local storage
function localStorageTask(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function removeTask(e) {
    if (e.target.parentElement.classList.contains('remove-task')) {
        if (confirm('Are you Sure')) {
            e.target.parentElement.parentElement.remove()

            removeTaskFromLocalStorage(e.target.parentElement.parentElement)
        }
    }
}

function removeTaskFromLocalStorage(task) {
    let tasks
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(taskItem, index) {
        if (task.textContent === taskItem) {
            tasks.splice(index, 1)
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks))

}

function taskCleared(e) {
    // taskList.removeChild

    while (taskList.FirstChild) {
        taskList.removeChild

    }
    clearFromLocalStorage()
}

function clearFromLocalStorage() {
    localStorage.clear()
}

function filterTask(e) {
    let task = e.target.value.toLowerCase()
    let fish = document.querySelectorAll('.list-group-item').forEach(function(list) {
        let text = list.firstChild.textContent
        if (text.toLowerCase().indexOf(task) !== -1) {
            list.style.display = "block"
        } else {
            list.style.display = "none"
        }
    })

}

const editTask = document.querySelectorAll('.list-group-item')

editTask.forEach(function(edit) {
    edit.addEventListener('click', function(e) {
        console.log('achieved it')
    })
})