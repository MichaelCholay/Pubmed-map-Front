import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { GoogleProvider } from 'leaflet-geosearch';



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

    // Set map on Paris
    const mymap = L.map('mapid').setView([48.833, 2.333], 2);

    // List of layers
    var Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
      maxZoom: 16,
      minZoom: 1
    });

    var Esri_WorldStreetMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
      minZoom: 1
    });

    var CartoDB_DarkMatterNoLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
      minZoom: 1
    });

    //Control of layers
    mymap.addLayer(Esri_WorldGrayCanvas); // default layer
    mymap.addControl(new L.Control.Layers({
      "classic map": Esri_WorldStreetMap,
      "light map": Esri_WorldGrayCanvas,
      "black map": CartoDB_DarkMatterNoLabels
    }, {}));




    // add icon
    // const myIcon = L.icon({
    //   iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
    // });
    // L.marker([50.6311634, 3.0599573], { icon: myIcon }).bindPopup('Marqueur').addTo(mymap).openPopup();

    // add a search bar for adress
    // const searchControl = new GeoSearchControl({
    //   style: 'button',
    //   provider: new OpenStreetMapProvider(),
    //   autoComplete: false,
    // });
    // mymap.addControl(searchControl)

    // provider Google Maps
    const provider = new GoogleProvider({
      params: {
        key: 'AIzaSyAWttTD7pDklvM1Jha4xbVqe82JcUzRx7k',
      },
    });
    mymap.addControl(
      new GeoSearchControl({
        provider,
      }),
    );
    // provider.search({query: 'Paris'})
    // console.log(query + )


    // function adressGeocode() {
    // const provider = new OpenStreetMapProvider();
    // const results = provider.search({ query: "impase reille 75014 Paris" })
    // return result.
    // }
    // popup click sur map
    /*var popup = L.popup();
    function onMapClick(e) {
      popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
    }
    mymap.on('click', onMapClick);*/
  }
}
