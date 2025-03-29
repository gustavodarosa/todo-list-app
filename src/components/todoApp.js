import { Task } from './task.js';

export function TodoApp() {
  // Estado privado encapsulado
  let tasks = [];

  // Função para adicionar uma tarefa
  function addTask(description) {
    const task = new Task(description);
    tasks.push(task);
    displayTasks();
  }

  // Função para remover uma tarefa
  function removeTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    displayTasks();
  }

  // Função para marcar uma tarefa como concluída
  function completeTask(taskId) {
    const task = tasks.find(task => task.id === taskId);
    if (task) task.complete();
    displayTasks();
  }

  // Função para exibir as tarefas na tela
  function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = tasks.map(task => `
      <li>
        ${task.description} - ${task.isCompleted ? 'Concluída' : 'Pendente'}
        <button class="completeTaskButton" data-id="${task.id}">Concluir</button>
        <button class="removeTaskButton" data-id="${task.id}">Remover</button>
      </li>
    `).join('');
  }

  // Função para sanitizar entradas do usuário
function sanitizeInput(input) {
  const div = document.createElement('div');
  div.textContent = input; // Escapa caracteres perigosos
  return div.innerHTML;
}

// Atualize a função addTask para usar a sanitização
function addTask(description) {
  const sanitizedDescription = sanitizeInput(description); // Sanitiza a entrada
  const task = new Task(sanitizedDescription);
  tasks.push(task);
  displayTasks();
}

  // Retorna apenas os métodos públicos
  return {
    addTask,
    removeTask,
    completeTask,
    displayTasks
  };
}