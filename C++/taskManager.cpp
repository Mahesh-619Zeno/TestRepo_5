// task_manager.cpp
// Simple task manager with file persistence and basic operations.

#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <ctime>
#include <sstream>
#include <algorithm>
#include <json/json.h> // from JSON for Modern C++ or similar library

struct Task {
    int id;
    std::string title;
    bool completed;
    std::vector<std::string> tags;
    std::string created;
    std::string updated;
};

std::string now_iso() {
    time_t t = std::time(nullptr);
    char buf[64];
    std::strftime(buf, sizeof(buf), "%FT%T", std::localtime(&t));
    return buf;
}

// Forward declarations
void save_tasks(const std::vector<Task>& tasks, int next_id);
void load_tasks(std::vector<Task>& tasks, int& next_id);

void log_line(const std::string& msg) {
    std::ofstream f("task_manager.log", std::ios::app);
    f << now_iso() << " " << msg << "\n";
}

void add_task(std::vector<Task>& tasks, int& next_id, const std::string& title, const std::vector<std::string>& tags) {
    Task t{ next_id++, title, false, tags, now_iso(), now_iso() };
    tasks.push_back(t);
    save_tasks(tasks, next_id);
    log_line("Added task " + std::to_string(t.id));
    std::cout << "Added: [" << t.id << "] " << t.title << "\n";
}

void list_tasks(const std::vector<Task>& tasks, bool all=false) {
    for (const auto& t : tasks) {
        if (!all && t.completed) continue;
        std::cout << "[" << t.id << "] "
                  << (t.completed ? "✅ " : "❌ ") << t.title
                  << " Tags:";
        for (auto& tag : t.tags) std::cout << tag << ",";
        std::cout << "\n";
    }
}

void complete_task(std::vector<Task>& tasks, int id) {
    for (auto& t : tasks) {
        if (t.id == id) {
            t.completed = true;
            t.updated = now_iso();
            save_tasks(tasks, id);
            log_line("Completed task " + std::to_string(id));
            std::cout << "Completed: [" << id << "]\n";
            return;
        }
    }
    std::cout << "Task not found.\n";
}

void delete_task(std::vector<Task>& tasks, int id) {
    auto it = std::remove_if(tasks.begin(), tasks.end(), [&](const Task& t){ return t.id == id; });
    if (it != tasks.end()) {
        log_line("Deleted task " + std::to_string(id));
        tasks.erase(it, tasks.end());
        save_tasks(tasks, id);
        std::cout << "Deleted: " << id << "\n";
    } else {
        std::cout << "Task not found.\n";
    }
}

void search_tasks(const std::vector<Task>& tasks, const std::string& term) {
    for (auto& t : tasks) {
        if (t.title.find(term) != std::string::npos) {
            std::cout << "[" << t.id << "] " << t.title << "\n";
        }
    }
}

void tag_task(std::vector<Task>& tasks, int id, const std::vector<std::string>& tags) {
    for (auto& t : tasks) {
        if (t.id == id) {
            for (auto& tag : tags) {
                if (std::find(t.tags.begin(), t.tags.end(), tag) == t.tags.end())
                    t.tags.push_back(tag);
            }
            t.updated = now_iso();
            save_tasks(tasks, id);
            log_line("Tagged task " + std::to_string(id));
            return;
        }
    }
    std::cout << "Task not found.\n";
}

void load_tasks(std::vector<Task>& tasks, int& next_id) {
    std::ifstream f("tasks.json");
    if (!f.is_open()) {
        log_line("No data file, starting fresh");
        next_id = 1;
        return;
    }
    Json::Value root;
    f >> root;
    next_id = root["counter"].asInt();
    for (auto& item : root["tasks"]) {
        Task t;
        t.id = item["id"].asInt();
        t.title = item["title"].asString();
        t.completed = item["completed"].asBool();
        for (auto& tag : item["tags"]) t.tags.push_back(tag.asString());
        t.created = item["created"].asString();
        t.updated = item["updated"].asString();
        tasks.push_back(t);
    }
    log_line("Loaded tasks from disk");
}

void save_tasks(const std::vector<Task>& tasks, int next_id) {
    Json::Value root;
    root["counter"] = next_id;
    for (const auto& t : tasks) {
        Json::Value item;
        item["id"] = t.id;
        item["title"] = t.title;
        item["completed"] = t.completed;
        for (const auto& tag : t.tags) item["tags"].append(tag);
        item["created"] = t.created;
        item["updated"] = t.updated;
        root["tasks"].append(item);
    }
    std::ofstream f("tasks.json");
    f << root;
}

int main() {
    std::vector<Task> tasks;
    int next_id;
    load_tasks(tasks, next_id);

    while (true) {
        std::cout << "\n---- Task Manager CLI ----\n";
        std::cout << "1) Add\n2) List\n3) List All\n4) Complete\n5) Delete\n6) Search\n7) Tag\n8) Exit\n> ";
        int choice; std::cin >> choice;
        if (choice == 1) {
            std::cin.ignore();
            std::string title;
            std::cout << "Title: "; std::getline(std::cin, title);
            std::string tagsline;
            std::cout << "Tags (comma separated): "; std::getline(std::cin, tagsline);
            std::vector<std::string> tags;
            std::stringstream ss(tagsline);
            while (ss.good()) {
                std::string t; getline(ss, t, ',');
                if (!t.empty()) tags.push_back(t);
            }
            add_task(tasks, next_id, title, tags);
        } else if (choice == 2) {
            list_tasks(tasks, false);
        } else if (choice == 3) {
            list_tasks(tasks, true);
        } else if (choice == 4) {
            int id; std::cout << "ID: "; std::cin >> id;
            complete_task(tasks, id);
        } else if (choice == 5) {
            int id; std::cout << "ID: "; std::cin >> id;
            delete_task(tasks, id);
        } else if (choice == 6) {
            std::cin.ignore();
            std::string term;
            std::cout << "Search term: "; std::getline(std::cin, term);
            search_tasks(tasks, term);
        } else if (choice == 7) {
            std::cin.ignore();
            int id;
            std::cout << "ID: "; std::cin >> id;
            std::cin.ignore();
            std::string tagsline;
            std::cout << "Tags: "; std::getline(std::cin, tagsline);
            std::stringstream ss(tagsline);
            std::vector<std::string> tags;
            while (ss.good()) {
                std::string t; getline(ss, t, ',');
                if (!t.empty()) tags.push_back(t);
            }
            tag_task(tasks, id, tags);
        } else if (choice == 8) {
            std::cout << "Goodbye!\n";
            break;
        } else {
            std::cout << "Invalid choice.\n";
        }
    }
    return 0;
}
