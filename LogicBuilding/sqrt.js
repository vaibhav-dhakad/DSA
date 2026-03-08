function floorSqrt(n) {
  let lo = 1,
    hi = n;
  let res = 1;

  while (lo <= hi) {
    let mid = lo + Math.floor((hi - lo) / 2);

    if (mid * mid <= n) {
      res = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  return res;
}

let n = 11;
console.log(floorSqrt(n));
