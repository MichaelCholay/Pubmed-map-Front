import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { GoogleProvider } from 'leaflet-geosearch';
import { ArticlesApiService } from '../common/service/articles-api.service';
// import { GeolocService } from '../common/service/geoloc.service';
import "leaflet.markercluster";
import { Article } from '../common/model/article';
import { Geoloc } from '../common/model/geoloc';
import { Author } from '../common/model/author';
import { ArticleResponse } from '../common/model/auth/article-response';
import { TokenStorageService } from '../common/service/auth/token-storage.service';
import { AuthService } from '../common/service/auth/auth.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  articles = []
  article: Article
  articlePmid: number
  markerslist = []
  geoloc: Geoloc
  marker = L.marker
  markerCluster = new L.MarkerClusterGroup()
  author: Author
  authorsList: Author[]
  favoriteArticle: ArticleResponse = new ArticleResponse
  value
  


  bluepin = L.icon({ iconUrl: '/assets/pins/bluepin.png', iconSize: [40, 60], iconAnchor: [20, 60], popupAnchor: [0, -30] })
  redpin = L.icon({ iconUrl: '/assets/pins/redpin.png', iconSize: [40, 60], iconAnchor: [20, 60], popupAnchor: [0, -30] })
  greenpin = L.icon({ iconUrl: '/assets/pins/greenpin.png', iconSize: [40, 60], iconAnchor: [20, 60], popupAnchor: [0, -30] })
  greypin = L.icon({ iconUrl: '/assets/pins/greypin.png', iconSize: [40, 60], iconAnchor: [20, 60], popupAnchor: [0, -30] })
  yellowpin = L.icon({ iconUrl: '/assets/pins/yellowpin.png', iconSize: [40, 60], iconAnchor: [20, 60], popupAnchor: [0, -30] })


  constructor(private articlesApiService: ArticlesApiService, private tokenStorage: TokenStorageService, private authService: AuthService) { }

  ngOnInit(): void {


    // Set map on Paris
    const mymap = L.map('mapid', { scrollWheelZoom: false }).setView([48.833, 2.333], 2).addControl(L.control.scale());

    // List of layers
    var Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
      maxZoom: 11,
      minZoom: 1,
    });

    var Esri_WorldStreetMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
      maxZoom: 19,
      minZoom: 2
    });

    var CartoDB_DarkMatterNoLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
      minZoom: 2
    });

    //Control of layers
    mymap.addLayer(Esri_WorldGrayCanvas); // default layer
    mymap.addControl(new L.Control.Layers({
      "classic map": Esri_WorldStreetMap,
      "light map": Esri_WorldGrayCanvas,
      "black map": CartoDB_DarkMatterNoLabels
    }, {}));

    // add markerCluster
    // var markerCluster = new L.MarkerClusterGroup()


    this.articlesApiService.getArticleByTitle(this.value).subscribe(data => {
      this.articles = data
      console.log(this.articles)
    }, (error) => {
      console.log(error)
    }, () => { this.showPins(this.articles)
      // for (let i in this.articles) {
      //   for (let j in this.articles[i].authorsList) {
      //     if (this.articles[i].authorsList[j].latitude != 0 && this.articles[i].authorsList[j].longitude != 0) {
      //       const popupInfo = `<center><span class='author'> ${this.articles[i].authorsList[j].lastName} ${this.articles[i].authorsList[j].foreName}</span><br>
      //       <span class='adress'> ${this.articles[i].authorsList[j].googleFormatedAdress}</span>`
      //       // <a class="btn btn-outline-secondary btn-sm" data-toggle="collapse" href="${this.articles[i].pubmedUrl}" target="_blank" rel="noopener noreferrer" >More Details</a><center>`
      //       let authorRank = j;
      //       let markerPin
      //       switch (authorRank) {
      //         case ((this.articles[i].authorsList.length - 1).toString()):
      //           markerPin = this.redpin
      //           break
      //         case ('0'):
      //           markerPin = this.bluepin
      //           break
      //         default:
      //           markerPin = this.yellowpin
      //       }
      //       let pins = this.marker(L.latLng(this.articles[i].authorsList[j].latitude, this.articles[i].authorsList[j].longitude), { icon: markerPin, riseOnHover: true })
      //         .on("click", this.showDetailsCard.bind(this, this.articles[i]))
      //         .bindPopup(popupInfo, this.customOptions)
      //         .on('mouseover', function (e) { this.openPopup() })
      //         .on('mouseout', function (e) { this.closePopup() })

      //       this.markerCluster.addLayer(pins)

      //     }
      //   }
      // }
    })
    mymap.addLayer(this.markerCluster)

    this.closeDetailsCard()
    // this.getArticleById(this.pmid)

    //Legend specific
    var legend = new L.Control({
      position: "bottomright"
    })

    legend.onAdd = function (map) {
      var div = L.DomUtil.create("div", "legend");
      div.innerHTML += "<h5>Legend</h5>";
      div.innerHTML += '<img src=/assets/pins/pins_icons/bluepinIcon.png></img><span>  First author</span><br>';
      div.innerHTML += '<img src=/assets/pins/pins_icons/redpinIcon.png></img><span>  Last author</span><br>';
      div.innerHTML += '<img src=/assets/pins/pins_icons/yellowpinIcon.png></img><span>  Intermediate author</span><br>';
      return div;
    };
    legend.addTo(mymap);


  }

