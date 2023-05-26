import { Injectable } from '@angular/core';
import { Processo } from '../../types/Processo';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AnalysisState {
  private readonly processoData = new BehaviorSubject([] as Processo[]);

  /*BehaviorSubjects are a type of Observable that always emit their current value to new
  subscribers. This BehaviorSubject is used to manage the state of Processo data. */

  public getProcessoData() {
    return this.processoData.asObservable();
  }
  /*This is a public method that allows other parts of the application to subscribe to
  processoData.It returns the BehaviorSubject as an Observable. This means other parts of the
  application can react to changes in processoData, but cannot directly modify the state -
  this ensures state immutability, which is a key principle in state management. */

  public setProcessoData(processoData: Processo[]) {
    this.processoData.next(processoData);
  }
  /*This is a public method that allows other parts of the application to update processoData.
  It takes an array of Processo and pushes it to the BehaviorSubject using the next() method.
  This triggers the BehaviorSubject to emit the new data to all of its subscribers. */
}
