const taskForm = document.getElementById("addbtn");
const form = document.getElementById("taskform");
const modal = document.getElementById("addtaskmodal");
const list = document.getElementById("tasklist");
const editBtn = document.getElementById("editbtn");
const trigger = document.getElementById("modaltrigger")

let tareas = []

const getValues = (taskForm) => {    
    let newTask = document.querySelector("#task-text").value;
    let newName = document.querySelector("#recipient-name").value;
    let task = {
        Nombre: newName,
        Tarea: newTask,
    }
    tareas.push(task)    
    form.reset()          
}

const saveTasks = () => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

const deleteTask = (nTask) => {
   let arrIndex; 

   tareas.forEach((element, index) => {
       
       if(element.Tarea === nTask) {
        arrIndex = index;        
    }
    
   });

   tareas.splice(arrIndex,1)
   saveTasks()
   printTasks()
}   

taskForm.addEventListener("click", (save) => {
    save.preventDefault()
    getValues()     
    saveTasks()
    printTasks()
})

const editTask = (nTask) => {
        tareas.forEach((element, index) => {
        if(element.Tarea === nTask) {
            arrIndex = index;           
            document.getElementById("task-text").value = element.Tarea;
            document.getElementById("recipient-name").value = element.Nombre;             
        }       
        
    });    
   
}

editBtn.addEventListener("click", (edit) => {
    edit.preventDefault()  
    let editedObj = {
        Nombre: document.getElementById("recipient-name").value,
        Tarea: document.getElementById("task-text").value,
    }       
    tareas.splice(arrIndex,1,editedObj)
    saveTasks()
    printTasks()
    form.reset()
});



const printTasks = () => {
    list.innerHTML = "" ;
    tareas = JSON.parse(localStorage.getItem("tareas")); 
    if (tareas === null) {
        tareas = [];
    }else{
        tareas.forEach(element => {
            list.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
              <div class="fw-bold">${element.Tarea}</div>
              ${element.Nombre}
            </div>
            <button class="edittask" btn-primary data-bs-toggle="modal" data-bs-target="#addtaskmodal">Editar</button>
            <button class="deletetask btn-primary">Eliminar</button>
          </li>`
        });
    }
}

document.addEventListener("DOMContentLoaded", printTasks) 

list.addEventListener("click", (actionbtns) => {
    actionbtns.preventDefault();  
      
    if(actionbtns.target.innerHTML === "Eliminar" || actionbtns.target.innerHTML === "Editar") {        
        let lsTask = actionbtns.path[1].childNodes[1].childNodes[1].innerHTML;                         //hay un solo parametro
        if (actionbtns.target.innerHTML === "Eliminar") {
            deleteTask(lsTask);
        }
        if (actionbtns.target.innerHTML === "Editar") {
            editTask(lsTask);
        } 
    }
});

trigger.addEventListener ("click", (modal) => {
    if(modal.target.innerHTML == "Agregar") {
        body.innerHTML `<div class="modal fade" id="addtaskmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Nueva Ta</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
              <form id="taskform">
                <div class="mb-3">
                  <label for="recipient-name" class="col-form-label">Encargado:</label>
                  <input type="text" class="form-control" id="recipient-name">
                </div>
                <div class="mb-3">
                  <label for="message-text" class="col-form-label">Tarea:</label>
                  <textarea class="form-control" id="task-text"></textarea>
                </div>
              </form>
              </div>
                <div class="modal-footer" id="send">
                  <button type="button" class="btn btn-secondary" id="editbtn" data-bs-dismiss="modal">Editar</button>
                  <button type="submit" class="btn btn-primary" id="addbtn" data-bs-dismiss="modal">Agregar</button>
              </div>
          </div>
        </div>             
      </div>`
    }
})

