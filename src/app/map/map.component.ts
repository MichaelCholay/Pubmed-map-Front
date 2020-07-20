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
import { NgModel, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { normalizePassiveListenerOptions } from '@angular/cdk/platform';
import { FavorisService } from '../common/service/favoris.service';


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
  mymap: any
  author: Author
  authorsList: Author[]
  favoriteArticle: ArticleResponse = new ArticleResponse
  searchMethod: string
  query: string = null;
  // searchTitleWord: string = null;
  // searchAbstract: string = null;
  // searchKeyword: string = null;
  // searchAuthor: string = null;
  dataSub: Subscription
  floatLabelControl = new FormControl('auto');
  options: FormGroup;
  output: string = "all";
  // searchBarDisable: boolean = true;
  // searchFilter: string = "AllArticles";
  // selected: string = "AllArticles";
  // filters: string[] = ['Title', 'Abstract', 'Keywords', 'Author', 'Journal', 'Date'];


  bluepin = L.icon({ iconUrl: '/assets/pins/bluepin.png', iconSize: [40, 60], iconAnchor: [20, 60], popupAnchor: [0, -30] })
  redpin = L.icon({ iconUrl: '/assets/pins/redpin.png', iconSize: [40, 60], iconAnchor: [20, 60], popupAnchor: [0, -30] })
  greenpin = L.icon({ iconUrl: '/assets/pins/greenpin.png', iconSize: [40, 60], iconAnchor: [20, 60], popupAnchor: [0, -30] })
  greypin = L.icon({ iconUrl: '/assets/pins/greypin.png', iconSize: [40, 60], iconAnchor: [20, 60], popupAnchor: [0, -30] })
  yellowpin = L.icon({ iconUrl: '/assets/pins/yellowpin.png', iconSize: [40, 60], iconAnchor: [20, 60], popupAnchor: [0, -30] })


  constructor(private articlesApiService: ArticlesApiService, private tokenStorage: TokenStorageService, private favoriteService: FavorisService) { }

  ngOnInit(): void {

    (document.getElementById("searchText") as HTMLOptionElement).disabled = true;
    (document.getElementById("searchButton") as HTMLOptionElement).disabled = true;

    // Set map on Paris
    this.mymap = L.map('mapid', { scrollWheelZoom: false }).setView([48.833, 2.333], 3).addControl(L.control.scale());

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
    this.mymap.addLayer(Esri_WorldGrayCanvas); // default layer
    this.mymap.addControl(new L.Control.Layers({
      "classic map": Esri_WorldStreetMap,
      "light map": Esri_WorldGrayCanvas,
      "black map": CartoDB_DarkMatterNoLabels
    }, {}));

    // add markerCluster
    // var markerCluster = new L.MarkerClusterGroup()


    this.setSearchMethod(this.output)
    //   switch (this.searchMethod) {
    //     case ("title"):
    //       console.log("case" + this.searchMethod)
    //       // this.searchArticleByTitle()
    //       console.log("searchMethodafter: " + this.searchMethod)
    //       this.articlesApiService.getArticleByTitle(this.searchTitleWord).subscribe(data => {
    //         this.articles = data
    //         console.log(this.articles)
    //       }, (error) => {
    //         console.log(error)
    //       }, () => {
    //         this.showPins(this.articles)
    //       })
    //       break
    //     default:
    //     // case ("all"):
    //     console.log("case default")
    //   this.dataSub = this.articlesApiService.getAllArticles().subscribe(data => {
    //     this.articles = data
    //     console.log(this.articles)
    //   }, (error) => {
    //     console.log(error)
    //   }, () => {
    //     this.showPins(this.articles)
    //   })
    // }


    // this.mymap.addLayer(this.markerCluster)

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
    legend.addTo(this.mymap);


    var filter = document.getElementById("checkbox").click
    console.log("filter " + filter)
  }

  ////// END OF ngOnInit  ////////


  showPins(articles: Article[]) {
    for (let i in articles) {
      for (let j in articles[i].authorsList) {
        if (articles[i].authorsList[j].latitude != 0 && articles[i].authorsList[j].longitude != 0) {
          const popupInfo = `<center><span class='author'> ${articles[i].authorsList[j].lastName} ${articles[i].authorsList[j].foreName}</span><br>
        <span class='adress'> ${articles[i].authorsList[j].googleFormatedAdress}</span><br>
        <span class='email'>email: ${articles[i].authorsList[j].email}</span>`
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
    this.mymap.addLayer(this.markerCluster)
  }


  getFilter() {
    var selectElement = <HTMLInputElement>document.querySelector('#selectMenu');
    this.output = selectElement.value;
    console.log("select value: " + this.output)
    this.query = (document.getElementById("searchText") as HTMLInputElement).value
    console.log("searchTitleWord: " + this.query)
    this.setSearchMethod(this.output)
  }

  updateSearchBar() {
    var selectElement = <HTMLInputElement>document.querySelector('#selectMenu');
    if (selectElement.value != "no filter"){
      (document.getElementById("searchText") as HTMLOptionElement).disabled = false;
      (document.getElementById("searchText") as HTMLInputElement).placeholder = `Search by ${selectElement.value}`;
      (document.getElementById("searchButton") as HTMLOptionElement).disabled = false;
    } else {
      (document.getElementById("searchText") as HTMLOptionElement).disabled = true;
      (document.getElementById("searchText") as HTMLInputElement).placeholder = "Search in title, abstract or by author ...";
      (document.getElementById("searchButton") as HTMLOptionElement).disabled = true;
    }
  }

  setSearchMethod(searchMethod: string) {
    switch (searchMethod) {
      case ("title"):
        console.log("case " + searchMethod)
        this.searchArticleByTitle()
        break
      case ("abstract"):
        console.log("case " + searchMethod)
        this.searchArticleByabstract()
        break
      case ("author"):
        console.log("case " + searchMethod)
        this.searchArticleByAuthor()
        break
      // default:
      case ("all"):
        this.markerCluster.clearLayers()
        this.dataSub = this.articlesApiService.getAllArticles().subscribe(data => {
          this.articles = data
          console.log(this.articles)
        }, (error) => {
          console.log(error)
        }, () => {
          this.showPins(this.articles)
        })
    }
  }

  searchArticleByTitle() {
    // this.searchMethod = "title"
    this.markerCluster.clearLayers()
    this.articlesApiService.getArticleByTitle(this.query).subscribe(data => {
      this.articles = data
      console.log(this.articles)
    }, (error) => {
      console.log(error)
    }, () => {
      this.showPins(this.articles)
    })
  }

  searchArticleByabstract() {
    // this.searchMethod = "abstract"
    this.markerCluster.clearLayers()
    this.articlesApiService.getArticleByAbstract(this.query).subscribe(data => {
      this.articles = data
      console.log(this.articles)
    }, (error) => {
      console.log(error)
    }, () => {
      this.showPins(this.articles)
    })
  }

  searchArticleByAuthor() {
    // this.searchMethod = "author"
    this.markerCluster.clearLayers()
    this.articlesApiService.getArticleByAuthor(this.query).subscribe(data => {
      this.articles = data
      console.log(this.articles)
    }, (error) => {
      console.log(error)
    }, () => {
      this.showPins(this.articles)
    })
  }

  searchAllArticles() {
    this.markerCluster.clearLayers();
    (document.getElementById("searchText") as HTMLInputElement).value = '';
    (document.getElementById("searchText") as HTMLInputElement).placeholder = "Search in title, abstract or by author ...";
    (document.getElementById("searchText") as HTMLOptionElement).disabled = true;
    (document.getElementById('noFilter') as HTMLOptionElement).selected = true
    this.dataSub = this.articlesApiService.getAllArticles().subscribe(data => {
      this.articles = data
      console.log(this.articles)
    }, (error) => {
      console.log(error)
    }, () => {
      this.showPins(this.articles)
    })
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
    let username = this.tokenStorage.getUsername()
    let articlePmid = this.article._id
    this.favoriteService.addFavorite(username, articlePmid).subscribe(
      favorite => (this.favoriteArticle = favorite),
      error => { console.log(error)}
    )
    console.log("user: "+ username + "articlePMID: " + articlePmid)
  }
}
