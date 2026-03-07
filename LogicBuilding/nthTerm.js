// Find n-th term of series 1, 3, 6, 10, 15, 21...

function nthTerm(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}
console.log(nthTerm(5));

// We can use the formula n(n+1)/2 which is more optimal solution