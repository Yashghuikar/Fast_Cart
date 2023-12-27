import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}

  cardCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  cartCountObs$ = this.cardCount.asObservable();

  emitCardCount(count: number) {
    this.cardCount.next(count);
  }
}
