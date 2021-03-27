const mymap = L.map("mapid").setView([40.73, -73.95], 12)

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoiYWx1MiIsImEiOiJja2x1bTB3a3Mwa2FnMnVwOXV4YmQ4Z2lmIn0.JQCTZKJ7h2arho-Xcv1Oug",
  }
).addTo(mymap)

document.getElementById("leftBtn").addEventListener("click", () => {
  panelDisplay("leftPanel")
  buttonColor("leftPanel", "leftBtn")
})
document.getElementById("rightBtn").addEventListener("click", () => {
  panelDisplay("rightPanel")
  buttonColor("rightPanel", "rightBtn")
})
document.getElementById("bothBtn").addEventListener("click", () => {
  bothButton("bothBtn")
})

function hidePanel(panel) {
  document.getElementById(panel).style.display = "none"
}

function showPanel(panel) {
  document.getElementById(panel).style.display = "block"
}

function panelDisplay(panel) {
  const displayType = document.getElementById(panel).style.display
  displayType === "none" ? showPanel(panel) : hidePanel(panel)
}

function buttonColor(panel, button) {
  const displayType = document.getElementById(panel).style.display
  if (displayType === "none") {
    document.getElementById(button).style.color = "red"
    document.getElementById(button).style.borderColor = "red"
  } else {
    document.getElementById(button).style.color = "green"
    document.getElementById(button).style.borderColor = "green"
  }
}

function bothButton(button) {
  const bothColor = document.getElementById(button).style.borderColor
  if (bothColor === "red") {
    showPanel("leftPanel")
    showPanel("rightPanel")
    buttonColor("leftPanel", "leftBtn")
    buttonColor("rightPanel", "rightBtn")
    document.getElementById(button).style.color = "green"
    document.getElementById(button).style.borderColor = "green"
  } else {
    hidePanel("leftPanel")
    hidePanel("rightPanel")
    buttonColor("leftPanel", "leftBtn")
    buttonColor("rightPanel", "rightBtn")
    document.getElementById(button).style.color = "red"
    document.getElementById(button).style.borderColor = "red"
  }
}