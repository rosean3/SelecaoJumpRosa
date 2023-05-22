import { Injectable } from '@angular/core';
import { Processo } from '../../types/Processo';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AnalysisState {
  private readonly processoData = new BehaviorSubject([] as Processo[]);

  public getProcessoData() {
    return this.processoData.asObservable();
  }
  
  public setProcessoData(processoData: Processo[]) {
    this.processoData.next(processoData);
  }
}
