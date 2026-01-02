const taskText = document.querySelector(".todo-input")
const add = document.querySelector(".add")
const list = document.querySelector(".task-list")

//progress bar
const progressText = document.querySelector(".progress-text");
const bar = document.querySelector(".progress-fill");
function progress() {
    let completed = 0;
    let total = todos.length;

    for (let task of todos) {
        if (task.completed) {
            completed++;
        }
    }
    progressText.textContent = `${completed} of ${total} tasks completed`;
    let percent = (completed / total) * 100;
    bar.style.width = `${percent}%`
}


const saved = localStorage.getItem("todos");
const todos = saved ? JSON.parse(saved) : [];

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}
function createTodoNode(todo, index) {
    const li = document.createElement("li")
    const textSpan = document.createElement("span")
    const checkbox = document.createElement("input")
    const label = document.createElement("label")
    li.className = "task"
    textSpan.className = "task-text"

    checkbox.type = "checkbox"
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;

        if (todo.completed) {
            textSpan.style.textDecoration = "line-through";
            textSpan.style.color = "#999";
        } else {
            textSpan.style.textDecoration = "none";
            textSpan.style.color = "#333";
        }
        saveTodos();
        progress();
    })
    textSpan.textContent = todo.text;

    if (todo.completed) {
        textSpan.style.textDecoration = "line-through"
        textSpan.style.color = "#999"
    }

    const actions = document.createElement("div");
    //edit-btn
    const edit = document.createElement("button")
    edit.className = "edit"
    edit.textContent = "Edit"
    edit.addEventListener("click", () => {
        const newtext = prompt("edit todo", todo.text)
        if (newtext != null) {
            todo.text = newtext.trim();
            textSpan.textContent = todo.text;
            saveTodos();
        }
    })

    //delete-btn
    const del = document.createElement("button")
    del.className = "delete"
    del.textContent = "Delete"
    del.addEventListener("click", () => {
        todos.splice(index, 1);
        render();
        saveTodos();
    })
    label.append(checkbox, textSpan);
    actions.append(edit, del);
    li.append(label, actions);
    return li;
}


function render() {
    list.innerHTML = "";

    todos.forEach((todo, index) => {
        const node = createTodoNode(todo, index);
        list.appendChild(node);
    });
    progress()
}

function addtodo() {
    const text = taskText.value.trim();
    if (!text) {
        return;
    }

    todos.push({ text: text, completed: false })
    taskText.value = "";
    render();
    saveTodos()
}

add.addEventListener("click", addtodo);
taskText.addEventListener("keydown",(e)=>{
    if (e.key =="Enter"){
        addtodo()
    }
})

render();