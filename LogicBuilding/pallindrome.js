function isPalindrome(n) {
  // Convert the absolute value
  // of number to string
  let s = Math.abs(n).toString();
  let len = s.length;

  for (let i = 0; i < len / 2; i++) {
    // Comparing i th character from starting
    //  and len-i th character from end
    if (s[i] !== s[len - i - 1]) return false;
  }
  return true;
}
``
// Driver Code
let num = 12321;
if (isPalindrome(num) === true) {
  console.log("True");
} else {
  console.log("False");
}

function isPalindrome(n) {
  let reverse = 0;

  // Copy of the original number so that the original
  // number remains unchanged while finding the reverse
  let temp = Math.abs(n);
  while (temp != 0) {
    reverse = reverse * 10 + (temp % 10);
    temp = Math.floor(temp / 10);
  }

  // If reverse is equal to the original number, the
  // number is palindrome
  return reverse === Math.abs(n);
}

// Driver Code
let n = 12321;
if (isPalindrome(n) === true) {
  console.log("True");
} else {
  console.log("False");
}
