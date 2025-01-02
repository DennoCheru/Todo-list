class Project {
    constructor(name) {
        this.name = name;
        this.todos = [];
    }

    addTodo(todo) {
        this.todos.push(todo);
    }

    removeTodo(index) {
        if (index >= 0 && index < this.todos.length) {
            this.todos.splice(index, 1);
        }
    }

    getTodos() {
        return this.todos;
    }

    sortByPriority() {
        const priorityOrder = {
            'Low': 1,
            'Medium': 2,
            'High': 3
        };
        this.todos.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }

    sortByDueDate() {
        this.todos.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    }

    filterByStatus(completed = true) {
        return this.todos.filter(todo => todo.completed === completed);
    }
}

export { Project };