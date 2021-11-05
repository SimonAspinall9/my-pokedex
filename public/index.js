let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 53.3809865, lng: -2.6745316 },
    zoom: 14,
  });
}
