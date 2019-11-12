import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<app-sub *ngIf="hide"></app-sub>`
})
export class AppComponent {
  hide = false;

  constructor() {
    setInterval(() => this.hide = !this.hide, 50);
  }
}
