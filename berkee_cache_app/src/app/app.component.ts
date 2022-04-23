import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'berkee_cache_app';

  addMarker($event): void {
    console.log($event.lat, $event.lng);
  }
}
