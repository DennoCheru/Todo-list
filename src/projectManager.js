import { Project } from './project.js';

class ProjectManager {
    constructor() {
        this.projects = [];
        this.defaultProject = new Project('Default');
        this.projects.push(this.defaultProject);
    }

    addProject(name) {
        const project = new Project(name);
        this.projects.push(project);
        return project;
    }

    getProjects() {
        return this.projects;
    }

    findProject(name) {
        return this.projects.find(project => project.name === name);
    }

    removeProject(name) {
        this.projects = this.projects.filter(project => project.name !== name);
    }
}

export const projectManager = new ProjectManager();