import './Storage'
import { tasksList, setLocalStorage } from './Storage'

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


export {storeTask}