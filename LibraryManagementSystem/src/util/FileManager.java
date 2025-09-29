package LibraryManagementSystem.src.util;

import LibraryManagementSystem.src.model.Book;

import java.io.*;
import java.nio.file.*;
import java.util.ArrayList;
import java.util.List;

public class FileManager {

    private static final Path BASE_DIR = Paths.get("data").toAbsolutePath().normalize();

    private static Path resolveSafePath(String filePath) throws SecurityException {
        Path resolvedPath = BASE_DIR.resolve(filePath).normalize();

        if (!resolvedPath.startsWith(BASE_DIR)) {
            throw new SecurityException("Invalid file path: Path traversal attempt detected.");
        }

        return resolvedPath;
    }

    public static List<Book> loadBooks(String filePath) {
        List<Book> books = new ArrayList<>();

        try {
            Path safePath = resolveSafePath(filePath);

            if (!Files.exists(safePath)) {
                return books;
            }

            try (BufferedReader reader = Files.newBufferedReader(safePath)) {
                String line;
                while ((line = reader.readLine()) != null) {
                    books.add(Book.fromFileString(line));
                }
            }
        } catch (IOException | SecurityException e) {
            System.out.println("Error loading books: " + e.getMessage());
        }

        return books;
    }

    public static void saveBooks(List<Book> books, String filePath) {
        try {
            Path safePath = resolveSafePath(filePath);

            // Ensure the parent directory exists
            Files.createDirectories(safePath.getParent());

            try (BufferedWriter writer = Files.newBufferedWriter(safePath)) {
                for (Book book : books) {
                    writer.write(book.toFileString());
                    writer.newLine();
                }
            }
        } catch (IOException | SecurityException e) {
            System.out.println("Error saving books: " + e.getMessage());
        }
    }
}
