package LibraryManagementSystem.src;

import LibraryManagementSystem.src.model.Book;
import LibraryManagementSystem.src.service.Library;

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Library library = new Library("data/books.txt");
        Scanner scanner = new Scanner(System.in);

        while (true) {
            System.out.println("\n--- Library Management System ---");
            System.out.println("1. Add Book");
            System.out.println("2. List Books");
            System.out.println("3. Search Book");
            System.out.println("4. Exit");
            System.out.print("Choose an option: ");
            String option = scanner.nextLine();

            switch (option) {
                case "1":
                    System.out.print("Enter title: ");
                    String title = scanner.nextLine();
                    System.out.print("Enter author: ");
                    String author = scanner.nextLine();
                    library.addBook(new Book(title, author));
                    break;
                case "2":
                    library.listBooks();
                    break;
                case "3":
                    System.out.print("Enter title to search: ");
                    String searchTitle = scanner.nextLine();
                    library.searchBook(searchTitle);
                    break;
                case "4":
                    System.out.println("Exiting...");
                    return;
                default:
                    System.out.println("Invalid option. Try again.");
            }
        }
    }
}
