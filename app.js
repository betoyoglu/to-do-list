const input = document.querySelector(".form-control");
const form = document.forms[0];
const search = document.querySelectorAll(".form-control")[1];
const todoList = document.querySelector(".list-group");
const deleteAll = document.querySelector(".btn-danger");

const toDoList = [];

window.addEventListener("load", localToDo)
form.addEventListener("submit", addToDo);
search.addEventListener("keydown",searchInput);
todoList.addEventListener("click",deleteLi);
deleteAll.addEventListener("click",deleteAllToDo);

function addToDo(e) {
    const inputString = input.value;

    const li = document.createElement("li");
    li.className = "list-group-item";
    li.innerHTML = inputString;
    const a = document.createElement("a");
    a.className = "delete";
    a.setAttribute("href","#");
    const i = document.createElement("i");
    i.className = "bi bi-x-circle";
    i.style.color = "red";
    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    toDoList.push(inputString);
    localStorage.setItem("todolist", JSON.stringify(toDoList));

    e.preventDefault();
}
function localToDo(){
    var local = JSON.parse(localStorage.getItem("todolist"));
    for (let index = 0; index < local.length; index++) {
        toDoList.push(local[index]);
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.innerHTML = local[index];
        const a = document.createElement("a");
        a.className = "delete";
        a.setAttribute("href","#");
        const i = document.createElement("i");
        i.className = "bi bi-x-circle";
        i.style.color = "red";
        a.appendChild(i);      
        li.appendChild(a);
        todoList.appendChild(li); 
    }
}
function searchInput(e){
    const searchString = e.target.value.toLowerCase().trim();
    const li = document.querySelectorAll(".list-group-item");
    for (let i = 0; i < li.length; i++) {
        if(li[i].innerHTML.toLowerCase().trim().includes(searchString) == false && e.target.value != null){
            li[i].style.display = "none";
        }
        else{
            li[i].style.display = "flex";
        }
        if(e.target.value == null){
            li[i].style.display = "flex";
        }

    }
}
function deleteLi(e){
    if(e.target.className === "bi bi-x-circle"){
        const todo = e.target.parentElement.parentElement.innerText;
        toDoList.splice(toDoList.indexOf(todo),1);
        console.log(toDoList);

        localStorage.clear();
        localStorage.setItem("todolist", JSON.stringify(toDoList));


        e.target.parentElement.parentElement.remove();
        
        e.preventDefault();
    }
    
}
function deleteAllToDo(e){
    toDoList.splice(0,toDoList.length);
    localStorage.clear();
    localStorage.setItem("todolist", JSON.stringify(toDoList));
    const li = document.querySelectorAll(".list-group-item");
    for (let i = 0; i < li.length; i++) {
        li[i].remove();
        
    }
}
