import { Injectable } from '@angular/core';
import { AnalysisState } from './state/analysis-state/analysis.state';
import { AnalysisApi } from './api/analysis.api';
import { Processo } from './types/Processo';

@Injectable()
export class AnalysisFacade {
  public constructor(
    private readonly state: AnalysisState,
    private readonly api: AnalysisApi
  ) {}

  // public fetchProcessosData() {
  //   this.api.fetchProcessosData().subscribe((processosData) => {
  //     this.state.setProcessoData(processosData);
  //     console.log('processosData: ', processosData);
  //   });
  // }

  public fetchProcessosData() {
    this.api.fetchProcessosDataByName('A9').subscribe((processosData) => {
      //! fix the gambiarra
      const aux = processosData as Object;
      const aux2 = aux['cases' as keyof typeof aux] as unknown;
      this.state.setProcessoData(aux2 as Processo[]);
      console.log('processosData: ', aux2);
    });
  }

  public getProcessoData() {
    return this.state.getProcessoData();
  }
}
