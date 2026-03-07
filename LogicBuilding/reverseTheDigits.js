function reverseDigits(n) {
  let reversed = 0;
  let digits = 10;
  while (n !== 0) {
    let lastDigit = n % 10;
    n = Math.floor(n / 10);
    reversed = reversed * digits + lastDigit;

  }
  return reversed;
}

console.log("Reversed Number is ", reverseDigits(192831));
