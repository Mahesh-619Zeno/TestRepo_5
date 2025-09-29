package LibraryManagementSystem.src.service;

import LibraryManagementSystem.src.model.Book;
import LibraryManagementSystem.src.util.FileManager;

import java.util.List;

public class Library {
    private List<Book> books;
    private String filePath;

    public Library(String filePath) {
    if (filePath == null || filePath.contains("..")) {
        throw new IllegalArgumentException("Invalid file path provided. Path traversal is not allowed.");
    }
    this.filePath = filePath;
    this.books = FileManager.loadBooks(filePath);
  }

    public void addBook(Book book) {
        books.add(book);
        FileManager.saveBooks(books, filePath);
        System.out.println("Book added.");
    }

    public void listBooks() {
        if (books.isEmpty()) {
            System.out.println("No books available.");
        } else {
            books.forEach(System.out::println);
        }
    }

    public void searchBook(String title) {
        boolean found = false;
        for (Book book : books) {
            if (book.getTitle().equalsIgnoreCase(title)) {
                System.out.println("Found: " + book);
                found = true;
            }
        }
        if (!found) {
            System.out.println("Book not found.");
        }
    }
}
