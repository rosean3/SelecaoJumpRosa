import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProcessoInfo } from '../../types/ProcessoInfo';

@Injectable()
export class AnalysisState {
  private readonly processoData = new BehaviorSubject({} as ProcessoInfo);

  public getProcessoData() {
    return this.processoData.asObservable();
  }
  public setProcessoData(processoData: ProcessoInfo) {
    this.processoData.next(processoData);
  }
}
