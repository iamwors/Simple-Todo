const TodoMessage = document.getElementById("todo-message");
const create_btn = document.getElementById("create-btn");
const TodoList = document.querySelector("ul.todo-list");
const theme_btn = document.getElementById("theme-btn");

// todo item
class Todo {
  constructor(message) {
    this.todo = document.createElement("li");
    this.complete = document.createElement("input");
    this.message = document.createElement("p");
    this.delete_btn = document.createElement("input");
    this.date = document.createElement("span");

    this.initialize();
    this.add_message(message);
    this.finalize();
    this.store_todo();
  }
  initialize() {
    // todo
    this.todo.setAttribute("class", "todo");
    // complete
    this.complete.setAttribute("type", "checkbox");
    this.complete.setAttribute("name", "complete");
    this.complete.setAttribute("id", "complete");
    this.complete.oninput = (e) => {
      let id = parseInt(e.target.parentElement.dataset['id'])
      let getTask = JSON.parse(localStorage.getItem(id))
      getTask.complete = e.target.checked
      saveToLocalStorage(id,getTask)
    }
    // message
    this.message.setAttribute("class", "message");
    this.message.setAttribute("contenteditable","true")
    // delete
    this.delete_btn.setAttribute("type", "button");
    this.delete_btn.setAttribute("id", "delete");
    this.delete_btn.onclick = (e) => {
      let todo = e.target.parentElement
      let id = parseInt(todo.dataset['id'])
      localStorage.removeItem(id)
      todo.remove();
    };
    //edit todo
    this.message.oninput = (e)=>{
      let id = parseInt(e.target.parentElement.dataset['id'])
      let getTask = JSON.parse(localStorage.getItem(id))
      getTask.message = e.target.innerText
      saveToLocalStorage(id,getTask)
    }
    // date
    this.date.setAttribute("class", "date");
  }
  add_message(message) {
    this.message.innerText = message;
    this.date.innerText = new Date().toLocaleString();
  }
  finalize() {
    this.todo.append(this.complete);
    this.todo.append(this.message);
    this.todo.append(this.delete_btn);
    this.todo.append(this.date);
  }
  store_todo() {
    let id = parseInt(Math.random() * 10000);
    while (true) {
      if (localStorage.getItem(id) == null) {
        break;
      }
      id = parseInt(Math.random() * 10000);
    }
    this.todo.setAttribute("data-id", id);
    TodoList.append(this.todo);
    let task = {
      "complete": this.complete.checked,
      "message": this.message.innerText,
      "date": this.date.innerText,
    }
    saveToLocalStorage(id,task)
  }
}


// update funtions
function createTodo() {
  if (TodoMessage.value == "") {
    return;
  }
  new Todo(TodoMessage.value);
  TodoMessage.value = "";
}

function saveToLocalStorage(key,value){
  localStorage.setItem(key,JSON.stringify(value))
}

function toggleTheme() {
  let body = document.body
  body.classList.toggle("dark-theme");
  if (body.classList.contains('dark-theme')) {
    theme_btn.setAttribute('src',"./icon/light.png");
  }
	else{
    theme_btn.setAttribute('src',"./icon/dark.png");
  }
}

// event
create_btn.onclick = createTodo;
theme_btn.onclick = toggleTheme;
window.onkeydown = (e) => {
  if (e.key == "Enter") {
    createTodo();
    TodoMessage.value = "";
  }
};
