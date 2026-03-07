function fibonacci(n) {
    let a=0, b=1;
    for (let i = 2; i <= n; i++) {
        let next = a + b;
        a = b;
        b = next;
    }
    return b;
}

function nthFibonacci(n){

    // base case
    if (n <= 1) {
        return n;
    }
    
    // sum of the two preceding 
    // Fibonacci numbers
    return nthFibonacci(n - 1) + nthFibonacci(n - 2);
}

let n = 5;
let result = nthFibonacci(n);
console.log(result);
console.log(fibonacci(5));