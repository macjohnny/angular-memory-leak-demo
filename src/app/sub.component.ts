import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DummyService } from './dummy.service';


@Component({
  selector:'app-sub',
  template: 'mega {{rand}}'
})
export class SubComponent {
  rand = Math.random();
  rand2 = 0;
  subject = new BehaviorSubject(42);

  arr = [];

  constructor(private dummyService: DummyService) {
    for (let i = 0; i < 100000; ++i) {
      this.arr.push(Math.random());
    }

    // this.subject.subscribe();
    // this.subject.subscribe(() => {});
    // this.subject.subscribe(() => this.rand2 = 33);

    this.dummyService.behavior$.subscribe();
    // this.dummyService.behavior$.subscribe(() => {});
    // this.dummyService.behavior$.subscribe(() => this.rand2 = 33);

    // this.dummyService.register(this);
  }
}
