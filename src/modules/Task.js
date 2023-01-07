import tasksList from './Storage'
import addTaskForm from './UI'

const storeTask = function(projectString, taskObject){
    const addToArray = (function(){
        const taskArray = Object.values(taskObject)

        for(let i = 0; i < tasksList.length; i++){
            if(tasksList[i][0] == projectString){
                tasksList[i].push(taskArray)
                console.log(tasksList)
            }
        }
        window.localStorage.setItem('tasks', JSON.stringify(tasksList))     //will have to move this to storage.js
    })()
}

const retrieveTasks = function(project){
    let tmpTasksArray = JSON.parse(window.localStorage.getItem('tasks'))     //will have to move this to storage.js
    for(let i = 0; i < tmpTasksArray.length; i++){
        if(tmpTasksArray[i][0] == project){
            return tmpTasksArray[i]
        }
    }
}

export default class Task{
    constructor(name, description, dueDate, priority, status){
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.status = status;
    }

    setName(name){
        this.name = name;
    }
    getName(){
        return this.name;
    }

    setDescription(description){
        this.description = description;
    }
    getDescription(){
        return this.description;
    }

    setDate(dueDate){
        this.date = dueDate;
    }
    getDate(){
        return this.dueDate;
    }

    setPriority(priority){
        this.priority = priority;
    }
    getPriority(){
        return this.priority;
    }

    setStatus(status){
        this.status = status;
    }
    getStatus(){
        return this.status;
    }
}

export {
    storeTask,
    retrieveTasks
}