import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DummyService {

  behavior$ = new BehaviorSubject(2);
  replay$ = new ReplaySubject(1);

  private registeredComponents = [];

  constructor() {
    (window as any).dummyService = this;
  }

  register(component) {
    this.registeredComponents.push(component);
  }
}
