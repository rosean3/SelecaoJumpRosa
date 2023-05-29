import { Injectable } from '@angular/core';
import { AnalysisState } from './state/analysis-state/analysis.state';
import { AnalysisApi } from './api/analysis.api';
import { Processo } from './types/Processo';
import { ProcessoInfo } from './types/ProcessoInfo';
import convertSecondsToTime from '../shared/utils/second-converter';

@Injectable()
export class AnalysisFacade {
  public constructor(
    private readonly state: AnalysisState,
    private readonly api: AnalysisApi
  ) {}

  public fetchProcessosData(name?: string) {
    if (!name) {
      name = '';
    }
    let processos: unknown = [];

    // ? if you want to test with mocked data, comment out the following lines:
    this.api.fetchProcessosDataByName(name).subscribe((processosData) => {
      if (!name) {
        processos = [];
      } else {
        const aux = processosData as Object;
        processos = aux['cases' as keyof typeof aux] as unknown;
      }
      const processoInfo: ProcessoInfo = {
        processName: name,
        processos: processos as Processo[],
      };

      if (processoInfo.processos) {
        processoInfo.processos = processoInfo.processos.map(
          (data: Processo) => {
            return {
              ...data,
              duration: [
                data.duration as number,
                convertSecondsToTime(data.duration as number),
              ],
            };
          }
        );
      }

      this.state.setProcessoData(processoInfo);
    });

    // ? if you want to test with mocked data, uncomment the following lines:
    // this.api.fetchProcessosData().subscribe((processosData) => {
    //   const processoInfo: ProcessoInfo = {
    //     processName: name,
    //     processos: processosData as Processo[],
    //   };
    //   if (processoInfo.processos) {
    //     processoInfo.processos = processoInfo.processos.map(
    //       (data: Processo) => {
    //         return {
    //           ...data,
    //           duration: [
    //             data.duration as number,
    //             convertSecondsToTime(data.duration as number),
    //           ],
    //         };
    //       }
    //     );
    //   }
    //   this.state.setProcessoData(processoInfo);
    // });
  }

  public getProcessoData() {
    return this.state.getProcessoData();
  }
}
