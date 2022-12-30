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