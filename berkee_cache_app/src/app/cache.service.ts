import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { PopupService } from './popup.service';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  endpoint: string = 'http://192.168.1.185:8081/';
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

  createCache(label: string, lat: number, lng: number): void {
    this.http.post(this.endpoint + this.createCaches, { label: label, latitude: lat, longitude: lng}).subscribe({
      next: _ => {
        console.log("Successfully created new Cache!");
      },
      error: error => {
        console.error("Error creating new Cache:", error);
      }
    });
  }
}
