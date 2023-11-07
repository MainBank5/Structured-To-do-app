const form = document.querySelector("[data-form]");
const lists = document.querySelector(".lists");
const input = document.querySelector(".input");
const listDo = document.querySelector(".todo");

//local storage
class Storage {
    
    static addToStorage(items){
        let storage = localStorage.setItem("todoStore", JSON.stringify(items) );
        console.log(storage)
        return storage;

    }

     static getFromStorage(){
        let storage = localStorage.getItem("todoStore") === null ? [] : JSON.parse(localStorage.getItem("todoStore"));
        return storage;
    }
    
}



let todoArr = Storage.getFromStorage();



form.addEventListener("submit", (e)=>{
    e.preventDefault();

    let id = Math.floor(Math.random() * 10);
    const todo = new Todo(id, input.value)

    console.log(id, todo)
    todoArr.push(todo)
    console.log(todoArr);

    listDo.innerHTML = '';// Clear existing content in listDo

    UI.displayData();
    UI.removeInput();

    //delete from the DOM
    UI.deleteItem();

    //add items to local storage
    Storage.addToStorage(todoArr)
})

//make a class constructor

class Todo {
    constructor(id, todo) {
        this.id = id;
        this.todo = todo;
    }
}

class UI {
    static displayData(){ //this functions displays our input in the DOM
        let data = todoArr.map((item) => {
             listDo.insertAdjacentHTML("beforeend", `<li> ${item.todo} <span class="remove" data-id=${item.id}>🗑️</span> </li>` )
        })
    }

    static removeInput() { //this functions clears the text in the input box once the input is submited
        input.value = "";
    }
    
    static deleteItem(){
        listDo.addEventListener('click', (e) => { 
            //console.log(e.target)
            if(e.target.classList.contains("remove")){
                
                e.target.parentElement.remove();
            }

            let btnId = e.target.dataset.id;
            //remove from array
            UI.removeArrayTodo(btnId)
        })
    }

    static removeArrayTodo(id){
        todoArr = todoArr.filter((item) => {
            return item.id !== parseInt(id);
        })
    }
}


window.addEventListener("DOMContentLoaded", ()=>{
    UI.displayData();
})


