package LibraryManagementSystem.src.util;

import LibraryManagementSystem.src.model.Book;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class FileManager {
    public static List<Book> loadBooks(String filePath) {
        List<Book> books = new ArrayList<>();
        File file = new File(filePath);

        if (!file.exists()) {
            return books;
        }

        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = reader.readLine()) != null) {
                books.add(Book.fromFileString(line));
            }
        } catch (IOException e) {
            System.out.println("Error loading books: " + e.getMessage());
        }
        return books;
    }

    public static void saveBooks(List<Book> books, String filePath) {
        try (PrintWriter writer = new PrintWriter(new FileWriter(filePath))) {
            for (Book book : books) {
                writer.println(book.toFileString());
            }
        } catch (IOException e) {
            System.out.println("Error saving books: " + e.getMessage());
        }
    }
}
