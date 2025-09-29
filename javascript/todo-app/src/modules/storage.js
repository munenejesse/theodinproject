import { Project } from "./project.js";
import { Todo } from "./todo.js";

const STORAGE_KEY = "projects";

export function saveProjects(projects) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function loadProjects() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];

  // Convert plain objects back into Project and Todo instances
  const parsed = JSON.parse(data);
  return parsed.map(p => {
    const project = new Project(p.name);
    project.id = p.id; // preserve ID

    project.todos = p.todos.map(t => {
      const todo = new Todo(
        t.title,
        t.description,
        t.dueDate,
        t.priority,
        t.notes,
        t.checklist
      );
      todo.id = t.id;
      todo.completed = t.completed;
      return todo;
    });

    return project;
  });
}
