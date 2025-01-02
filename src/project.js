import { Todo } from './todo.js';

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

    toggleComplete(index) {
        const todo = this.todos[index];
        if (todo) {
            todo.toggleComplete();
        }
    }

    changePriority(index, newPriority) {
        const todo = this.todos[index];
        if (todo) {
            todo.updatePriority(newPriority);
        }
    }

    changeDueDate(index, newDueDate) {
        const todo = this.todos[index];
        if (todo) {
            todo.updateDueDate(newDueDate);
        }
    }

    sortByPriority() {
        const priorityOrder = {
            'low': 3,
            'medium': 2,
            'high': 1
        };
        this.todos.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }

    sortByDueDate() {
        this.todos.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    }

    filterByStatus(status) {
        if (status === 'active') {
            return this.todos.filter(todo => !todo.completed);
        } else if (status === 'completed') {
            return this.todos.filter(todo => todo.completed);
        } else {
            return this.todos;
        }
    }
}

export { Project };