import { project } from './Project'
import { tasksList, getLocalStorage, setLocalStorage } from './Storage'
import { storeTask, showTaskContent, getCurrentProjectTasks, toggleTaskStatus, removeTask } from './Tasks'

let currentProject = 'Homepage'
const taskForm = addTaskForm()
const taskAddButton = document.querySelector('#task-add')
const submitButton = document.querySelector('#form-submit')

const listenForEvents = (function(){
    window.addEventListener('load', loadAllTasksOnUI)
    taskAddButton.addEventListener('click', taskForm.show)
    document.querySelector('#project-homepage').addEventListener('click', homepageEvent)
    document.querySelector('#project-add').addEventListener('click', projectAddEvent)
    submitButton.addEventListener('click', taskForm.submit)
    document.querySelector('#task-add-form > .cancel').addEventListener('click', taskForm.hide)
    
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
    div.addEventListener('click', showTaskContent, {useCapture: true})
    div.classList.add('task')

    const checkboxStyle = document.createElement('div')
    checkboxStyle.classList.add('checkbox-style')
    
    const checkbox = document.createElement('input')
    checkbox.addEventListener('change', toggleTaskStatus)      //todo later
    checkbox.setAttribute('type', 'checkbox')
    const span = document.createElement('span')
    span.classList.add('task-name')
    span.textContent = task[0]
    const deleteIcon = document.createElement('span')
    deleteIcon.addEventListener('click', removeTask)
    deleteIcon.classList.add('material-symbols-outlined')
    deleteIcon.classList.add('delete')
    deleteIcon.textContent = 'delete'

    div.appendChild(checkboxStyle)
    div.appendChild(checkbox)
    div.appendChild(span)
    div.appendChild(deleteIcon)
    container.appendChild(div)
}

function loadAllTasksOnUI(){
    getLocalStorage()
    let thisProjectTasks = getCurrentProjectTasks()

    for(let i = 1; i < thisProjectTasks.length; i++){
        loadUniqueTaskOnUI(thisProjectTasks[i])
    }

}

function expandTaskContent(event){
    event.currentTarget.classList.toggle('opened')
}

function retractAllTasks(event){
    document.querySelectorAll('.task')
            .forEach(removeOpenedClass)
    function removeOpenedClass(element){
        if(element == event.currentTarget){
            return
        }
        element.classList.remove('opened')
    }
}


export {
    listenForEvents,
    taskForm,
    currentProject,
    expandTaskContent,
    retractAllTasks
}