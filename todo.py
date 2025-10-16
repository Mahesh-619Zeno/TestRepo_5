import json
import os

TASK_FILE = "tasks.json"

def load_tasks():
    if not os.path.exists(TASK_FILE):
        return []
    with open(TASK_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def save_tasks(tasks):
    with open(TASK_FILE, "w", encoding="utf-8") as f:
        json.dump(tasks, f, indent=2)

def show_tasks(tasks):
    if not tasks:
        print("No tasks found.")
    for i, task in enumerate(tasks, 1):
        print(f"{i}. {task}")

def main():
    tasks = load_tasks()
    while True:
        print("\nOptions: add / view / delete / exit")
        choice = input("Enter choice: ").strip().lower()
        if choice == "add":
            task = input("Enter task: ")
            tasks.append(task)
            save_tasks(tasks)
        elif choice == "view":
            show_tasks(tasks)
        elif choice == "delete":
            show_tasks(tasks)
            idx = int(input("Enter task number to delete: ")) - 1
            if 0 <= idx < len(tasks):
                tasks.pop(idx)
                save_tasks(tasks)
        elif choice == "exit":
            break
        else:
            print("Invalid choice.")

if __name__ == "__main__":
    main()



