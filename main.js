let input = document.querySelector(".input-field");
let addBtn = document.querySelector(".add-btn");
let todos = document.querySelector(".todos");
let defaultText = document.querySelector(".default-text")

let todosList = [];

// Check if there are todos in local storage
if(localStorage.getItem("todosList")){
    todosList = JSON.parse(localStorage.getItem("todosList"));
    render();
} else {
    // Add default todo item only if local storage is empty
    todosList.push({ todo: "Add Todo", id: 1, complete: false});
    saveToLocalStorage(); // Save the default todo to local storage
    render();
}

addBtn.addEventListener("click", handleTodos);

function handleTodos() {
    if (input.value) {
        let value = input.value;
        let newTodo = { todo: value, id: todosList.length + 1, complete: false };
        todosList.push(newTodo);
        saveToLocalStorage();
        render();
        input.value = "";
    }
}

function handleDelete(id) {
    todosList = todosList.filter((arr) => arr.id !== id);
    saveToLocalStorage();
    render();
}

function handleComplete(id) {
    // Find the index of the item with the given ID
    const index = todosList.findIndex(item => item.id === id);
    if (index !== -1) {
        // Update the 'complete' property of the found item
        todosList[index].complete = !todosList[index].complete;
        saveToLocalStorage();
        render();
    }
}

function saveToLocalStorage(){
    localStorage.setItem("todosList", JSON.stringify(todosList));
}

function render() {
    todos.innerHTML = "";
    if(todosList){
        todosList.forEach((item) => {
            console.log(item);
            let todoText = document.createElement("p");
            let deleteBtn = document.createElement("button");
            let completeBtn = document.createElement("button");
            deleteBtn.classList.add("delete");
            completeBtn.classList.add("complete");
            todoText.classList.add("todo");
            let div = document.createElement("div");
            div.classList.add("flex");
            div.appendChild(completeBtn);
            completeBtn.innerHTML = "&#10003;";
            completeBtn.setAttribute("id", item.id);
            todoText.textContent = item.todo;
            todoText.setAttribute("id", item.id);
            div.appendChild(todoText);
            div.appendChild(deleteBtn);
            deleteBtn.innerHTML = "&#128465;";
            deleteBtn.setAttribute("id", item.id);
            if(item.complete){
                todoText.classList.add("checked")
                completeBtn.style.backgroundColor = "#FA7070";
                completeBtn.style.color = "white";
            }
            deleteBtn.addEventListener("click", () => handleDelete(item.id));
            completeBtn.addEventListener("click", ()=> handleComplete(item.id))
            todos.appendChild(div);
        });
    }
}
