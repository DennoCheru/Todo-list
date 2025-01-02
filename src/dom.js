import { projectManager } from "./projectManager.js";
import { Todo } from "./todo.js";

const projectList = document.querySelector('#project-list');
const todoList = document.querySelector('#todo-list');
const addProjectButton = document.querySelector('#add-project');
const addTodoButton = document.querySelector('#add-todo');
const todoModal = document.querySelector('#todo-modal');
const todoModalCloseBtn = document.querySelector('#todo-modal-close');
const todoModalForm = document.querySelector('#todo-modal-form');
const projectSelect = document.querySelector('#project-select');
const titleInput = document.querySelector('#todo-title');
const descriptionInput = document.querySelector('#todo-description');
const dueDateInput = document.querySelector('#todo-due-date');
const priorityInput = document.querySelector('#todo-priority');

function renderProjects() {
    projectList.innerHTML = "";
    projectManager.getProjects().forEach((project) => {
        const projectItem = document.createElement('li');
        projectItem.textContent = project.name;
        projectItem.addEventListener('click', () => renderTodos(project));
        projectList.appendChild(projectItem);
    });
}

function renderTodos(project) {
    todoList.innerHTML = "";
    project.getTodos().forEach((todo, index) => {
        const todoItem = document.createElement('li');
        todoItem.classList.add('todo-item');

        const title = document.createElement('h3');
        title.textContent = todo.title;

        const description = document.createElement('p');
        description.textContent = todo.description;

        const dueDate = document.createElement('p');
        dueDate.textContent = `Due Date: ${todo.dueDate}`;

        const priority = document.createElement('p');
        priority.textContent = `Priority: ${todo.priority}`;

        const notes = document.createElement('p');
        notes.textContent = `Notes: ${todo.notes}`;

        const checklist = document.createElement('ul');
        todo.checklist.forEach((item) => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            checklist.appendChild(listItem);
        });

        const completeButton = document.createElement('button');
        completeButton.textContent = todo.completed ? 'Completed' : 'Mark as Complete';
        completeButton.addEventListener('click', () => {
            todo.markComplete();
            renderTodos(project);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            project.removeTodo(index);
            renderTodos(project);
        });

        todoItem.append(title, description, dueDate, priority, notes, checklist, completeButton, deleteButton);
        todoList.appendChild(todoItem);
    });

    addProjectButton.addEventListener('click', () => {
        const projectName = prompt("Enter project name:");
        if (projectName) {
            projectManager.addProject(projectName);
            renderProjects();
            renderTodos(project);
        }
    });

    addTodoButton.addEventListener('click', () => {
        projectSelect.innerHTML = "";
        projectManager.getProjects().forEach((project) => {
            const option = document.createElement('option');
            option.value = project.name;
            option.textContent = project.name;
            projectSelect.appendChild(option);
        });

        todoModal.style.display = 'block';
    });

    todoModalCloseBtn.addEventListener('click', () => {
        todoModal.style.display = 'none';
    });

    todoModalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const projectName = projectSelect.value;
        const project = projectManager.findProject(projectName);
        const title = titleInput.value;
        const description = descriptionInput.value;
        const dueDate = dueDateInput.value;
        const priority = priorityInput.value;

        if (selectedProject && title && description && dueDate && priority) {
            const newTodo = new Todo(title, description, dueDate, priority);
            selectedProject.addTodo(newTodo);
            renderTodos(selectedProject);

            todoModal.style.display = 'none';
            todoModalForm.reset();
        }
    });
}

renderProjects();
renderTodos(projectManager.defaultProject);