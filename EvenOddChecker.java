import java.util.Scanner;

public class EvenOddChecker {

    public static void main(String[] args) {
        try (Scanner scanner = new Scanner(System.in)) {
            System.out.print("Enter an integer: ");
            
            if (scanner.hasNextInt()) {
                int number = scanner.nextInt();
                String result = checkEvenOdd(number);
                System.out.printf("The number %d is %s.%n", number, result);
            } else {
                System.out.println("Invalid input. Please enter a valid integer.");
            }
        }
    }

    private static String checkEvenOdd(int number) {
        return (number % 2 == 0) ? "even" : "odd";
    }
}
