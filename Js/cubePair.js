function countPairs(n) {
  let count = 0;

  for (let i = 1; i <= parseInt(Math.pow(n, 1.0 / 3.0), 10); i++) {
    let cb = i * i * i;

    let diff = n - cb;

    let cbrtDiff = parseInt(Math.pow(diff, 1.0 / 3.0), 10);

    if (cbrtDiff * cbrtDiff * cbrtDiff == diff) count++;
  }

  return count;
}

const n = 9;
console.log(countPairs(n));
