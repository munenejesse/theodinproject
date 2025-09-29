import './style.css'
import { app } from "./modules/controller.js";
import { renderProjects, renderTodos } from "./ui/render.js";
import { Todo } from "./modules/todo.js";

let currentProject = app.projects[0]; // default

function init() {
  renderProjects(app.projects, selectProject);
  renderTodos(currentProject);

  // Add Project
  document.getElementById("project-form").addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("project-name").value.trim();
    if (!name) return;
    app.addProject(name);
    renderProjects(app.projects, selectProject);
    e.target.reset();
  });

  // Add Todo
  document.getElementById("todo-form").addEventListener("submit", e => {
    e.preventDefault();
    const title = document.getElementById("todo-title").value;
    const desc = document.getElementById("todo-desc").value;
    const dueDate = document.getElementById("todo-date").value;
    const priority = document.getElementById("todo-priority").value;

    const todo = new Todo(title, desc, dueDate, priority);
    app.addTodoToProject(currentProject.id, todo);

    renderTodos(currentProject);
    e.target.reset();
  });

  // Delete Todo (event delegation)
  document.getElementById("todo-list").addEventListener("click", e => {
    if (e.target.classList.contains("delete-todo")) {
      const id = e.target.getAttribute("data-id");
      currentProject.deleteTodo(id);
      app.save(); // persist changes
      renderTodos(currentProject);
    }
  });
}

function selectProject(project) {
  currentProject = project;
  renderTodos(currentProject);
}

document.addEventListener("DOMContentLoaded", init);
