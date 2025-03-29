export function Task(description) {
  this.id = Date.now().toString();
  this.description = description;
  this.isCompleted = false;
}

Task.prototype.complete = function() {
  this.isCompleted = true;
};