import { Project } from "./project.js";
import { Todo } from "./todo.js";

export class ProjectManager {
    constructor() {
        this.projects = this.loadProjectsFromLocalStorage() || [];
        this.currentProjectIndex = 0;

        if (this.projects.length === 0) {
            const defaultProject = new Project('Default Project');
            this.projects.push(defaultProject);
        }

        this.saveProjectsToLocalStorage();
    }

    loadProjectsFromLocalStorage() {
        const storedProjects = localStorage.getItem('projects');
        if (storedProjects) {
            const parsedProjects = JSON.parse(storedProjects);

            return parsedProjects.map(projectData => {
                const project = new Project(projectData.name);
                if(Array.isArray(projectData.todos)) {
                    projectData.todos.forEach(todoData => {
                        const todo = new Todo(
                            todoData.title,
                            todoData.description,
                            todoData.dueDate,
                            todoData.priority,
                            todoData.notes,
                            todoData.checklist
                        );    
                        project.addTodo(todo);                
                    });
                }
                return project;
            });
        }
        return [];
    }

    saveProjectsToLocalStorage() {
        const projectData = this.projects.map(project => ({
            name: project.name,
            todos: project.todos
        }));
        localStorage.setItem('projects', JSON.stringify(projectData));
    }

    getProjects() {
        return this.projects;
    }

    getCurrentProject() {
        if (this.projects.length > 0 && this.currentProjectIndex < this.projects.length) {
            return this.projects[this.currentProjectIndex];
        }
        return null;
    }

    setCurrentProject(index) {
        if (index >= 0 && index < this.projects.length) {
            this.currentProjectIndex = index;
            this.saveProjectsToLocalStorage();
        }
    }

    addProject(name) {
        const newProject = new Project(name);
        this.projects.push(newProject);
        this.saveProjectsToLocalStorage();
        return newProject;
    }

    getTodos() {
        return this.getCurrentProject().todos;
    }

    addTodoToCurrentProject(todo) {
        this.getCurrentProject().addTodo(todo);
        this.saveProjectsToLocalStorage();
    }

    switchProject(index) {
        this.setCurrentProject(index);
    }

    removeProject(index) {
        if (this.projects.length > 1) {
            this.projects.splice(index, 1);
            if (this.currentProjectIndex >= index && this.currentProjectIndex > 0) {
                this.currentProjectIndex -= 1;
            }
            this.saveProjectsToLocalStorage(); 
        } else {
                alert('Cannot remove the last project');
        }
    }
}

export const projectManager = new ProjectManager();