const fs = require('fs');
const path = require('path');
const readline = require('readline-sync');

const DATA_FILE = path.join(__dirname, 'todos.json');
let todos = [];

// Load todos from file
function loadTodos() {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf-8');
        todos = JSON.parse(data);
    } catch (error) {
        todos = [];
    }
}

function saveTodos() {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));
        console.log("✅ Todos saved.");  
    } catch (err) {
        console.error("Failed to save todos:", err.message);
    }
}

// Add a new todo
function addTodo(title) {
    if (!title.trim()) {
        console.log("Title cannot be empty.");
        return;
    }

    todos.push({ title, completed: false });
    saveTodos();
    console.log(`✔️  Todo "${title}" added!`);
}

// List all todos
function listTodos() {
    console.log("\n📋 Your Todos:");
    if (todos.length === 0) {
        console.log("  No tasks found.");
        return;
    }

    todos.forEach((todo, i) => {
        console.log(`${i + 1}. [${todo.completed ? 'x' : ' '}] ${todo.title}`);
    });
}

// Toggle completed state
function toggleTodo(index) {
    if (todos[index]) {
        todos[index].completed = !todos[index].completed;
        saveTodos();
        console.log(`🔁 Todo "${todos[index].title}" marked as ${todos[index].completed ? 'completed' : 'incomplete'}.`);
    } else {
        console.log("❌ Invalid index.");
    }
}

// Delete a todo
function deleteTodo(index) {
    if (todos[index]) {
        const removed = todos.splice(index, 1)[0];
        saveTodos();
        console.log(`🗑️  Deleted "${removed.title}".`);
    } else {
        console.log("❌ Invalid index.");
    }
}

// Menu display
function showMenu() {
    console.log(`
========= 📌 TODO MENU =========
1. ➕ Add Todo
2. 📄 List Todos
3. ✅ Toggle Todo
4. ❌ Delete Todo
5. 🚪 Exit
`);
}

// Main CLI loop
function main() {
    loadTodos();

    while (true) {
        showMenu();
        const choice = readline.question("Choose an option: ").trim();

        switch (choice) {
            case '1': {
                const title = readline.question("Enter todo title: ");
                addTodo(title);
                break;
            }
            case '2':
                listTodos();
                break;
            case '3': {
                const index = parseInt(readline.question("Enter index to toggle: ")) - 1;
                if (isNaN(index)) {
                    console.log("⚠️  Please enter a valid number.");
                } else {
                    toggleTodo(index);
                }
                break;
            }
            case '4': {
                const index = parseInt(readline.question("Enter index to delete: ")) - 1;
                if (isNaN(index)) {
                    console.log("⚠️  Please enter a valid number.");
                } else {
                    deleteTodo(index);
                }
                break;
            }
            case '5':
                console.log("👋 Exiting. Have a productive day!");
                return;
            default:
                console.log("🚫 Invalid choice. Please try again.");
        }
    }
}

main();
