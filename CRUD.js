const taskForm = document.getElementById("addbtn");
const form = document.getElementById("taskform");
const modal = document.getElementById("addtaskmodal");


let tareas = []

const getValues = (taskForm) => {    
    let newTask = document.querySelector("#task-text").value;
    let newName = document.querySelector("#recipient-name").value;
    let task = {
        Nombre: newName,
        Tarea: newTask,
    }
    tareas.push(task)      
    console.log(tareas)
    form.reset()          
}

const saveTasks = () => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

taskForm.addEventListener("click", (save) => {
    getValues() 
    $("#addtaskmodal").modal("hide");
    saveTasks()
})

document.addEventListener("DOMContentLoaded", (printTasks) => {

})






/* const addTask = (tarea, aName) => {
  let task = {
    Tarea: tarea,
    Nombre: aName
  }  
    tareas.push(task);
}*/

/* taskForm.addEventListener("#addbtn", (newTaskBtn) => {
    newTaskBtn.preventdefault();    
    let newTask = document.querySelector("#task-text").value;
    let newName = document.querySelector("#recipient-name").value;   
    
    const saveTask = {
        Tarea: `${newTask}`,
        Nombre: `${newName}`
    }
    
    taskForm.reset()

    console.log(saveTask)  
})
*/
