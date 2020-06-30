//DOM~
let todoList = JSON.parse(localStorage.getItem('mytodo'))  || [];
const todoContainer = document.querySelector('.todo-list');


class todo{
    //Add To Do
    static addTodo(value){
        let data = {value,id:makeID(7)};
todoList = [...todoList,data];
localStorage.setItem("mytodo",JSON.stringify(todoList))
document.querySelector('.todo-list').insertAdjacentHTML("beforeend",`
<li data-id=${data.id}>
                                        <div class="form-check"> <label class="form-check-label"> <input class="checkbox" type="checkbox"> ${data.value} <i class="input-helper"></i></label> </div> <i class="remove mdi mdi-close-circle-outline" data-id=${data.id}></i>
</li>`)
    }

//Delete Todo
    static deleteTodo(id,index){
let item = todoList.findIndex(i => i.id === id);
let deleteList = Array.from(document.querySelectorAll('.todo-list li'));

//Delete From Todo Array
todoList.splice(index,1)
localStorage.setItem("mytodo",JSON.stringify(todoList))
//Delete From UI List
let x = deleteList.find(i =>{
    return i.dataset.id === id
})
x.remove();

    }

}

//Func For Deleting
todoContainer.addEventListener('click',(e)=>{
    if(e.target.classList.contains('remove')){
        let id = e.target.dataset.id
        let index = todoList.findIndex(i => i.id === id);
        todo.deleteTodo(id,index);


    }
})

//Func For Getting Input So The Events can Use Them
function getInput(){
    let value = document.querySelector('.todo-list-input').value;
    todo.addTodo(value);
    


    //Clear The Text Field
    document.querySelector('.todo-list-input').value = "";
}

//Create ID For Each Todo
function makeID(leng){
    let result = '';
    let chact = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()_+?`;
    
    for(i=0;i < leng;i++){
    result += chact.charAt(Math.floor(Math.random() * chact.length))
    }
    return result
    } 


//Add Event
document.querySelector('.add').addEventListener('click',()=>{
    getInput();
    
})

//If Hit Enter
document.addEventListener("keyup",(e)=>{
    if(e.keyCode === 13){
        getInput();
    }
})

document.addEventListener('DOMContentLoaded',init)

//Initial Setup
function init(){
//Call The Constructor
    new todo();



    todoList.forEach(element => {
        document.querySelector('.todo-list').insertAdjacentHTML("beforeend",`
        <li data-id=${element.id}>
                                                <div class="form-check"> <label class="form-check-label"> <input class="checkbox" type="checkbox"> ${element.value} <i class="input-helper"></i></label> </div> <i class="remove mdi mdi-close-circle-outline" data-id=${element.id}></i>
        </li>`)    
    });

   
}
