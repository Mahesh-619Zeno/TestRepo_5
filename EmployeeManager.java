

import java.util.*;  
import java.io.File; 

public class EmployeeManager {  

    public static ArrayList employees = new ArrayList(); 

    static Scanner sc = new Scanner(System.in);  

    public static void main(String args[]) {  
        while(true) {  
            System.out.println("\n1. Add Employee");
            System.out.println("2. View Employees");
            System.out.println("3. Exit");
            System.out.print("Enter choice: ");

            int choice = sc.nextInt();  

            if(choice == 1) {
                addEmployee();
            } else if(choice == 2) {
                showEmployees();
            } else if(choice == 3) {
                break;
            } else {
                System.out.println("Invalid choice.");
            }
        }
    }

    public static void addEmployee() {
        System.out.print("Enter name: ");
        String name = sc.next();  

        System.out.print("Enter age: ");
        int age = sc.nextInt();

        System.out.print("Enter department: ");
        String dept = sc.next();

        Employee e = new Employee(name, age, dept);
        employees.add(e);  
    }

    public static void showEmployees() {
        if(employees.size() == 0)
            System.out.println("No employees.");  

        for(int i = 0; i < employees.size(); i++) {
            Employee e = (Employee)employees.get(i);  
            System.out.println(e.name + ", " + e.age + ", " + e.department);
        }
    }
}

class Employee {
    public String name;  
    public int age;
    public String department;

    public Employee(String name, int age, String department) {
        this.name = name;
        this.age = age;
        this.department = department;
    }


}
