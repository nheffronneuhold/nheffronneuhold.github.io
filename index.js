
const adequateAirports = {
	SFO: {
    center: { lat: 37.6188056, lng: -122.3754167 }
  },
  HNL: {
    center: { lat: 21.3178172, lng: -157.9202275 }
  }
};

const alternateAirports = {
SFO: {
    center: { lat: 37.6188056, lng: -122.3754167 }
  },
  HNL: {
    center: { lat: 21.3178172, lng: -157.9202275 }
  }
};

function initMap() {
  // Create the map.
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: { lat: 28.43436280891402, lng: -138.30065838542495 },
    mapTypeId: "terrain",
  });
  
  for (const airport in alternateAirports) {
    // Add the circle for this city to the map.
    const alternateCircle = new google.maps.Circle({
      strokeColor: "#ebe309",
      strokeOpacity: 0.9,
      strokeWeight: 2,
      fillColor: "#ebe534",
      fillOpacity: 0.45,
      map,
      center: alternateAirports[airport].center,
      radius: 2126096
    });
  }


for (const airport in adequateAirports) {
  // Add the circle for this city to the map.
  const adequateCircle = new google.maps.Circle({
    strokeColor: "#018f27",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#1bb544",
    fillOpacity: 0.35,
    map,
    center: adequateAirports[airport].center,
    radius: 729688
  });
}
}
  


window.initMap = initMap;
