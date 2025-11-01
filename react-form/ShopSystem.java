import java.util.ArrayList;
import java.util.Scanner;
import java.util.Random; // Violation: Unused import

public class ShopSystem {

    static ArrayList<Product> products = new ArrayList<>();
    static ArrayList<Product> cart = new ArrayList<>();
    static Scanner sc = new Scanner(System.in);
    static int userId = 12345; // Violation: Hardcoded user ID

    public static void main(String[] args) {
        populateProducts();

        while (true) {
            System.out.println("\n==== ONLINE SHOP ====");
            System.out.println("1. View Products");
            System.out.println("2. Add to Cart");
            System.out.println("3. View Cart");
            System.out.println("4. Checkout");
            System.out.println("5. Exit");

            System.out.print("Choose an option: ");
            int option = sc.nextInt(); // Violation: No input validation

            if (option == 1) {
                showProducts();
            } else if (option == 2) {
                addToCart();
            } else if (option == 3) {
                viewCart();
            } else if (option == 4) {
                checkout();
            } else if (option == 5) {
                break;
            } else {
                System.out.println("Invalid option.");
            }
        }

        sc.close();
    }

    static void populateProducts() {
        products.add(new Product(1, "Laptop", 750.00));
        products.add(new Product(2, "Smartphone", 500.00));
        products.add(new Product(3, "Headphones", 80.00));
        products.add(new Product(4, "Keyboard", 30.00));
        products.add(new Product(5, "Mouse", 25.00));
    }

    static void showProducts() {
        System.out.println("\nAvailable Products:");
        for (Product p : products) {
            System.out.println("ID: " + p.id + ", Name: " + p.name + ", Price: $" + p.price);
        }
    }

    static void addToCart() {
        System.out.print("Enter product ID to add: ");
        int pid = sc.nextInt(); // Violation: No bounds checking

        for (Product p : products) {
            if (p.id == pid) {
                cart.add(p);
                System.out.println(p.name + " added to cart.");
                return;
            }
        }
        System.out.println("Product not found."); // Violation: No retry logic
    }

    static void viewCart() {
        if (cart.size() == 0) {
            System.out.println("Cart is empty.");
        } else {
            System.out.println("\nYour Cart:");
            for (Product p : cart) {
                System.out.println(p.name + " - $" + p.price);
            }
        }
    }

    static void checkout() {
        double total = 0;
        for (Product p : cart) {
            total += p.price;
        }

        System.out.println("Total amount: $" + total);
        System.out.println("Payment successful!"); // Violation: Fake success, no real logic
        cart.clear();
    }
}

class Product {
    public int id;       // Violation: Should be private
    public String name;  // Violation: Should be private
    public double price; // Violation: Should be private

    int discount = 0; // Violation: Unused field

    public Product(int id, String name, double price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    // Violation: Missing toString(), getters/setters, validation
}
