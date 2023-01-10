let tasksList = [
    [
        'Homepage',
        ['Task One homepage', 'description', 'date', 'priority', 'status'],
        ['Task Two homepage', 'description', 'date', 'priority', 'status'],
        ['Task Three homepage', 'description', 'date', 'priority', 'status']
    ],
    [
        'Custom project',
        ['Task One custom', 'description', 'date', 'priority', 'status'],
        ['Task Two custom', 'description', 'date', 'priority', 'status']
    ],
]

function setLocalStorage(){
    return window.localStorage.setItem('tasks', JSON.stringify(tasksList))
}

function getLocalStorage(){
    if(JSON.parse(window.localStorage.getItem('tasks')) == null){
        setLocalStorage
    } else {
        tasksList = JSON.parse(window.localStorage.getItem('tasks'))
    }
}

export {tasksList, setLocalStorage, getLocalStorage}