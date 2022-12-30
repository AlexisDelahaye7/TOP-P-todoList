const listenForEvents = function(){
    document.querySelector('#tasks-add').addEventListener('click', taskAddEvent)
    document.querySelector('#tasks-all').addEventListener('click', taskAllEvent)
    document.querySelector('#tasks-today').addEventListener('click', taskTodayEvent)
    document.querySelector('#tasks-week').addEventListener('click', taskWeekEvent)
    document.querySelector('#project-add').addEventListener('click', projectAddEvent)

    function taskAddEvent(){
        console.log('event fired : task add')
        toggleAddTaskForm('hidden')
    }
    
    function taskAllEvent(){
        console.log('event fired : task all');
    }

    function taskTodayEvent(){
        console.log('event fired : task today')
    }

    function taskWeekEvent(){
        console.log('event fired : task week')
    }

    function projectAddEvent(){
        console.log('event fired : project add')
    }
}

const toggleAddTaskForm = function(status){
    const taskAddButton = document.querySelector('#tasks-add')
    taskAddButton.setAttribute('class', status)

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
    submitButton.addEventListener('click', submitForm)
    taskAddForm.appendChild(submitButton)
}

function submitForm(event){
    event.preventDefault();
    console.log(event.target.parentNode)
}

export default listenForEvents