import java.util.*; // Violation: Wildcard import
import java.io.File; // Violation: Unused import

public class LibrarySystem { // Violation: Missing Javadoc

    static ArrayList books = new ArrayList(); // Violation: Raw types
    static ArrayList members = new ArrayList(); // Violation: Raw types

    public static Scanner input = new Scanner(System.in);

    static String lastAction = ""; // Violation: Unused variable

    public static void main(String args[]) { // Violation: args[] non-standard
        while(true){ // Violation: No space after while
            showMenu();
            int choice = input.nextInt(); // Violation: No validation

            if(choice == 1){
                addBook();
            }else if(choice == 2){
                registerMember();
            }else if(choice == 3){
                borrowBook();
            }else if(choice == 4){
                returnBook();
            }else if(choice == 5){
                listBooks();
            }else if(choice == 6){
                listMembers();
            }else if(choice == 7){
                System.out.println("Goodbye.");
                break;
            }else{
                System.out.println("Invalid option");
            }
        }
    }

    static void showMenu(){
        System.out.println("\n=== LIBRARY SYSTEM ===");
        System.out.println("1. Add Book");
        System.out.println("2. Register Member");
        System.out.println("3. Borrow Book");
        System.out.println("4. Return Book");
        System.out.println("5. List Books");
        System.out.println("6. List Members");
        System.out.println("7. Exit");
        System.out.print("Enter choice: ");
    }

    static void addBook(){
        System.out.print("Enter book title: ");
        String title = input.next();

        System.out.print("Enter author: ");
        String author = input.next();

        System.out.print("Enter ISBN: ");
        String isbn = input.next();

        Book b = new Book(title, author, isbn);
        books.add(b);
        System.out.println("Book added.");
    }

    static void registerMember(){
        System.out.print("Enter member name: ");
        String name = input.next();

        System.out.print("Enter ID: ");
        int id = input.nextInt();

        Member m = new Member(name, id);
        members.add(m);
        System.out.println("Member registered.");
    }

    static void borrowBook(){
        System.out.print("Enter member ID: ");
        int memberId = input.nextInt();

        System.out.print("Enter book ISBN: ");
        String isbn = input.next();

        Member foundMember = null;
        for(int i = 0; i < members.size(); i++){
            Member m = (Member)members.get(i);
            if(m.id == memberId){
                foundMember = m;
                break;
            }
        }

        if(foundMember == null){
            System.out.println("Member not found.");
            return;
        }

        for(int i = 0; i < books.size(); i++){
            Book b = (Book)books.get(i);
            if(b.isbn.equals(isbn) && b.isAvailable){
                b.isAvailable = false;
                foundMember.borrowedBooks.add(b);
                System.out.println("Book borrowed.");
                return;
            }
        }

        System.out.println("Book not available.");
    }

    static void returnBook(){
        System.out.print("Enter member ID: ");
        int memberId = input.nextInt();

        System.out.print("Enter book ISBN: ");
        String isbn = input.next();

        for(int i = 0; i < members.size(); i++){
            Member m = (Member)members.get(i);
            if(m.id == memberId){
                for(int j = 0; j < m.borrowedBooks.size(); j++){
                    Book b = (Book)m.borrowedBooks.get(j);
                    if(b.isbn.equals(isbn)){
                        b.isAvailable = true;
                        m.borrowedBooks.remove(b);
                        System.out.println("Book returned.");
                        return;
                    }
                }
            }
        }

        System.out.println("Book not found in member's list.");
    }

    static void listBooks(){
        if(books.size() == 0)
            System.out.println("No books available.");

        for(int i = 0; i < books.size(); i++){
            Book b = (Book)books.get(i);
            System.out.println(b.title + " by " + b.author + " | ISBN: " + b.isbn + " | " + (b.isAvailable ? "Available" : "Borrowed"));
        }
    }

    static void listMembers(){
        if(members.size() == 0){
            System.out.println("No members found.");
        }

        for(int i = 0; i < members.size(); i++){
            Member m = (Member)members.get(i);
            System.out.println("Name: " + m.name + ", ID: " + m.id);
        }
    }
}

class Book {
    public String title; // Violation: Public fields
    public String author;
    public String isbn;
    public boolean isAvailable = true;

    public Book(String title, String author, String isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

    // Violation: Missing toString, equals, hashCode
    // Violation: No validation in constructor
}

class Member {
    public String name;
    public int id;
    public ArrayList borrowedBooks = new ArrayList(); // Violation: Raw type, public

    public Member(String name, int id){
        this.name = name;
        this.id = id;
    }

    // Violation: Missing encapsulation and validation
}
