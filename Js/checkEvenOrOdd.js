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
  console.time("MODULO");
  if (checkEvenOrOddWithModulo(num)) {
    console.log("Modulo Approach: " + num + " is Even");
  } else {
    console.log("Modulo Approach " + num + " is odd");
  }
  console.timeEnd("MODULO");

  console.time("BITWISE");

  if (checkEverOrOddWithBitwise(num)) {
    console.log("Bitwise Approach: Number" + num + " is Even");
  } else {
    console.log("Bitwise Approach " + num + " is odd");
  }
  console.timeEnd("BITWISE");
}

checkNUm(1901222222222222222222222222222222222222);
checkNUm(1283432921111111111111111111111111111111111111111111111111111111111111111111112);
