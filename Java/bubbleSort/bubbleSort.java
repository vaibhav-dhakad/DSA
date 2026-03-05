package bubbleSort;

class Main {
  static int[] bblSrt(int[] arr) {
    int n = arr.length;
    boolean swapped;
    for (int i = 0; i < n - 1; i++) {
      swapped = false;
      for (int j = 0; j < n - i - 1; j++) {
          if (arr[j] > arr[j + 1]) {
          int temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          swapped = true; // Swap hua toh true set karo
        }
      }
      // Agar poore inner loop mein ek bhi swap nahi hua, matlab array sort ho gaya!
      if (!swapped)
        break;
    }
    return arr;
  }

  public static void main(String[] args) {
    int[] arr = { 64, 34, 25, 12, 22, 11, 90 };
    int[] sortedArr = bblSrt(arr);
    System.out.println("Sorted array: ");
    for (int i : sortedArr) {
      System.out.print(i + " ");
    }
  }
}