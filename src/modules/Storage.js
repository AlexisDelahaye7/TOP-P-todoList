const tasksList = [
    [
        'Homepage',
        ['Task One homepage', 'description', 'date', 'priority', 'status'],
        ['Task Two homepage', 'description', 'date', 'priority', 'status']
    ],
    [
        'Custom project',
        ['Task One custom', 'description', 'date', 'priority', 'status'],
        ['Task Two custom', 'description', 'date', 'priority', 'status']
    ],
]

function setLocalStorage(){
    window.localStorage.setItem('tasks', JSON.stringify(tasksList))
}

function getLocalStorage(){
    return JSON.parse(window.localStorage.getItem('tasks'))
}


export {tasksList, setLocalStorage, getLocalStorage}