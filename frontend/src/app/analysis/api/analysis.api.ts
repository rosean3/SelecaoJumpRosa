import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Processo } from '../types/Processo';
// import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';

@Injectable()
export class AnalysisApi {
  constructor(private readonly http: HttpClient) {}

  range = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  public fetchProcessosData() {
    return of(
      this.range.map((i) => {
        return {
          NPU: (456907 + i).toString(),
          movimentosCount: i,
          duration: i > 5 ? i * 300 : i * 10000,
          pinnedMovimentoCount: i,
        } as Processo;
      }) as Processo[]
    );
  }

  public fetchProcessosDataByName(name: string) {
    return this.http.post<Processo[]>(
      `${environment.API_BASE_URL}/api/processos/`,
      {
        movimento: name,
      }
    );
  }
}
