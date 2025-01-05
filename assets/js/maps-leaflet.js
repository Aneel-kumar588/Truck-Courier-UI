var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var marker = L.marker([51.5, -0.09], {draggable: true}).addTo(map);

marker.on('dragend', function (e) {
    var position = marker.getLatLng();
    marker.setLatLng(position, {draggable: true}).bindPopup(position).update();
    document.querySelector("#latitude").value = position.lat;
    document.querySelector("#longitude").value = position.lng;
});
