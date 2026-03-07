// function for HCF
/*
========================
HCF(a, b) * LCM (a, b) = a * b
========================
*/
function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

function lcm(a, b) {
    return (a / gcd(a, b)) * b;
}

let a = 10, b = 5;
console.log(lcm(a, b));