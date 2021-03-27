const myMap = L.map("mapid").setView([39.83, -98.58], 4)
// const myStyle = {
//   color: "#8f8f8f",
//   weight: 2,
//   opacity: 1,
//   fillOpacity: 0.70
// }

const states = L.geoJson()
states.addTo(myMap)

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/outdoors-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoiYWx1MiIsImEiOiJja2x1bTB3a3Mwa2FnMnVwOXV4YmQ4Z2lmIn0.JQCTZKJ7h2arho-Xcv1Oug",
  }
).addTo(myMap)

$.ajax({
  url:"https://eric.clst.org/assets/wiki/uploads/Stuff/gz_2010_us_040_00_500k.json",
  dataType: "json",
  success: response => {
    $(response.features).each(function(key, data) {
      states.addData(data)
    })

    for(i in response.features) {
      state = response.features[i]
      // $(".dropdown-menu").append('<a class="dropdown-item" href="#">'+state.properties["NAME"]+'</a>')
      $(".list-group").append('<a href="#" class="list-group-item list-group-item-action py-1">'+state.properties.NAME+'</a>')
    }
  }
})

// const states = $.ajax({
//   url:"https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json",
//   dataType: "json",
//   responseType: "json"
// })

// $(document).ready(function(){
//   $("#maxbtn").on({
//     click: function(){
//       $(".panel").toggle()
//     },
//     mouseenter: function(){
//       myMap.doubleClickZoom.disable()
//     },
//     mouseleave: function(){
//       myMap.doubleClickZoom.enable()
//     }
//   })
// })