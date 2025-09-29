export class Project {
  constructor(name) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.todos = [];
  }

  addTodo(todo) {   
    this.todos.push(todo);
  }

  deleteTodo(todoId) {
    this.todos = this.todos.filter(t => t.id !== todoId);
  }
}
