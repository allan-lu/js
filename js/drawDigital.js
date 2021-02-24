// let c2 = document.getElementById("canvas2")
// let ctx2 = c2.getContext("2d")
// ctx2.font = "400 65px Monaco"
// ctx2.textAlign = "center"

function drawTime() {
    let now = new Date()
    let hour = now.getHours()
    let minute = now.getMinutes()
    let second = now.getSeconds()

    meridiem = hour < 12 ? 'AM' : 'PM'
    hour = hour > 12 ? hour - 12 : hour
    hour = hour < 10 ? '0' + hour : hour
    minute = minute < 10 ? '0' + minute : minute
    second = second < 10 ? '0' + second : second

    let time = `${hour}:${minute}:${second} ${meridiem}`

    // ctx2.fillStyle = "#e0a87b"
    // ctx2.fillRect(0, 0, c2.width, c2.height)
    // ctx2.fillStyle = "black"
    // ctx2.fillText(time, c2.width / 2, c2.height / 1.5)
    document.getElementById("digital").innerHTML = time
}

setInterval(drawTime, 25)