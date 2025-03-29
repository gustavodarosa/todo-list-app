// Entry point for the To-Do List App
import { TodoApp } from './components/todoApp.js';
import { Task } from './components/task.js';

// Initialize the To-Do List App
const todoApp = TodoApp();

// Function to handle adding a task
document.getElementById('addTaskButton').addEventListener('click', () => {
  const taskDescription = document.getElementById('taskInput').value;
  if (taskDescription) {
    todoApp.addTask(taskDescription);
    document.getElementById('taskInput').value = ''; // Clear input field
  }
});

// Function to handle completing a task
document.getElementById('taskList').addEventListener('click', (event) => {
  if (event.target.classList.contains('completeTaskButton')) {
    const taskId = event.target.dataset.id;
    todoApp.completeTask(taskId);
  }
});

// Function to handle removing a task
document.getElementById('taskList').addEventListener('click', (event) => {
  if (event.target.classList.contains('removeTaskButton')) {
    const taskId = event.target.dataset.id;
    todoApp.removeTask(taskId);
  }
});

// Display initial tasks
todoApp.displayTasks();