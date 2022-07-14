const taskForm = document.getElementById("addbtn");
const form = document.getElementById("taskform");
const modal = document.getElementById("addtaskmodal");
const list = document.getElementById("tasklist");
const editBtn = document.getElementById("editbtn");


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
            <div class="ms-2 me-auto listin">
              <div class="fw-bold">${element.Nombre}</div>
              <div>${element.Tarea}</div>
            </div>            
            <button class="edittask" btn-primary data-bs-toggle="modal" data-bs-target="#addtaskmodal"><svg class="editsvg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
          </svg>Editar</button>
            <div></div>
            <button class="deletetask btn-primary"><svg class="deletesvg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg>Eliminar</button>          
          </li>`
        });
    }
}

document.addEventListener("DOMContentLoaded", printTasks) 

list.addEventListener("click", (actionbtns) => {
    actionbtns.preventDefault();  
    let lsTask = actionbtns.path[1].childNodes[1].childNodes[3].innerHTML;        
    if(actionbtns.target.innerText === "Eliminar") {
      deleteTask(lsTask)
    }
    if(actionbtns.target.innerText === "Editar") {
      editTask(lsTask)
    }
    
});



