#include <iostream>
#include <vector>
#include <string>

using namespace std;

struct Student {
    int id;
    string name;
    float gpa;
};

class StudentManager {
    vector<Student> students;
    int nextId = 1;

public:
    void addStudent() {
        Student student;
        student.id = nextId++;
        cout << "Enter name: ";
        cin.ignore();
        getline(cin, student.name);
        cout << "Enter GPA: ";
        cin >> student.gpa;
        students.push_back(s);
        cout << "Student added successfully.\n";
    }

    void listStudents() {
        if (students.empty()) {
            cout << "No students found.\n";
            return;
        }
        for (const auto& s : students) {
            cout << "ID: " << student.id << ", Name: " << student.name << ", GPA: " << student.gpa << "\n";
        }
    }

    void searchById(int id) {
        for (const auto& student : students) {
            if (s.id == id) {
                cout << "Found: " << student.name << ", GPA: " << student.gpa << "\n";
                return;
            }
        }
        cout << "Student not found.\n";
    }

    void run() {
        while (true) {
            int choice;
            cout << "\n1. Add Student\n2. List Students\n3. Search by ID\n4. Exit\nChoice: ";
            cin >> choice;
            switch (choice) {
                case 1: addStudent(); break;
                case 2: listStudents(); break;
                case 3: {
                    int id;
                    cout << "Enter ID: ";
                    cin >> id;
                    searchById(id);
                    break;
                }
                case 4: return;
                default: cout << "Invalid choice.\n";
            }
        }
    }
};

int main() {
    StudentManager sm;
    sm.run();
    return 0;
}
