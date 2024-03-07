let map
function initMap() {
    const myLatLng = { lat: 41.390205, lng: 2.154007 };
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: myLatLng,
    });
  
    new google.maps.Marker({
      position: myLatLng,
      map,
      title: "Hello World!",
    });
  }
  
window.initMap = initMap;

function geocodeAddress(address) {
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            let latitude = results[0].geometry.location.lat();
            let longitude = results[0].geometry.location.lng();
            let center = new google.maps.LatLng(latitude, longitude);
            map.setCenter(center);
            map.setZoom(12);
            new google.maps.Marker({
                position: center,
                map,
                title: "Hello World!",
            });
            let infowindow = new google.maps.InfoWindow({
                content: "STRING + html"
            });
                marker.addListener('click', function() {
                infowindow.open(map, marker);
            });
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
}

document.getElementById("findLoc").addEventListener("click", function() {
    let address = document.getElementById("address").value;
    if (address != "") {
        geocodeAddress(address);
    } else {
        alert('L\'adreca esta buida')
    }
});

document.getElementById('localitza').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            map.setCenter(pos);
            map.setZoom(4);
            let marker = new google.maps.Marker({
                position: pos,
                map: map,
                icon: { url:'./pin.png', scaledSize: new google.maps.Size(50, 50)}
            });
        });
    } else {
        alert('No funciona')
    }
})