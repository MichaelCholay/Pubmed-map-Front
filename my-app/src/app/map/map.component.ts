import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { GoogleProvider } from 'leaflet-geosearch';
import { ArticlesApiService } from '../common/service/articles-api.service';
// import { GeolocService } from '../common/service/geoloc.service';
import "leaflet.markercluster";
import { Article } from '../common/model/article';
import { Geoloc } from '../common/model/geoloc';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  articles = []
  article: Article
  articlePmid: string
  markerslist = []
  geoloc: Geoloc

  constructor(private articlesApiService: ArticlesApiService) { }

  ngOnInit(): void {


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


    this.articlesApiService.getAllArticles().subscribe(data => {
      this.articles = data
      console.log(this.articles)
    }, (error) => {
      console.log(error)
    }, () => {
      console.log("end of subscribe")

      for (let i in this.articles) {
        for (let j in this.articles[i].authorsList) {
          // for (let i = 0; i < this.articles.length; i++) {
          //   for (let j = 0; j < this.articles[i].authorsList.length; j++) {
          if (this.articles[i].authorsList[j].latitude != 0 && this.articles[i].authorsList[j].longitude != 0) {
            //  this.geoloc.articleTitle = this.articles[i].articleTitle
            //  console.log("geoloc: " + this.geoloc)
            const popupInfo = `<center><span class='author'> ${this.articles[i].authorsList[j].lastName} ${this.articles[i].authorsList[j].foreName}</span><br>
            <span class='adress'> ${this.articles[i].authorsList[j].googleFormatedAdress}</span><br><br>
            <a class="btn btn-outline-secondary btn-sm" data-toggle="collapse" href="#articleDetails" >More Details</a><center> `
            var marker = L.marker(L.latLng(this.articles[i].authorsList[j].latitude, this.articles[i].authorsList[j].longitude), { /*title: this.articles[i].articleTitle,*/ icon: this.myIcon, riseOnHover: true })
              .bindPopup(popupInfo, this.customOptions)
              .on('mouseover', function (e) { this.openPopup(); });
            // .bindPopup(`${this.articles[i].authorsList[j].lastName} ${this.articles[i].authorsList[j].foreName} ${this.articles[i]._id}`, this.customOptions)
            // marker.addEventListener("click", function () { this.getDataArticle(this.articles[i]) })
            markerCluster.addLayer(marker)
          }
        }
      }
    })
    mymap.addLayer(markerCluster)


  }
  // add icon
  myIcon = L.icon({
    iconUrl: 'assets/pins/bluepin.png',
    iconSize: [40, 50],
    iconAnchor: [20, 20]
  });

  //cutom popup
  customPopup = "<center><b style='color:yellow'>DETRI AMELIA CHANDRA</b><br>Jl. Rowo Bening, Perum. Tiga Putri Tahap III<div class='waseman'><a href='https://facebook.com/idet.ambun' target='_blank' class='facebook' style='color:#fff;'><i class='fa fa-facebook'></i></a> <a href='https://twitter.com/detriamelia' target='_blank' class='twitter' style='color:#fff;'><i class='fa fa-twitter'></i></a> <a href='https://www.instagram.com/detriamelia/' target='_blank' class='instagram' style='color:#fff;'><i class='fa fa-instagram'></i></a> <a href='https://web.telegram.org/#/im?p=u687504930_6230769115732589639' class='telegram' style='color:#fff;'><i class='fa fa-whatsapp'></i></a></div></center>";

  customOptions = {
    'maxWidth': 1000,
    'className': 'customPopupMarker',
    closeButton: true,
    autoClose: true
  }

  getDataArticle(article: Article) {
    this.articlePmid = article._id.toString()
    this.articlesApiService.getIdArticle(this.articlePmid).subscribe(
      data => { this.article = data }
    )
  }

  // bindMarker(){
  //   L.In.("click", function () { this.getDataArticle(this.articles[i]) })
  // }

  //   onClick(e) {
  //     alert(e.layer.latLng);
  // }

  // get id of an article 
  // getArticlePmid(article: Article) {
  //   console.log(this.articlePmid)
  // this.articlePmid = article._id.toString()
  // sessionStorage.setItem("id", this.articlePmid)
  // this._router.navigate(['/articleDetails', this.articlePmid])
  // }


  // find an article by id
  // findArticlebyPmid(id: string) {
  //   this.articlesApiService.getIdArticle(id).subscribe(
  //     data => { this.article = data }
  //   )
  // }
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
