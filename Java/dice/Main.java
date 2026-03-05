package Java.dice;

public class Main {
  static int oppositeFace(int n ) {
    int sumOfTwoFaces = 7;
    return sumOfTwoFaces - n;
  }
  public static void main(String[] args ) {
    System.out.println("Opposite face is" + oppositeFace(2));
  }
}
