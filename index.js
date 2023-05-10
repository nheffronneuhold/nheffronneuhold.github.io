var map;
var approvedAirports;
var ringDistances = {
  A330P: {
    Adequate: 408,
    Alternate: 1200

  },
  A330F: {
    Adequate: 405,
    Alternate: 1183

  },
  A321: {
    Adequate: 400,
    Alternate: 1168
  },
  B787: {
    Adequate: 410,
    Alternate: 1207
  }
};
var mapShapes = [];


function initMap() {
  // Create the map.
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: { lat: 28.43436280891402, lng: -138.30065838542495 },
    mapTypeId: "terrain",
  });

  let infoWindow = new google.maps.InfoWindow({
    content: "Click the map to get Lat/Lng!",
    position: { lat: 28.43436280891402, lng: -138.30065838542495 },
  });

   map.addListener("click", (mapsMouseEvent) => {
    infoWindow.close();

    // Create a new InfoWindow.
    infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng,
    });
    infoWindow.setContent(
      mapsMouseEvent.latLng.lat().toFixed(5) + ", " + mapsMouseEvent.latLng.lng().toFixed(5)
    );
    infoWindow.open(map);
  });

}

$("#adequateCheckbox").click(function(){
  for (var i = 5 - 1; i >= 0; i--) {
    if(this.checked){
      $("#adequate" + i).attr("disabled", true)
    } else {
      $("#adequate" + i).removeAttr("disabled");
    }
    
  }
});

$("#submitBtn").click(function(){
  clearShapes();
  drawAlternateAirportRings();
  drawAdequateAirportRings();
});

function clearShapes(){
  $.each(mapShapes, function(index, workingShape){
    workingShape.setMap(null);
  });
  mapShapes = [];
}

function findAircraft(){
  return ringDistances[$("#aircraftSelect").val()];
}
function drawAlternateAirportRings(){

  var currentAircraft = findAircraft();
  for (var i = 5 - 1; i >= 0; i--) {
    var currentValue = $("#alternate" + i).val();
    var currentAirport = approvedAirports.find(a => a.icao === currentValue)

    if(currentAirport){
      const alternateCircle = new google.maps.Circle({
        strokeColor: "#ebe309",
        strokeOpacity: 0.9,
        strokeWeight: 2,
        fillColor: "#ebe534",
        fillOpacity: 0.45,
        map,
        center: { lat: currentAirport.latitude.decimal, lng: currentAirport.longitude.decimal },
        radius: currentAircraft.Alternate * 1852,
        clickable: false
      });
      mapShapes.push(alternateCircle);
    }
  }
}  

function drawAdequateAirportRings(){

  var currentAircraft = findAircraft();
  var currentAirports = approvedAirports;

  if(!$("#adequateCheckbox").is(':checked')){
    currentAirports = [];
    for (var i = 5 - 1; i >= 0; i--) {
      var currentValue = $("#adequate" + i).val();
      var currentAirport = approvedAirports.find(a => a.icao === currentValue)
      if(currentAirport){ currentAirports.push(currentAirport); }
    }
  }

  currentAirports.forEach(function(currentValue, index, arr){
    const adequateCircle = new google.maps.Circle({
      strokeColor: "#018f27",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#1bb544",
      fillOpacity: 0.35,
      map,
      center: { lat: currentValue.latitude.decimal, lng: currentValue.longitude.decimal },
      radius: currentAircraft.Adequate * 1852,
      clickable: false
    });
    mapShapes.push(adequateCircle);
  });

}

window.initMap = initMap;

$(document).ready(function(){

  $.getJSON("ApprovedAirports.json", function(sourceData){
    approvedAirports = sourceData;
    drawAlternateAirportRings();
    drawAdequateAirportRings();
  });
});