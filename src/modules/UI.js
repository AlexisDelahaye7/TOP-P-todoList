import { project } from './Project'
import { tasksList, getLocalStorage, setLocalStorage } from './Storage'
import { storeTask } from './Tasks'

let currentProject = 'Homepage'
const taskForm = addTaskForm()
const taskAddButton = document.querySelector('#task-add')
const submitButton = document.querySelector('#form-submit')

const listenForEvents = (function(){
    window.addEventListener('load', loadAllTasksOnUI)
    taskAddButton.addEventListener('click', taskAddEvent)
    document.querySelector('#project-homepage').addEventListener('click', homepageEvent)
    document.querySelector('#project-add').addEventListener('click', projectAddEvent)
    submitButton.addEventListener('click', taskForm.submit)

    function taskAddEvent(){
        taskForm.show()
    }
    
    function homepageEvent(){
    }

    function projectAddEvent(){
    }
})()




function addTaskForm(){
    const formTitle = document.querySelector('#container > h2')
    const taskAddButton = document.querySelector('#task-add')
    const formElement = document.querySelector('form')


    const methods = {
        show: function(){
            formTitle.textContent = 'All tasks : Add a new one'
            formElement.classList.remove('hidden')
            taskAddButton.classList.add('hidden')
        },
        hide: function(){
            formTitle.textContent = 'All tasks'
            formElement.classList.add('hidden')
            taskAddButton.classList.remove('hidden')
            taskForm.clear()
        },
        error: function(element){
            return element.classList.add('error')
        },        
        submit: function(event){
            event.preventDefault()
            
            const form = document.getElementById('task-add-form')
            const name = document.getElementById('task-name')                           //not using .value to reuse the element constant for class modification
            const description = document.getElementById('task-description').value
            const date = document.getElementById('task-date').value
            let priority = document.querySelector('[name="task-priority"]').value
            
            if (!name.value) return methods.error(name)
            if (!priority) priority = 'Normal'
        
            let currentTask = [name.value, description, date, priority, false]
        
            storeTask(currentProject, currentTask)
            let currentProjectIndex = project().getIndex(currentProject)
            loadUniqueTaskOnUI(currentTask)
            //tasksList[currentProjectIndex][tasksList[currentProjectIndex].length-1][0]        is new task name access
            taskForm.hide()
        },
        clear: function(){
            document.querySelectorAll('form input, form textarea')
                    .forEach(e => {
                        e.value = ''
                        e.classList.remove('error')
                    })
            document.querySelector('form select')
                    .selectedIndex = 0
        }
    }

    return methods
}

function loadUniqueTaskOnUI(task){
    const container = document.querySelector('#container-content')
    const uniqueTaskName = task[0]

    const div = document.createElement('div')
    div.addEventListener('click', () => {console.log('clicked')})
    div.classList.add('task')
    const checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox')
    const span = document.createElement('span')
    span.textContent = task[0]

    div.appendChild(checkbox)
    div.appendChild(span)
    container.appendChild(div)
}

function loadAllTasksOnUI(){
    getLocalStorage()
    let thisProjectTasks = []

    for(let i = 0; i < tasksList.length; i++){
        if(tasksList[i][0] == currentProject){
            thisProjectTasks = tasksList[i]
        }
    }
    for(let i = 1; i < thisProjectTasks.length; i++){
        loadUniqueTaskOnUI(thisProjectTasks[i])             //still issue with loading for than 2 tasks
    }

}


export {
    listenForEvents,
    taskForm
}