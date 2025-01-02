import './style.css';
import { Todo } from './todo.js';
import { projectManager } from './projectManager.js';
import { renderProjects, renderTodos } from './render.js';
import { openTodoModal, closeTodoModal, toggleComplete, changePriority, changeDueDate, filterTodos, sortByPriority, sortByDueDate, openProjectModal, closeProjectModal } from './dom.js';

document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    renderTodos();
});

document.getElementById('filter-all').addEventListener('click', () => filterTodos('all'));
document.getElementById('filter-active').addEventListener('click', () => filterTodos('active'));
document.getElementById('filter-complete').addEventListener('click', () => filterTodos('completed'));

document.getElementById('sort-priority').addEventListener('click', sortByPriority);
document.getElementById('sort-due-date').addEventListener('click', sortByDueDate);

export {
    projectManager,
    renderProjects,
    renderTodos,
    Todo,
    openTodoModal,
    closeTodoModal,
    toggleComplete,
    changePriority,
    changeDueDate,
    filterTodos,
    sortByPriority,
    sortByDueDate,
    openProjectModal,
    closeProjectModal
};