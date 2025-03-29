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

    function renderTasks() {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = tasks.map(task => `
            <li>
                ${task.description} - ${task.isCompleted ? 'Concluída' : 'Pendente'}
                <button class="complete-btn" data-id="${task.id}">Concluir</button>
                <button class="delete-btn" data-id="${task.id}">Remover</button>
            </li>
        `).join('');

        // Adiciona eventos aos botões
        document.querySelectorAll('.complete-btn').forEach(button => {
            button.addEventListener('click', function () {
                const taskId = parseInt(this.dataset.id, 10);
                const task = tasks.find(task => task.id === taskId);
                if (task) {
                    task.markAsCompleted(); // Usa o método do prototype
                    saveTasks();
                    renderTasks();
                }
            });
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function () {
                const taskId = parseInt(this.dataset.id, 10);
                removeTask(taskId);
            });
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
    };
}

const todoApp = TodoApp();

document.getElementById('addTaskBtn').addEventListener('click', function () {
    const taskInput = document.getElementById('taskInput');
    if (taskInput.value.trim() !== '') {
        todoApp.addTask(taskInput.value);
        taskInput.value = '';
    }
});