const TodoMessage = document.getElementById("todo-message")
const create_btn = document.getElementById("create-btn")
const TodoList = document.querySelector("ul.todo-list")

// todo item
class Todo{
    constructor(message){
        this.todo = document.createElement("li")
        this.complete = document.createElement("input")
        this.message = document.createElement("p")
        this.action = document.createElement("div")
        this.edit_btn = document.createElement("input")
        this.delete_btn = document.createElement("input")

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
        // action
        this.action.setAttribute("class","action")
        // --------------buttons-------------
        // edit
        this.edit_btn.setAttribute("type","button")
        this.edit_btn.setAttribute("id","edit")
        this.edit_btn.setAttribute("value","edit")
        // delte
        this.delete_btn.setAttribute("type","button")
        this.delete_btn.setAttribute("id","delete")
        this.delete_btn.setAttribute("value","delete")

    }
    add_message(message){
        this.message.innerText = message
    }
    finalize() {
        this.action.append(this.edit_btn)
        this.action.append(this.delete_btn)
        this.todo.append(this.complete)
        this.todo.append(this.message)
        this.todo.append(this.action)
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
        Todos[id] = this
    }
}


const Todos = {}


// event
create_btn.onclick = ()=>{
    if (TodoMessage.value == ''){
        return
    }
    new Todo(TodoMessage.value)
}