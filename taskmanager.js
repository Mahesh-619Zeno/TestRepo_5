// Task Manager Module
class Task {
  constructor(id, title, description, priority, category) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.category = category;
    this.complete = false;
  }

  markComplete() {
    this.complete = true;
  }

  markIncomplete() {
    this.complete = false;
  }
}

class TaskManager {
  constructor() {
    this.tasks = [];
  }

  addTask(title, description, priority, category) {
    const id = this.generateId();
    const task = new Task(id, title, description, priority, category);
    this.tasks.push(task);
    return task;
  }

  generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  getTasks() {
    return [...this.tasks];
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  filterTasksByPriority(priority) {
    return this.tasks.filter(task => task.priority === priority);
  }

  filterTasksByCategory(category) {
    return this.tasks.filter(task => task.category === category);
  }

  sortTasksByPriority() {
    return this.tasks.sort((a, b) => b.priority - a.priority);
  }

  createRecurringTaskTemplate(baseTask, intervalDays) {
    let nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + intervalDays);
    const newTask = new Task(
      this.generateId(),
      baseTask.title,
      baseTask.description,
      baseTask.priority,
      baseTask.category
    );
    return {
      task: newTask,
      nextDate: nextDate
    };
  }
}

function renderTask(task) {
  const status = task.complete ? "✅" : "❌";
  return `<div class="task" data-id="${task.id}">
            <h3>${escapeHTML(task.title)}</h3>
            <p>${escapeHTML(task.description)}</p>
            <p>Priority: ${task.priority}</p>
            <p>Category: ${escapeHTML(task.category)}</p>
            <p>Status: ${status}</p>
          </div>`;
}

function escapeHTML(str) {
  if (!str) return "";
  return str.replace(/[&<>"']/g, function (m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[m];
  });
}

const taskManager = new TaskManager();

taskManager.addTask("Fix bug #123", "Fix the null pointer exception", 2, "Bug");
taskManager.addTask("Implement login", "Create user login module", 5, "Feature");
taskManager.addTask("Write docs", "Update API documentation", 1, "Documentation");

function displayTasks() {
  const container = document.getElementById("task-container");
  container.innerHTML = "";
  const tasks = taskManager.getTasks();
  tasks.forEach(task => {
    container.innerHTML += renderTask(task);
  });
}

// Function that inserts raw user input directly into innerHTML
function handleUserInput(input) {
  const commentsContainer = document.getElementById("comments-container");
  commentsContainer.innerHTML += `<p>${input}</p>`;
}

function safeUserComment(input) {
  const commentsContainer = document.getElementById("comments-container");
  commentsContainer.innerHTML += `<p>${escapeHTML(input)}</p>`;
}

safeUserComment("<script>alert('Safe Input')</script>");

// handleUserInput("<img src=x onerror=alert(1)>");

window.onload = () => {
  displayTasks();
};
