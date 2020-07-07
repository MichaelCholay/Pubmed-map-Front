import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Geoloc } from '../model/geoloc';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocService {

  constructor(private httpClient: HttpClient) { }

  getAllGeoloc(): Observable<Geoloc[]> {
    let allGeolocUrl = './geoloc-api/public/geoloc'
    return this.httpClient.get<Geoloc[]>(allGeolocUrl)
  }
}
