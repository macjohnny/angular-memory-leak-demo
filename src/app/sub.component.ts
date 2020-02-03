import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { DummyService } from './dummy.service';
import { publish, publishBehavior, publishLast, publishReplay, shareReplay, tap } from 'rxjs/operators';


@Component({
  selector:'app-sub',
  template: 'mega {{rand}}'
})
export class SubComponent implements OnDestroy {
  rand = Math.random();
  rand2 = 0;
  subject = new BehaviorSubject(42);

  arr = [];

  /** Emits when the component is destroyed */
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private dummyService: DummyService) {
    for (let i = 0; i < 100000; ++i) {
      this.arr.push(Math.random());
    }

    // no leak - component is cleaned up
    // this.subject.subscribe();

    // no leak - component is cleaned up
    // this.subject.subscribe(() => {const blub = 34;});

    // no leak - component is cleaned up
    // this.subject.subscribe(() => this.rand2 = 33);

    // small leak - empty anonymous function remains in heap
    // this.dummyService.behavior$.subscribe();
    // FIXED
    // this.dummyService.behavior$.pipe(takeUntil(this.destroy$)).subscribe();

    // small leak - small anonymous function remains in heap
    // this.dummyService.behavior$.subscribe(() => {const blub = 34;});
    // FIXED
    // this.dummyService.behavior$.pipe(takeUntil(this.destroy$)).subscribe(() => {});

    // (!) large leak - anonymous function references the component, thus the component stays in memory
    // this.dummyService.behavior$.subscribe(() => this.rand2 = 33);
    // FIXED
    // this.dummyService.behavior$.pipe(takeUntil(this.destroy$)).subscribe(() => this.rand2 = 33);

    // no leak
    // this.dummyService.behavior$.pipe(tap(() => this.rand2 = 44), publish()).subscribe(() => this.rand2 = 33);

    // no leak
    // this.dummyService.behavior$.pipe(tap(() => this.rand2 = 44), publishBehavior(3), takeUntil(this.destroy$)).subscribe(() => this.rand2 = 33);

    // no leak
    // this.dummyService.behavior$.pipe(tap(() => this.rand2 = 44), publishLast(), takeUntil(this.destroy$)).subscribe(() => this.rand2 = 33);

    // this.dummyService.behavior$.pipe(tap(() => this.rand2 = 44), publishReplay(), takeUntil(this.destroy$)).subscribe(() => this.rand2 = 33);

    // (!) large leak - the subscription from the shareReplay operator to the source is never unsubscribed, thus the component stays in the heap
    // this.dummyService.behavior$.pipe(tap(() => this.rand2 = 44), shareReplay(1), takeUntil(this.destroy$)).subscribe(() => this.rand2 = 33);
    // FIXED
    // this.dummyService.behavior$.pipe(tap(() => this.rand2 = 44), shareReplay({bufferSize: 1, refCount: true})).subscribe(() => this.rand2 = 33);

    // (!) large leak - the component reference in the service is not cleaned up, thus the component stays in memory
    // this.dummyService.register(this);
  }

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }

}