showPins(articles: Article[]) {
  for (let i in articles) {
    for (let j in articles[i].authorsList) {
      if (articles[i].authorsList[j].latitude != 0 && articles[i].authorsList[j].longitude != 0) {
        const popupInfo = `<center><span class='author'> ${articles[i].authorsList[j].lastName} ${articles[i].authorsList[j].foreName}</span><br>
        <span class='adress'> ${articles[i].authorsList[j].googleFormatedAdress}</span>`
        let authorRank = j;
        let markerPin
        switch (authorRank) {
          case ((articles[i].authorsList.length - 1).toString()):
            markerPin = this.redpin
            break
          case ('0'):
            markerPin = this.bluepin
            break
          default:
            markerPin = this.yellowpin
        }
        let pins = this.marker(L.latLng(articles[i].authorsList[j].latitude, articles[i].authorsList[j].longitude), { icon: markerPin, riseOnHover: true })
          .on("click", this.showDetailsCard.bind(this, articles[i]))
          .bindPopup(popupInfo, this.customOptions)
          .on('mouseover', function (e) { this.openPopup() })
          .on('mouseout', function (e) { this.closePopup() })

        this.markerCluster.addLayer(pins)

      }
    }
  }
}

  customOptions = {
    'maxWidth': 1000,
    'className': 'customPopupMarker',
    closeButton: true
  }

  getIdArticle(article: Article) {
    this.articlePmid = article._id
    sessionStorage.setItem("_id", this.articlePmid.toString())
    console.log(this.articlePmid)
    this.getArticleById(this.articlePmid)
  }


  getArticleById(id) {
    // this.articlePmid = article._id.toString()
    id = sessionStorage.getItem('_id')
    this.articlesApiService.getArticleByPmid(id).subscribe(
      data => {
        this.article = data
        console.log(id)
        error => { console.log(error) }
      }
    )
  }

  showDetailsCard(article: Article) {
    this.getIdArticle(article)
    let card = document.getElementById("cardArticle");
    if (getComputedStyle(card).display != "none") {
      card.style.display = "none";
    } else {
      card.style.display = "block";
    }
  }

  closeDetailsCard() {
    let card = document.getElementById("cardArticle");
    let closeButton = document.getElementById("closeButton");
    closeButton.onclick = function () {
      card.style.display = "none";
    }
  }

  addFavoriteArticle() {
    this.favoriteArticle._id = sessionStorage.getItem('_id')
    this.favoriteArticle.username = this.tokenStorage.getUsername()
    this.authService.addArticle(this.favoriteArticle).subscribe(
      data => {
        console.log(`${this.favoriteArticle.username} add the article with id ${this.favoriteArticle._id}`)
      }
    )
  }

  

  findArticleByTitle(wordTitle) {
    this.articlesApiService.getArticleByTitle(wordTitle).subscribe(data => {
      this.articles = data
      console.log(this.articles)
    }, (error) => {
      console.log(error)
    })
  }
}


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





  // add a search bar for adress
  // const searchControl = new GeoSearchControl({
  //   style: 'button',
  //   provider: new OpenStreetMapProvider(),
  //   autoComplete: false,
  // });
  // mymap.addControl(searchControl)
