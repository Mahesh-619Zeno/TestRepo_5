package LibraryManagementSystem.src.model;

public class Book {
    private String title;
    private String author;

    public Book(String title, String author) {
        this.title = title.trim();
        this.author = author.trim();
    }

    public String getTitle() {
        return title;
    }

    public String getAuthor() {
        return author;
    }

    public String toFileString() {
        return title + ";" + author;
    }

    public static Book fromFileString(String line) {
        String[] parts = line.split(";", -1);
        if (parts.length < 2 || parts[0].trim().isEmpty() || parts[1].trim().isEmpty()) {
            throw new IllegalArgumentException("Invalid book data format: " + line);
        }
        return new Book(parts[0], parts[1]);
    }

    @Override
    public String toString() {
        return "\"" + title + "\" by " + author;
    }
}
