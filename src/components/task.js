export function Task(description) {
  this.id = Date.now(); // Gera um ID único
  this.description = description; // Descrição da tarefa
  this.isCompleted = false; // Estado inicial
}

Task.prototype.markAsCompleted = function () {
  this.isCompleted = true;
};

Task.prototype.updateDescription = function (newDescription) {
  this.description = newDescription;
};