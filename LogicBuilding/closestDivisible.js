function closestNumber(n, m) {

    let q = parseInt(n / m);
    
    let n1 = m * q;
    
    let n2 = (n * m) > 0 ?
        (m * (q + 1)) : (m * (q - 1));
    
    if (Math.abs(n - n1) < Math.abs(n - n2))
        return n1;
    
    return n2;
}

// Driver Code
let n = 13;
let m = 4;
console.log(closestNumber(n, m));