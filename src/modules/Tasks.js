import './Storage'
import { tasksList, setLocalStorage } from './Storage'
import { currentProject, expandTaskContent, retractAllTasks } from './UI'

function storeTask(project, task){
    const addToArray = (function(){
        for(let i = 0; i < tasksList.length; i++){
            if(tasksList[i][0] === project){
                tasksList[i].push(task)
            }
        }
        setLocalStorage()
    })()
}

function showTaskContent(event){
    if(event.target !== event.currentTarget && event.target.classList.contains('task-name') === false){
        return
    }
    let taskContainer = event.currentTarget
    let taskName = taskContainer.querySelector('span').textContent
    console.log(taskName)
    let thisProjectTasks = getCurrentProjectTasks()
    let thisTaskObject
    for(let i = 1; i < thisProjectTasks.length; i++){
        if(thisProjectTasks[i][0] == taskName){
            thisTaskObject = thisProjectTasks[i]
        }
    }
    retractAllTasks(event)
    expandTaskContent(event)
}

function getCurrentProjectTasks(){
    for(let i = 0; i < tasksList.length; i++){
        if(tasksList[i][0] == currentProject){
            return tasksList[i]
        }
    }
}

function toggleTaskStatus(event){
    event.stopPropagation()
    console.log('checkbox clicked')
    event.target.previousSibling.classList.toggle('checked')
    let currentTask = event.target.parentElement.children[2];
    if(event.target.previousSibling.classList.contains('checked')){
        currentTask.style.textDecoration = 'line-through'
    } else{
        currentTask.style.textDecoration = 'none'
    }
}

function removeTask(event){
    let currentTaskName = event.target.parentElement.children[2].textContent;
    for(let i = 0; i < tasksList.length; i++){
        if(tasksList[i][0] === currentProject){
            for(let j = 1; j < tasksList[i].length; j++){
                if(tasksList[i][j][0] === currentTaskName){
                    tasksList[i].splice(j, 1)               //remove from tasksList array
                    setLocalStorage()                       //update localStorage
                    event.target.parentElement.remove()     //remove from UI
                    console.log(tasksList)
                }
            }
        }
    }
    // look for task in tasksList
}


export {storeTask, showTaskContent, getCurrentProjectTasks, toggleTaskStatus, removeTask}