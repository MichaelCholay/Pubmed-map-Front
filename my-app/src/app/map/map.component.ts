import { Component, OnInit } from '@angular/core';
// import { L } from "node_modules/leaflet";
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // essai de carte avec tuto Leaflet https://leafletjs.com/examples/quick-start/
//     var mymap = L.map('mapid').setView([51.505, -0.09], 13);
//   L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox/streets-v11',
//     tileSize: 512,
//     zoomOffset: -1,
//     accessToken: 'pk.eyJ1IjoiZHJtY3kiLCJhIjoiY2tibGViZmtjMTg5NzJ5bzU5ZGVpcWlieSJ9.WCqktMpcC1jCc4CG3QFtWA'
// }).addTo(mymap);
//   }

    // essai de carte avec tuto FrugalPrototype https://www.frugalprototype.com/leaflet-angular/
    const mymap = L.map('mapid').setView([50.6311634, 3.0599573], 5);
    var Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
      maxZoom: 16
  // L.tileLayer('http://{s}.https://www.openstreetmap.org//{z}/{x}/{y}.png', {
  //   attribution: 'Frugal Map'
  }).addTo(mymap);
  
  const myIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
  });
  L.marker([50.6311634, 3.0599573], {icon: myIcon}).bindPopup('Je suis un Frugal Marqueur').addTo(mymap).openPopup();

  var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick);
}
}
