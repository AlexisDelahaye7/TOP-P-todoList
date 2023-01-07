import Task from "./Task"
import { storeTask, retrieveTasks } from "./Task"
import tasksList from "./Storage"



let currentProject = 'All Tasks'

const loadTasksOnUI = function(){
    const container = document.querySelector('#container-content')
    let projectTasksList = retrieveTasks(currentProject)

    for(let i = 1; i <= projectTasksList.length; i++){
        const div = document.createElement('div')
        div.classList.add('task')
        const checkbox = document.createElement('input')
        checkbox.setAttribute('type', 'checkbox')
        const span = document.createElement('span')
        span.textContent = projectTasksList[i][0]

        div.appendChild(checkbox)
        div.appendChild(span)
        container.appendChild(div)
        console.log(projectTasksList[i])
    }
}

const appendTask = function(){
    
}

window.addEventListener('load', loadTasksOnUI)

const listenForEvents = (function(){
    document.querySelector('#tasks-add').addEventListener('click', taskAddEvent)
    document.querySelector('#tasks-all').addEventListener('click', taskAllEvent)
    document.querySelector('#tasks-today').addEventListener('click', taskTodayEvent)
    document.querySelector('#tasks-week').addEventListener('click', taskWeekEvent)
    document.querySelector('#project-add').addEventListener('click', projectAddEvent)

    function taskAddEvent(){
        taskForm.show()
    }
    
    function taskAllEvent(){
    }

    function taskTodayEvent(){
    }

    function taskWeekEvent(){
    }

    function projectAddEvent(){
    }
})()

const addTaskForm = function() {
    const formTitle = document.querySelector('#container > h2')
    const taskAddButton = document.querySelector('#tasks-add')

    const methods = {
        show: function(){
            formTitle.textContent = 'All tasks : Add a new one'
            
            taskAddButton.setAttribute('class', 'hidden')
            
            const taskAddForm = document.createElement('form')
            taskAddForm.setAttribute('id', 'task-add-form')
            taskAddButton.after(taskAddForm)
            
            const inputName = document.createElement('input')
            inputName.setAttribute('type', 'text')
            inputName.setAttribute('id', 'task-name')
            inputName.setAttribute('placeholder', 'Your new task...')
            taskAddForm.appendChild(inputName)
            
            const textareaDescription = document.createElement('textarea')
            textareaDescription.setAttribute('id', 'task-description')
            textareaDescription.setAttribute('placeholder', 'Description...')
            taskAddForm.appendChild(textareaDescription)
            
            const inputDate = document.createElement('input')
            inputDate.setAttribute('type', 'date')
            inputDate.setAttribute('id', 'task-date')
            taskAddForm.appendChild(inputDate)
            
            const selectPriority = document.createElement('select')
            selectPriority.setAttribute('name', 'task-priority')
            
            const optionHead = document.createElement('option')
            optionHead.setAttribute('value', '')
            optionHead.setAttribute('disabled', '')
            optionHead.setAttribute('selected', '')
            optionHead.textContent = '-- Priority --'
            
            const optionLow = document.createElement('option')
            optionLow.setAttribute('value', 'Low')
            optionLow.textContent = 'Low'
            
            const optionNormal = document.createElement('option')
            optionNormal.setAttribute('value', 'Normal')
            optionNormal.textContent = 'Normal'
            
            const optionHigh = document.createElement('option')
            optionHigh.setAttribute('value', 'High')
            optionHigh.textContent = 'High'
            
            taskAddForm.appendChild(selectPriority)
            selectPriority.appendChild(optionHead)
            selectPriority.appendChild(optionLow)
            selectPriority.appendChild(optionNormal)
            selectPriority.appendChild(optionHigh)
            
            const submitButton = document.createElement('button')
            submitButton.textContent = 'Create new task'
            submitButton.setAttribute('id', 'task-submit')
            submitButton.addEventListener('click', submit)
            taskAddForm.appendChild(submitButton)
        },
        hide: function(){
            formTitle.textContent = 'All tasks'
            taskAddButton.removeAttribute('class', 'hidden')
            const taskAddForm = document.querySelector('form')
            taskAddForm.remove()
        },
        error: function(element){                           //export error to an external module ?
            return element.classList.add('error')
        }
    }
    
    const submit = function(event){

        event.preventDefault();
        const form = document.getElementById('task-add-form')
        const name = document.getElementById('task-name')                           //not using .value to reuse the element constant for class modification
        const description = document.getElementById('task-description').value
        const date = document.getElementById('task-date').value
        let priority = document.querySelector('[name="task-priority"]').value
        
        if (!name.value) return methods.error(name)
        if (!priority) priority = 'Normal'
        
        let currentTask = new Task(name.value, description, date, priority, false)
        let currentProject = "All Tasks"                                           //hard coding here for now. Later, we'll use the var depending on the current openned project
        
        storeTask(currentProject, currentTask)
        methods.hide()
    }

    return methods
}

const taskForm = addTaskForm()

export default {taskForm, listenForEvents}