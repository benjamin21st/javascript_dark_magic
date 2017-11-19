class Rectangle {
  constructor(x, y, height, width) {
    this.x = x, this.y = y, this.height = height, this.width = width;
  }
}

/**
 * Take two rectangles, return their intersected rectangle
 * or null
 * Assuming x, y are all going to be positive, like on a
 * web page, not in actual mathematics axis
 */
function rectangleIntersection(rect1, rect2) {
  if (hasIntersection(rect1, rect2)) {
    return getIntersection(rect1, rect2);
  }
  return null;
}

// because we calculate intersection, so no matter which
// one is bigger/smaller, we can use this following check
function hasIntersection(rect1, rect2) {
  let xIntersect = rect1.x + rect1.width >= rect2.x &&
                    rect1.x <= rect2.x + rect2.width;
  let yIntersect = rect1.y + rect1.height >= rect2.y &&
                    rect1.y <= rect2.y + rect2.height;
  return xIntersect || yIntersect;
}

function getIntersection(rect1, rect2) {
  let x = Math.max(rect1.x, rect2.x);
  let y = Math.max(rect1.y, rect2.y);
  let width = Math.min(rect1.x + rect1.width - x,
                       rect2.x + rect2.width - x);
  let height = Math.min(rect1.y + rect1.height - y,
                        rect2.y + rect2.height - y);

  return new Rectangle(x, y, width, height);
}

console.log('Run: testRectangleIntersection(rect1, rect2)');
function testRectangleIntersection(rect1, rect2) {
  if (!rect1 || !rect2) {
    rect1 = new Rectangle(0, 0, 2, 2);
    rect2 = new Rectangle(1, 1, 2, 2);
  }
  console.log('Intersection: ', rectangleIntersection(rect1, rect2));
}
