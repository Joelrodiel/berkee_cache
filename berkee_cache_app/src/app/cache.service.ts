import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { PopupService } from './popup.service';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  // endpoint: string = 'http://192.168.1.185:8081/';
  endpoint: string = 'http://localhost:8081/';
  getCaches: string = 'getCaches';
  createCaches: string = 'newCache';

  constructor(private http: HttpClient, private popupService: PopupService) { }

  loadCaches(map: L.Map): void {
    const url = this.endpoint + this.getCaches;
    console.log(url);
    this.http.get(url).subscribe((res: any) => {
      for (const c of res) {
        const label = c.label;
        const lat = c.latitude;
        const lng = c.longitude;

        const marker = L.marker([lat, lng]);

        marker.bindPopup(this.popupService.makeCachePopup(c));

        marker.addTo(map);
      }
    });
  }

  createCache(label: string, lat: number, lng: number, map: L.Map): void {
    const cache = { label: label, latitude: lat, longitude: lng}
    this.http.post(this.endpoint + this.createCaches, cache).subscribe({
      next: _ => {
        const marker = L.marker([lat, lng]);
        marker.bindPopup(this.popupService.makeCachePopup(cache));
        marker.addTo(map);
        console.log("Successfully created new Cache!");
      },
      error: error => {
        console.error("Error creating new Cache:", error);
      }
    });
  }
}
