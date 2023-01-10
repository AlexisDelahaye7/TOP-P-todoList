import { tasksList } from "./Storage"


function project(){
    const methods = {
        getIndex: function(project){
            for(let i = 0; i < tasksList.length; i++){
                if(tasksList[i][0] === project){
                    return i
                }
            }
        }
    }
    return methods
}


export {project}