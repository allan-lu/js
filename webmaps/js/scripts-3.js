const myMap = L.map("mapid").setView([40.73, -73.95], 12)
// Polygon layer styling
const myStyle = {
  color: "#7eba49",
  weight: 2,
  opacity: 1,
  fillOpacity: 0.7,
}

// Leaflet map
L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/light-v10",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoiYWx1MiIsImEiOiJja2x1bTB3a3Mwa2FnMnVwOXV4YmQ4Z2lmIn0.JQCTZKJ7h2arho-Xcv1Oug",
  }
).addTo(myMap)

$.getJSON(
  "https://raw.githubusercontent.com/allan-lu/js/main/data/nyc-sewers-wgs84.geojson",
  (data) => {
    // Add GeoJSON layer to Leaflet map
    L.geoJSON(data, { style: myStyle }).addTo(myMap)

    // Sort the polygons by the neighborhood name in ascending order
    data.features.sort((a, b) => {
      const i = a.properties.neighborhood
      const j = b.properties.neighborhood
      return i < j ? -1 : 1
    })

    for (const i in data.features) {
      const nta = data.features[i]
      const neighborhood = nta.properties.neighborhood
      // Add neighborhood names to left side panel
      $("#nbhd-container").append(
        $("<a>")
          .addClass(["list-group-item", "list-group-item-action", "py-1"])
          .text(neighborhood)
          .prop("id", nta.properties.gid)
          .data("properties", nta.properties)
      )
    }

    // Add events to the list items in the leftside panel
    $("#nbhd-container")
      .children(".list-group-item")
      .on({
        // Change cursor to pointer when hovering over list items
        mouseenter: (e) => {
          $(e.currentTarget).css("cursor", "pointer")
        },
        // Display neighborhood attributes on rightside panel when element is clicked
        click: (e) => {
          const property = $(e.currentTarget).data("properties")
          const borough = addBorough(property.geoid)

          // Highlight the selected neighborhood on the leftside
          // Must reset the background color before highlighting a new one
          $(".list-group-item").css("background-color", "")
          $(e.currentTarget).css("background-color", "rgba(126, 186, 73, 0.3)")

          // Clear the attribute container before every click
          $("#attr-container").empty()
          // Using a for-in loop create html elements for each attribute
          for (const key in property) {
            let value = property[key]

            // Rename the variable names to provide clearer information
            switch (key) {
              case "geoid":
                attribute = "Neighorhood Tabulation Area (NTA) Code"
                break
              case "gi_count":
                attribute = "Number of Green Infrastructures"
                break
              case "gi_area":
                attribute = "Combined Green Infrastructure Area"
                break
              case "pervious_pct":
                attribute = "Percent Area of Pervious Land"
                break
              case "impervious_pct":
                attribute = "Percent Area of Impervious Land"
                break
              case "sewer_311_calls":
                attribute = "311 Calls in 2019 Related to Sewer/Sewage"
                break
              case "csa_pct":
                attribute = "Percent Area With Combined Sewer System"
                break
              case "area":
                attribute = "NTA Area"
                value = Math.round(value) + " sqft"
                break
              default:
                attribute = capitalize(key)
            }

            // Create the attribute list items with a heading and paragraph elements
            // Do not display unnecessary variables (_uid_ & gid)
            if (!["_uid_", "gid"].includes(key)) {
              // Create an id for each list item using the variable names
              const id = "attr-" + key.split("_").join("-")

              $("#attr-container").append(
                // Create list item element
                $("<li>")
                  .prop("id", id)
                  .addClass(["list-group-item", "p-0"])
                  .append(
                    // Create header element
                    $("<h6>")
                      .addClass(["m-0"])
                      .css("background-color", "rgba(126, 186, 73, 0.3)")
                      .text(attribute),
                    // Create paragraph element
                    $("<p>").addClass(["mb-1"]).text(value)
                  )
              )
            }
          }

          // Move the neighborhood list item to the top of the list
          $("#attr-neighborhood").remove().insertBefore($("#attr-geoid"))

          // Add borough attribute to list
          $("#attr-neighborhood").after(
            $("<li>")
              .prop("id", "attr-borough")
              .addClass(["list-group-item", "p-0"])
              .append(
                $("<h6>")
                  .addClass(["m-0"])
                  .css("background-color", "rgba(126, 186, 73, 0.3)")
                  .text("Borough"),
                // Create paragraph element
                $("<p>").addClass(["mb-1"]).text(borough)
              )
          )
        },
      })
  }
)

$(document).ready(() => {
  // Maximize button functionalities
  $("#maxbtn").on({
    click: (e) => {
      // Display and hide all divs except for the map container
      $(".panel, .header, .footer").toggle()
      // Change button text and color based on functionality
      $(e.currentTarget)
        .text(
          $(e.currentTarget).text() === "Minimize" ? "Maximize" : "Minimize"
        )
        .toggleClass("btn-outline-secondary btn-secondary")
      // Prevents map from not loading tiles when resizing
      myMap.invalidateSize()
    },
    mouseenter: (e) => {
      myMap.doubleClickZoom.disable()
      $(e.currentTarget).toggleClass("btn-outline-info")
    },
    mouseleave: (e) => {
      myMap.doubleClickZoom.enable()
      $(e.currentTarget).toggleClass("btn-outline-info")
    },
  })
})

// Function to capitalize the first letter of each word in a string
const capitalize = (s) => {
  return s
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.substring(1))
    .join(" ")
}

const addBorough = (ntaCode) => {
  switch (ntaCode.substring(0, 2)) {
    case "BK":
      return "Brooklyn"
    case "BX":
      return "Bronx"
    case "MN":
      return "Manhattan"
    case "QN":
      return "Queens"
    case "SI":
      return "Staten Island"
    default:
      return ""
  }
}
