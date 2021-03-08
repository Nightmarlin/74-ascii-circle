/**
 * © Nightmarlin 2020
 *
 * 1) Get radius from input
 * 2) Determine circle
 *   - Set up an array of 2r + 3
 *   - If a point is within r of the centrepoint, mark it as valid
 *    > sqrt(x^2 + y^2) <= r ? valid : nval
 * 3) Print circle
 */

function getAscii() {
  const resBox = document.getElementById("res");
  const radius = document.getElementById("userInput").value;

  if (radius === "") {
    resBox.innerHTML = "Result will be shown here";
    return;
  }

  const grid = getArr(radius);
  resText = toText(grid);
  resBox.innerHTML = resText;

  return false;
}

/**
 * @param {number} radius the radius of the circle to draw
 * @returns {(number | boolean)[]} an array with a circle filled. The left and upper edges will be padded with 0s
 */
function getArr(radius) {
  const diameter = 2 * radius;
  const width = diameter % 2 === 0 ? diameter + 1 : diameter + 2;
  const midGridIndex = width / 2 + 0.5;
  const yArr = [];

  for (let y = 0; y <= width; y++) {
    const xArr = [];

    for (let x = 0; x <= width; x++) {
      if (x === 0 || y === 0) {
        xArr.push(0);
        continue;
      }

      const offsetX = Math.abs(x - midGridIndex);
      const offsetY = Math.abs(y - midGridIndex);
      const dist = Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2));

      const smoothed = document.getElementById("smoothedCheck").checked
        ? x !== 1 && x !== width && y !== 1 && y !== width
        : true;

      if (smoothed && dist <= radius) {
        xArr.push(true);
      } else {
        xArr.push(false);
      }
    }
    yArr.push(xArr);
  }

  return yArr;
}

function toText(grid) {
  let res = "";

  grid.forEach((y, yIdx) => {
    y.forEach((x, xIdx) => {
      // Print Coordinates if x is a number
      if (typeof x === "number") {
        if (yIdx === 0) {
          // X-Axis
          res += xIdx < 10 ? " " + xIdx : xIdx;
        } else if (xIdx === 0) {
          // Y-Axis
          res += yIdx < 10 ? " " + yIdx : yIdx;
        }
      } else {
        if (x) {
          res += "\u2588\u2588";
        } else {
          res += "\u2591\u2591";
        }
      }
    });
    res += "\n";
  });

  return res;
}
