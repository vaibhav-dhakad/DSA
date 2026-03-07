// Function to calculate x raised 
// to the power y 
function power(x, y) {
    if (y === 0)
        return 1;
    if (y % 2 === 0)
        return power(x, Math.floor(y / 2)) * power(x, Math.floor(y / 2));
    return x * power(x, Math.floor(y / 2)) * power(x, Math.floor(y / 2));
}

// Function to count number of digits in n
function order(n) {
    let t = 0;
    while (n !== 0) {
        t++;
        n = Math.floor(n / 10);
    }
    return t;
}

// Function to check whether the given 
// number is Armstrong number or not
function armstrong(n) {
    
    // Calling order function
    let x = order(n);
    let temp = n, sum = 0;
    while (temp !== 0) {
        let r = temp % 10;
        sum += power(r, x);
        temp = Math.floor(temp / 10);
    }

    return sum === n;
}

let n = 153;
if (armstrong(n)) {
    console.log("true");
} else {
    console.log("false");
}