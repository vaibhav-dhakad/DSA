function isPerfectNum(n) {
  let highestDivisor = Math.floor(n / 2);
  let sum = 0;
  for (let i = 1; i <= highestDivisor; i++) {
    console.log("iteratee: ", i, "and ", sum);
    if (n % i === 0) {
      sum += i;
    }
  }
  return sum === n;
}

// Optimized solution
function isPerfect(n) {
  let sum = 1;

  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) {
      if (i * i !== n) sum += i + n / i;
      else sum += i;
    }
  }

  return sum === n && n !== 1;
}

let n = 15;
console.log(isPerfect(n) ? "true" : "false");

let num = 6;
console.log(isPerfectNum(num));
