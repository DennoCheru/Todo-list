import { Todo } from './todo.js';
import { projectManager } from './projectManager.js';

console.log('Default Project: ', projectManager.defaultProject);

const personalProject = projectManager.addProject('Personal');;
const workProject = projectManager.addProject('Work');

const todo1 = new Todo('Buy groceries', 'Buy milk, eggs, and bread', '2021-07-01', 'High');
projectManager.defaultProject.addTodo(todo1);

const todo2 = new Todo('Finish project', 'Finish the project by the deadline', '2021-07-15', 'Medium');
workProject.addTodo(todo2);

console.log("All projects: ", projectManager.getProjects());

console.log("Todo's in work project: ", workProject.getTodos());