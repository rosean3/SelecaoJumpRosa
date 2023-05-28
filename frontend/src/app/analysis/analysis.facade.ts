import { Injectable } from '@angular/core';
import { AnalysisState } from './state/analysis-state/analysis.state';
import { AnalysisApi } from './api/analysis.api';
import { Processo } from './types/Processo';
import { ProcessoInfo } from './types/ProcessoInfo';

@Injectable()
export class AnalysisFacade {
  public constructor(
    private readonly state: AnalysisState,
    private readonly api: AnalysisApi
  ) {}

  public fetchProcessosData(name?: string) {
    if (!name) name = 'A9';
    this.api.fetchProcessosDataByName(name).subscribe((processosData) => {
      const aux = processosData as Object;
      const processos = aux['cases' as keyof typeof aux] as unknown;
      const processoInfo: ProcessoInfo = {
        processName: name,
        processos: processos as Processo[],
      };
      this.state.setProcessoData(processoInfo);
    });
  }

  public getProcessoData() {
    return this.state.getProcessoData();
  }
}
