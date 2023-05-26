import { Injectable } from '@angular/core';
import { AnalysisState } from './state/analysis-state/analysis.state';
import { AnalysisApi } from './api/analysis.api';

@Injectable()
export class AnalysisFacade {
  public constructor(
    private readonly state: AnalysisState,
    private readonly api: AnalysisApi
  ) {}

  public fetchProcessosData() {
    this.api.fetchProcessosData().subscribe((processosData) => {
      this.state.setProcessoData(processosData);
    });
  }
  /*when you fetch a new processosData, you have to set a new state */

  public getProcessoData() {
    return this.state.getProcessoData();
  }
}
