import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }

  makeCachePopup(data: any): string {
    return `` +
      `<div>${ data.label }</div>`;
  }
}
