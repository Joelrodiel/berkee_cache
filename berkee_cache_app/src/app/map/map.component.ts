import { AfterViewInit, Component, Output, EventEmitter } from '@angular/core';
import * as L from 'leaflet';
import { CacheService } from '../cache.service';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

const bearIcon = L.icon({
  iconUrl: '../assets/bear.png',
  iconSize: [35, 35],
});

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map;
  @Output() addMarkerClick = new EventEmitter();

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 37.8719, -122.2585 ],
      zoom: 16,
      zoomControl: false
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 14,
      // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    this.map.on('click', e => {
      this.addMarkerClick.emit(e.latlng);
      this.cacheService.createCache("Testing", e.latlng.lat, e.latlng.lng, this.map);
    });
  }
  
  constructor(private cacheService: CacheService) { }

  ngAfterViewInit(): void {
    this.initMap();
    this.cacheService.loadCaches(this.map);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.currentPosition.bind(this));
    }
  }

  currentPosition(position: { coords: { latitude: any; longitude: any } }) {
    L.marker([position.coords.latitude, position.coords.longitude], {icon: bearIcon}).addTo(this.map);
  }

}
