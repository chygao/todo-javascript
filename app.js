// select element

const date = document.getElementById("date");
const input = document.getElementById("input");
const inputBtn = document.getElementById("inputBtn");
const list = document.getElementById("list");


// select class name
const CHECK = "radio_button_checked";
const UNCHECK = "radio_button_unchecked";
const CHECK_COLOR = "done-color";
const LINE_THROUGH = "lineThrough";

let listArr = [];
let index;

let getLocalStorage = localStorage.getItem("newToDo");
if (getLocalStorage){
    listArr = JSON.parse(getLocalStorage);
} else{
    listArr = [];
}

showToDoLists();


// show local date
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const today = new Date();
date.innerHTML = today.toLocaleDateString("en-us", options);


// show todo lists

function showToDoLists() {

    let newLi = '';
    listArr.forEach((element, index)=>{

        let done = element.done ? CHECK : UNCHECK;
        let color = element.done ? CHECK_COLOR : "";
        let line = element.done ? LINE_THROUGH : "";

        newLi += `<li class="item">
                    <i class="material-icons ckeck-icon ${color}" onclick="completeTodo(event)">${done}</i> 
                    <p class="text ${line}">${element.name}<p>                       
                    <i class="material-icons clear-icon" onclick="deleteTodo(${index})">clear</i>                 
                </li>`
    });
    list.innerHTML = newLi;
}



input.addEventListener('keyup', (e)=>{
    let todo = input.value.trim();

    if (todo){
        inputBtn.classList.add("active");
    }
    if ((e.key === "Enter") && todo){

        listArr.push({
            name: todo,
            done: false
        });
        localStorage.setItem("newToDo", JSON.stringify(listArr));
        showToDoLists();
        input.value = "";
        inputBtn.classList.remove("active");
    }
});


inputBtn.addEventListener("click", ()=>{
    let todo = input.value.trim();


    if (todo) {
        listArr.push({
            name: todo,
            done: false
        });
        localStorage.setItem("ToDo", JSON.stringify(listArr));
        showToDoLists();
        input.value = "";
        inputBtn.classList.remove("active");
    }
});

// remove a todo

function deleteTodo(index){


    listArr.splice(index,1);
    localStorage.setItem("newToDo", JSON.stringify(listArr));
    showToDoLists();
}


function completeTodo(event){

    const element = event.target;
    if (element.innerHTML === CHECK){
        element.innerHTML = UNCHECK;
    } else {
        element.innerHTML = CHECK;
    }

    element.classList.toggle(CHECK_COLOR);

    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

}


function clearAll(){
    listArr = [];
    localStorage.setItem("newToDo", JSON.stringify(listArr));
    showToDoLists();
};











