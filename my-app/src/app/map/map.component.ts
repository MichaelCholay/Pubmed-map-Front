import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { GoogleProvider } from 'leaflet-geosearch';
import { ArticlesApiService } from '../common/service/articles-api.service';
import { GeolocService } from '../common/service/geoloc.service';
import "leaflet.markercluster";


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  geoloc = []
  latitude
  // [[123,-40.99497,174.50808],
  // [456,-41.30269,173.63696],
  // [789,-41.49413,173.5421]]

  constructor(private geolocService: GeolocService) { }

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
    const mymap = L.map('mapid').setView([48.833, 2.333], 2).addControl(L.control.scale());

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

    //test ajout marker
    // L.marker([42.36373469999999, -71.1609714],{title: 'test'}).addTo(mymap)

    // add markerCluster
    var markerCluster = new L.MarkerClusterGroup()

    
    this.geolocService.getAllGeoloc().subscribe(data => {
      //this.latitude = data[0].latitude
      this.geoloc = data
      console.log(this.geoloc)
      //var latLng = [this.geoloc[0][1],this.geoloc[0][2]]
      // console.log("latLng:" + this.geoloc[0].latitude)
      for (var i in this.geoloc) {
        // for (var i = 0; i < this.geoloc.length; i++) {
        console.log(`marker: ${this.geoloc.length}`)
        // console.log(`marker: ${this.geoloc[i].pmid} - ${this.geoloc[i].latitude} - ${this.geoloc[i].longitude}`)
        var marker = L.marker(L.latLng(this.geoloc[i].latitude, this.geoloc[i].longitude), {title: this.geoloc[i].pmid, icon: myIcon})
        .bindPopup(this.geoloc[i].pmid.toString())
        //.addTo(mymap)
        markerCluster.addLayer(marker)
      }
      mymap.addLayer(markerCluster)
    })
    // add icon
    var myIcon = L.icon({
      iconUrl: 'assets/pins/bluepin.png',
      iconSize: [50,50],
      iconAnchor: [25,50]
    });


  }
  // mymap.panTo(L.latLng(this.geoloc[0].latitude,this.geoloc[0].longitude))
  // })




  // L.marker([50.6311634, 3.0599573], { icon: myIcon }).bindPopup('Marqueur').addTo(mymap).openPopup();

  // add a search bar for adress
  // const searchControl = new GeoSearchControl({
  //   style: 'button',
  //   provider: new OpenStreetMapProvider(),
  //   autoComplete: false,
  // });
  // mymap.addControl(searchControl)

  // provider Google Maps
  // const provider = new GoogleProvider({
  //   params: {
  //     key: 'AIzaSyAWttTD7pDklvM1Jha4xbVqe82JcUzRx7k',
  //   },
  // });
  // mymap.addControl(
  //   new GeoSearchControl({
  //     provider,
  //   }),
  // );


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
  // }
  // list of markers
  // geolocalisation = function(geoloc) {
  // //for (var i = 0; i < this.geoloc.length; i++) 
  // // for (var i in this.geoloc) {
  //   var latLng = [geoloc[0][1],geoloc[0][2]]
  //   console.log("latLng:" + latLng)
  // L.marker(latLng)
  // 	.bindPopup(this.geoloc[i][0])
  // 	.addTo(mymap);
  // }
}
