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
      clearTasks, // Expondo o método clearTasks
  };
}