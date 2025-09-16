import java.util.Scanner;

public class EvenOddChecker {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter an integer: ");
        if (scanner.hasNextInt()) {
            int enteredInteger = scanner.nextInt();
            String evenOddStatus = (enteredInteger % 2 == 0) ? "even" : "odd";
            System.out.printf("The number %d is %s.%n", enteredInteger, evenOddStatus);
        } else {
            System.out.println("Invalid input. Please enter a valid integer.");
        }

        scanner.close();
    }
}
