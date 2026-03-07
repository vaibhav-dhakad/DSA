function HCF(a, b) {
    let min = Math.min(a, b);

    for (let i = min; i >= 1; i--) {
        if (a % i === 0 && b % i === 0) {
            return i;
        }
    }
}
// Recursive function to calculate GCD using Euclidean algorithm
function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

let a = 20, b = 28;
console.log(gcd(a, b));
console.log(HCF(a, b));
