package closestDivisible;
class Main {
    static int closestNumber(int n, int m) {
        // find the quotient
        int closest = 0;
        int minDifference = Integer.MAX_VALUE;

        // Check numbers around n
        for (int i = n - Math.abs(m); i <= n + Math.abs(m); ++i) {
            if (i % m == 0) {
                int difference = Math.abs(n - i);

                if (difference < minDifference || 
                   (difference == minDifference && Math.abs(i) > Math.abs(closest))) {
                    closest = i;
                    minDifference = difference;
                }
            }
        }
        return closest;
    }

    public static void main(String[] args) {
        int n = 13, m = 4;
        System.out.println(closestNumber(n, m));
    }
}