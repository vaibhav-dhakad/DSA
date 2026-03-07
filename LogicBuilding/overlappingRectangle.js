class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

// Returns true if two rectangles (l1, r1) and (l2, r2) overlap
function doOverlap(l1, r1, l2, r2) {
    // If one rectangle is to the left of the other
    if (l1.x > r2.x || l2.x > r1.x)
        return false;

    // If one rectangle is above the other
    if (r1.y > l2.y || r2.y > l1.y)
        return false;

    return true;
}

// Driver code
const l1 = new Point(0, 10);
const r1 = new Point(10, 0);
const l2 = new Point(5, 5);
const r2 = new Point(15, 0);

if (doOverlap(l1, r1, l2, r2)) {
    console.log("Rectangles Overlap");
} else {
    console.log("Rectangles Don't Overlap");
}