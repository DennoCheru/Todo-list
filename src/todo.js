class Todo {
    constructor(title, description, dueDate, priority, notes = "", checklist = []) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checklist = checklist;
        this.completed = false;
    }
    
    updatePriority(newPriority) {
        this.priority = newPriority;
    }

    updateDueDate(newDueDate) {
        this.dueDate = newDueDate;
    }

    toggleComplete() {
        this.completed = !this.completed;
    }
}

export { Todo };