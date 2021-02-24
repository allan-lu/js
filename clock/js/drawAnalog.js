let c1 = document.getElementById("canvas1")
let ctx1 = c1.getContext("2d")
let radius = c1.height / 2

ctx1.translate(radius, radius)
radius = radius * 0.90

// draw the clock at certain intervals (1000 milliseconds)
setInterval(drawClock, 25)

function drawClock() {
    drawFace(ctx1, radius)
    drawTicks(ctx1, radius)
    drawNumbers(ctx1, radius)

    drawDate(ctx1, radius)
    drawTime(ctx1, radius)
}

function drawFace(ctx1, radius) {
    let grad

    // draw white circle
    ctx1.beginPath()
    ctx1.arc(0, 0, radius, 0, 2 * Math.PI)
    ctx1.fillStyle = "white"
    ctx1.fill()

    // create radial gradient 95% and 105% of original clock radius
    grad = ctx1.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05)
    // create 3 color stops for inner, middle and outer edge of arc
    // color stops create a 3D effect
    grad.addColorStop(0, '#333')
    grad.addColorStop(0.5, '#7698e8')
    grad.addColorStop(1, '#333')
    // define the gradient as the stroke style of the drawing object
    ctx1.strokeStyle = grad
    // define the line width of the drawing object 10% of radius
    ctx1.lineWidth = radius * 0.1
    ctx1.stroke()

    // draw the clock center
    ctx1.beginPath()
    ctx1.arc(0, 0, radius * 0.1, 0, 2 * Math.PI)
    ctx1.fillStyle = '#333'
    ctx1.fill()
}

function drawNumbers(ctx1, radius) {
    let ang
    let num

    // set font size to 15% of the radius
    ctx1.font = "bold " + radius * 0.18 + "px Arial"
    // set text algnment to the middle and center of the print position
    ctx1.textBaseline = "middle"
    ctx1.textAlign = "center"

    // calculate the print position for 12 numbers to 85% of the radius
    // rotated PI/6 for each number
    for (num = 1; num < 13; num++) {
        ang = num * Math.PI / 6

        ctx1.rotate(ang)
        ctx1.translate(0, -radius * 0.80)
        ctx1.rotate(-ang)
        ctx1.fillText(num.toString(), 0, 0)
        ctx1.rotate(ang)
        ctx1.translate(0, radius * 0.80)
        ctx1.rotate(-ang)
    }
}

function drawTime(ctx1, radius) {
    // use Date to get hour, minute and second
    let now = new Date()
    let hour = now.getHours()
    let minute = now.getMinutes()
    let second = now.getSeconds()
    let millisecond = now.getMilliseconds()
    let magnitude

    // HOUR
    // calculate the angle of the hour hand
    // draw it a length (50% of radius) and width (7% of radius)
    magnitude = "hour"
    hour = hour % 12;
    hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60))
    drawHand(ctx1, magnitude, hour, radius * 0.5, radius * 0.07)

    // MINUTE
    magnitude = "minute"
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60))
    drawHand(ctx1, magnitude, minute, radius * 0.8, radius * 0.07)

    // SECOND
    magnitude = "second"
    // second = (second * Math.PI / 30)
    // drawHand(ctx1, magnitude, second, radius * 0.9, radius * 0.02)

    // no ticking
    second = (second * Math.PI / 30) + (((millisecond / 1000) * Math.PI) / 30)
    drawHand(ctx1, magnitude, second, radius * 0.9, radius * 0.02)
}

function drawHand(ctx1, mag, pos, length, width) {
    let col = (mag == "second") ? "#34a4eb" : "#063169"
    ctx1.beginPath()
    ctx1.strokeStyle = col
    ctx1.lineWidth = width
    ctx1.lineCap = "round"
    ctx1.moveTo(0, 0)
    ctx1.rotate(pos)
    ctx1.lineTo(0, -length)
    ctx1.stroke()
    ctx1.rotate(-pos)
}

function drawTicks(ctx1, radius) {
    ctx1.strokeStyle = "#6b6b6b"
    ctx1.lineWidth = 4

    for (num = 1; num < 61; num++) {
        ctx1.beginPath()
        ctx1.moveTo(0, radius * 0.94)
        ctx1.lineTo(0, radius * 0.93)
        ctx1.stroke()
        ctx1.rotate(Math.PI / 30)
    }

    for (num = 1; num < 13; num++) {
        ctx1.beginPath()
        ctx1.moveTo(0, radius * 0.94)
        ctx1.lineTo(0, radius * 0.90)
        ctx1.stroke()
        ctx1.rotate(Math.PI / 6)
    }
}

function drawDate(ctx1, radius) {
    let date = new Date()
    let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    ctx1.beginPath()
    ctx1.strokeStyle = "#063169"
    ctx1.lineWidth = "1"
    ctx1.fillStyle = "#063169"
    ctx1.rect(radius * 0.20, -(radius * 0.08), radius * 0.30, radius * 0.14)
    ctx1.fillRect(radius * 0.20, -(radius * 0.08), radius * 0.30, radius * 0.14)
    ctx1.stroke()

    ctx1.font = "bold " + radius * 0.12 + "px Arial"
    ctx1.textAlign = "left"
    ctx1.fillStyle = "white"
    ctx1.fillText(weekday[date.getDay()], radius * 0.22, 0)

    ctx1.beginPath()
    ctx1.lineWidth = "1"
    ctx1.rect(radius * 0.50, -(radius * 0.08), radius * 0.17, radius * 0.14)
    ctx1.stroke()

    ctx1.font = "bold " + radius * 0.12 + "px Arial"
    ctx1.textAlign = "left"
    ctx1.fillStyle = "#178a67"
    ctx1.fillText(date.getDate(), radius * 0.51, 0)
}