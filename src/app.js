import { Task } from './components/task.js';

function TodoApp() {
  let tasks = []; // Lista de tarefas

  function addTask(description) {
      const task = new Task(description); // Cria uma nova tarefa usando o construtor
      tasks.push(task); // Adiciona a tarefa à lista
      saveTasks();
      renderTasks();
  }

  function removeTask(taskId) {
      tasks = tasks.filter(task => task.id !== taskId); // Remove a tarefa pelo ID
      saveTasks();
      renderTasks();
  }

  function clearTasks() {
      tasks = []; // Limpa o array de tarefas
      localStorage.removeItem('tasks'); // Remove as tarefas do localStorage
      renderTasks(); // Atualiza a interface
  }

  function renderTasks() {
      const taskList = document.getElementById('taskList');
      taskList.innerHTML = tasks.map(task => `
          <li>
              ${task.description} - ${task.isCompleted ? 'Concluída' : 'Pendente'}
              <button class="complete-btn" data-id="${task.id}">Concluir</button>
              <button class="delete-btn" data-id="${task.id}">Remover</button>
          </li>
      `).join('');

      document.querySelectorAll('.complete-btn').forEach(button => {
          button.addEventListener('click', handleCompleteTask);
      });

      document.querySelectorAll('.delete-btn').forEach(button => {
          button.addEventListener('click', handleRemoveTask);
      });
  }

  function handleCompleteTask(event) {
      const taskId = parseInt(event.target.dataset.id, 10);
      const task = tasks.find(task => task.id === taskId);
      if (task) {
          task.markAsCompleted();
          saveTasks();
          renderTasks();
      }
  }

  function handleRemoveTask(event) {
      const taskId = parseInt(event.target.dataset.id, 10);
      removeTask(taskId);
  }

  function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadTasks() {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
          tasks = JSON.parse(storedTasks).map(taskData => {
              const task = new Task(taskData.description);
              task.id = taskData.id;
              task.isCompleted = taskData.isCompleted;
              return task;
          });
      }
  }

  loadTasks();
  renderTasks();

  return {
      addTask,
      removeTask,
      clearTasks, // ✅ Agora o método está no retorno do objeto!
  };
}

// Criando a instância corretamente (apenas uma vez)
const todoApp = TodoApp();

// Corrigindo a chamada do botão de limpar tarefas
document.getElementById('clearTasksBtn').addEventListener('click', function () {
  todoApp.clearTasks();
});

document.getElementById('addTaskBtn').addEventListener('click', function () {
  const taskInput = document.getElementById('taskInput'); // Obtém o campo de entrada
  if (taskInput.value.trim() !== '') { // Verifica se o campo não está vazio
      todoApp.addTask(taskInput.value); // Chama o método addTask da instância todoApp
      taskInput.value = ''; // Limpa o campo de entrada
  }
});