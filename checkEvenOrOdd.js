function checkEvenOrOddWithModulo(num) {
  if (num % 2 == 0) {
    return true;
  } else {
    return false;
  }
}

function checkEverOrOddWithBitwise(num) {
  if ((num & 1) == 0) {
    return true;
  } else {
    return false;
  }
}

function checkNUm(num) {
  if (checkEvenOrOddWithModulo(num)) {
    console.log("Modulo Approach: " + num + " is Even");
  } else {
    console.log("Modulo Approach " + num + " is odd");
  }
  if (checkEverOrOddWithBitwise(num)) {
    console.log("Bitwise Approach: Number" + num + " is Even");
  } else {
    console.log("Bitwise Approach " + num + " is odd");
  }
}

checkNUm(19);
checkNUm(128343292);
