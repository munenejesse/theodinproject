import { saveProjects, loadProjects } from "./storage.js";
import { Project } from "./project.js";

class AppController {
  constructor() {
    this.projects = loadProjects();
    if (this.projects.length === 0) {
      this.projects = [new Project("Default")];
    }
    saveProjects(this.projects);
  }

  addProject(name) {
    const project = new Project(name);
    this.projects.push(project);
    this.save();
  }

  addTodoToProject(projectId, todo) {
    const project = this.projects.find(p => p.id === projectId);
    if (project) {
      project.addTodo(todo);
      this.save();
    }
  }

  save() {
    saveProjects(this.projects);
  }
}

export const app = new AppController();
