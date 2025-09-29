export function renderProjects(projects, onSelect) {
  const projectList = document.getElementById("project-list");
  projectList.innerHTML = "";

  projects.forEach(project => {
    const li = document.createElement("li");
    li.textContent = project.name;
    li.style.cursor = "pointer";
    li.addEventListener("click", () => onSelect(project));
    projectList.appendChild(li);
  });
}

export function renderTodos(project) {
  const todoList = document.getElementById("todo-list");
  const title = document.getElementById("selected-project-title");
  title.textContent = project.name;

  todoList.innerHTML = "";

  project.todos.forEach(todo => {
    const div = document.createElement("div");
    div.classList.add("todo-item");

    div.innerHTML = `
      <strong>${todo.title}</strong> (Due: ${todo.dueDate}) 
      <span style="color:${getPriorityColor(todo.priority)}">[${todo.priority}]</span>
      <button data-id="${todo.id}" class="delete-todo">Delete</button>
    `;

    todoList.appendChild(div);
  });
}

function getPriorityColor(priority) {
  switch (priority) {
    case "high": return "red";
    case "medium": return "orange";
    default: return "green";
  }
}
