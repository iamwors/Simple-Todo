const TodoMessage = document.getElementById("todo-message")
const create_btn = document.getElementById("create-btn")
const TodoList = document.querySelector("ul.todo-list")

// todo item
class Todo{
    constructor(message){
        this.todo = document.createElement("li")
        this.complete = document.createElement("input")
        this.message = document.createElement("p")
        this.delete_btn = document.createElement("input")
        this.date = document.createElement("span")

        this.initialize()
        this.add_message(message)
        this.finalize()
        this.store_todo()
    }
    initialize(){
        // todo
        this.todo.setAttribute("class","todo")
        // complete
        this.complete.setAttribute("type","checkbox")
        this.complete.setAttribute("name","complete")
        this.complete.setAttribute("id","complete")
        // message
        this.message.setAttribute("class","message")
        
        // delete
        this.delete_btn.setAttribute("type","button")
        this.delete_btn.setAttribute("id","delete")
        this.delete_btn.setAttribute("value","x")
        this.delete_btn.onclick = (e)=>{
            let todo = e.target.parentElement
            let id = todo.dataset["id"]
            delete Todos[id]
            todo.remove()
        }
        // date
        this.date.setAttribute("class","date")

    }
    add_message(message){
        this.message.innerText = message
        this.date.innerText = new Date().toLocaleString()
    }
    finalize() {
        this.todo.append(this.complete)
        this.todo.append(this.message)
        this.todo.append(this.delete_btn)
        this.todo.append(this.date)
    }
    store_todo(){
        let id = parseInt(Math.random() * 10000)
        while (true){
            if (Todos[id]==undefined){
                break
            }
            id = parseInt(Math.random() * 10000)
        }
        this.todo.setAttribute("data-id",id)
        TodoList.append(this.todo)
        Todos[id] = {
            "complete":this.complete,
            "message":this.message,
            "date":this.date
        }
    }
}


const Todos = {}

// update funtions
function createTodo(){
    if (TodoMessage.value == ''){
        return
    }
    new Todo(TodoMessage.value)
    TodoMessage.value = ''
}



// event
create_btn.onclick = createTodo
window.onkeydown = (e)=>{
    if (e.key == 'Enter'){
        createTodo()
        TodoMessage.value = ''
    }
}