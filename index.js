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
  let resBox = document.getElementById("res")
  let radius = document.getElementById("userInput").value

  if (radius === "") {
    resBox.innerHTML = "Result will be shown here"
    return
  }

  let grid = getArr(radius)
  resText = toText(grid)
  resBox.innerHTML = resText

  return false;
}

function getArr(radius) {
  let diameter = 2 * radius
  let width = (diameter % 2 == 0 ? diameter + 1 : diameter + 2)
  let midGridIndex = (width / 2) + 0.5
  let yArr = []

  for (let y = 0; y <= width; y++) {
    let xArr = []

    for (let x = 0; x <= width; x++) {
      if (x === 0) {
        xArr.push(0)
      } else if (y === 0) {
        xArr.push(0)
      } else {
        let offsetX = Math.abs(x - midGridIndex)
        let offsetY = Math.abs(y - midGridIndex)
        let dist = Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2))


        var test = document.getElementById("smoothedCheck").checked
          ? x !== 1 && x !== width && y !== 1 && y !== width
          : true

        if (test && dist <= radius) {
          xArr.push(true)
        } else {
          xArr.push(false)
        }
      }
    }
    yArr.push(xArr)
  }
  return yArr
}

function toText(grid) {
  let res = ""

  grid.forEach((y, yIdx) => {
    y.forEach((x, xIdx) => {

      if (typeof (x) === typeof (0)) {
        // Coordinates

        if (yIdx === 0) {
          // X-Axis
          res += xIdx < 10 ? " " + xIdx : xIdx
        } else if (xIdx === 0) {
          // Y-Axis
          res += yIdx < 10 ? " " + yIdx : yIdx
        }

      } else {
        if (x) {
          res += "\u2588\u2588"
        } else {
          res += "\u2591\u2591"
        }
      }
    })
    res += "\n"
  })
  return res;
}