// Function to find gcd of a and b
function gcd(n1, n2) {
    if (n1 === 0)
        return n2;
    return gcd(n2 % n1, n1);
}

// Function to add two fractions
function addFraction(a, b) {
    let ans = []; 
    // Finding gcd of den1 and den2
    let den = gcd(a[1], b[1]);

    // Denominator of final fraction obtained
    // finding LCM of den1 and den2
    // LCM * GCD = a * b 
    den = (a[1] * b[1]) / den;

    // Changing the fractions to have same denominator
    // Numerator of the final fraction obtained
    let num = (a[0]) * (den / a[1]) + (b[0]) * (den / b[1]);

    // finding the common factor of numerator and denominator
    let common_factor = gcd(num, den);

    // Converting the result into simpler 
    // fraction by dividing them with common factor 
    den = den / common_factor;
    num = num / common_factor;
    ans.push(num); 
    ans.push(den); 
    return ans;
}

let a = [1, 2];
let b = [3, 2];
let ans = addFraction(a, b); 
console.log(ans[0] + ", " + ans[1]);