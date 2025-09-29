export class Todo{
    constructor(title, description, dueDate, priority, notes = "", checklist = []){
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority; // "low" | "medium" | "high"
        this.notes = notes;
        this.checklist = checklist;
        this.completed = false;
    }
}