import { projectManager } from "./projectManager";
import { openEditTodoModal } from "./dom";

function createToDoItem(todo, index) {
    const todoItem = document.createElement('div');
    console.log(todo.priority);
    todoItem.classList.add('todo-item', getPriorityClass(todo.priority));
        
    const todoTitle = document.createElement('h3');
        todoTitle.textContent = todo.title;
        
    const todoDescription = document.createElement('p');
    todoDescription.textContent = todo.description;
        
    const todoDueDate = document.createElement('p');
    todoDueDate.textContent = `Due: ${todo.dueDate}`;
        
    const todoPriority = document.createElement('p');
    todoPriority.textContent = `Priority: ${todo.priority}`;

    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('buttonDiv');
    
    const todoStatus = document.createElement('button');
    todoStatus.textContent = todo.completed ? 'Mark Incomplete' : 'Mark as Completed';
    todoStatus.addEventListener('click', () => {
        projectManager.getCurrentProject().toggleComplete(index);
        renderTodos();
    });

    const editTodo = document.createElement('button');
    editTodo.textContent = 'Edit';
    editTodo.addEventListener('click', () => {
        openEditTodoModal(todo, index);
    });

    const removeTodo = document.createElement('button');
    removeTodo.textContent = 'Delete';
    removeTodo.addEventListener('click', () => {
        projectManager.getCurrentProject().removeTodo(index);
        renderTodos();
    });

    buttonDiv.appendChild(todoStatus);
    buttonDiv.appendChild(editTodo);
    buttonDiv.appendChild(removeTodo);
        
    todoItem.appendChild(todoTitle);
    todoItem.appendChild(todoDescription);
    todoItem.appendChild(todoDueDate);
    todoItem.appendChild(todoPriority);
    todoItem.appendChild(buttonDiv);
    // todoItem.appendChild(todoStatus);
    // todoItem.appendChild(editTodo);
    // todoItem.appendChild(removeTodo);

    return todoItem;
}

function getPriorityClass(priority) {
    switch (priority) {
        case 'high': return 'high-priority';
        case 'medium': return 'medium-priority';
        case 'low': return 'low-priority';
        default: return '';
    }
}

export function renderProjects() {
    const projectList = document.getElementById('project-list');
    projectList.innerHTML = '';

    projectManager.getProjects().forEach((project, index) => {
        const projectItem = document.createElement('li');
        projectItem.textContent = project.name;
        projectItem.addEventListener('click', () => {
            projectManager.switchProject(index);
            renderTodos();
        });

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation();
            projectManager.removeProject(index);
            renderProjects();
            renderTodos();
        });
        projectList.appendChild(projectItem);
        projectItem.appendChild(deleteButton);
    });
}

export function renderTodos(todos = null) {    
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

     const currentProject = projectManager.getCurrentProject();
     const todosToRender = todos || currentProject.todos;

     const todoProjectTitle = document.querySelector('#todos h2');
     todoProjectTitle.textContent = currentProject.name + ' Todos';

     todosToRender.forEach((todo, index) => {
        const todoItem = createToDoItem(todo, index);
        
        todoList.appendChild(todoItem);
    });
}