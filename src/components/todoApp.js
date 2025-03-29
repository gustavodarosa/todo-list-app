import { Task } from './task.js';

export function TodoApp() {
  let tasks = [];

  function addTask(description) {
    const task = new Task(description);
    tasks.push(task);
    displayTasks();
  }

  function removeTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    displayTasks();
  }

  function completeTask(taskId) {
    const task = tasks.find(task => task.id === taskId);
    if (task) task.complete();
    displayTasks();
  }

  function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = tasks.map(task => `
      <li>
        ${task.description} - ${task.isCompleted ? 'Completed' : 'Pending'}
        <button class="completeTaskButton" data-id="${task.id}">Complete</button>
        <button class="removeTaskButton" data-id="${task.id}">Remove</button>
      </li>
    `).join('');
  }

  return { addTask, removeTask, completeTask, displayTasks };
}