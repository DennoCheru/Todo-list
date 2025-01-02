import { projectManager } from "./projectManager.js";
import { renderProjects, renderTodos } from "./render.js";
import { Todo } from "./todo.js";

export function openTodoModal() {
    const modal = document.getElementById('todo-modal');
    modal.style.display = 'block';
}

export function closeTodoModal() {
    const modal = document.getElementById('todo-modal');
    modal.style.display = 'none';
}

export function openProjectModal() {
    const modal = document.getElementById('project-modal');
    modal.style.display = 'block';
}

export function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    modal.style.display = 'none';
}

export function openEditTodoModal(todo, index) {
    document.getElementById('todo-title').value = todo.title;
    document.getElementById('todo-description').value = todo.description;
    document.getElementById('todo-due-date').value = todo.dueDate;
    document.getElementById('todo-priority').value = todo.priority;
    document.getElementById('todo-notes').value = todo.notes;
    document.getElementById('todo-checklist').value = todo.checklist.join('\n');

    document.getElementById('todo-modal').setAttribute('data-edit-index', index);

    openTodoModal();
}

function clearTodoModal() {
    document.getElementById('todo-title').value = '';
    document.getElementById('todo-description').value = '';
    document.getElementById('todo-due-date').value = '';
    document.getElementById('todo-priority').value = '';
    document.getElementById('todo-notes').value = '';
    document.getElementById('todo-checklist').value = '';
    document.getElementById('todo-modal').removeAttribute('data-edit-index');
}


document.getElementById('add-todo').addEventListener('click', openTodoModal);

document.getElementById('todo-modal-close').addEventListener('click', closeTodoModal);

document.getElementById('save-todo').addEventListener('click', () => {
    const title = document.getElementById('todo-title').value;
    const description = document.getElementById('todo-description').value;
    const dueDate = document.getElementById('todo-due-date').value;
    const priority = document.getElementById('todo-priority').value;
    const notes = document.getElementById('todo-notes').value;
    const checklist = document.getElementById('todo-checklist').value.split('\n');

    const index = document.getElementById('todo-modal').getAttribute('data-edit-index');

    const currentProject = projectManager.getCurrentProject();

    if (index === null) {
        const newTodo = new Todo(title, description, dueDate, priority, notes, checklist);
        projectManager.addTodoToCurrentProject(newTodo)
    } else {
        const todoToEdit = currentProject.todos[index];
        todoToEdit.title = title;
        todoToEdit.description = description;
        todoToEdit.dueDate = dueDate;
        todoToEdit.priority = priority;
        todoToEdit.notes = notes;
        todoToEdit.checklist = checklist;
    }
    renderTodos();
    closeTodoModal();
    clearTodoModal();
});

document.getElementById('add-project').addEventListener('click', openProjectModal);

document.getElementById('project-modal-close').addEventListener('click', closeProjectModal);

document.getElementById('save-project').addEventListener('click', () => {
    const projectName = document.getElementById('project-name').value;
    if (projectName) {
        projectManager.addProject(projectName);
        renderProjects();
        closeProjectModal();
    } else {
        alert('Project name cannot be empty');
    }
});

renderProjects();
renderTodos();

function updateAndRenderTodos(updateFunction) {
    const currentProject = projectManager.getCurrentProject();
    updateFunction(currentProject);
    renderTodos();
}

export function toggleComplete(index) {
    updateAndRenderTodos(currentProject => {
        currentProject.toggleComplete(index);
    });
}

export function changePriority(index, newPriority) {
    updateAndRenderTodos(currentProject => {
        currentProject.changePriority(index, newPriority);
    });
}

export function changeDueDate(index, newDueDate) {
    updateAndRenderTodos(currentProject => {
        currentProject.changeDueDate(index, newDueDate);
    });
}

export function filterTodos(status) {
    const currentProject = projectManager.getCurrentProject();
    const filteredTodos = currentProject.filterByStatus(status);
    renderTodos(filteredTodos);
}

export function sortByPriority() {
    const currentProject = projectManager.getCurrentProject();
    currentProject.sortByPriority();
    renderTodos();
}

export function sortByDueDate() {
    const currentProject = projectManager.getCurrentProject();
    currentProject.sortByDueDate();
    renderTodos();
}