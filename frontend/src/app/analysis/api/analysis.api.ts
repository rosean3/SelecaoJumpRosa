import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Processo } from '../types/Processo';
// import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AnalysisApi {
  constructor(private readonly http: HttpClient) {}

  public fetchProcessosDataByName(name: string) {
    return this.http.post<Processo[]>(
      `${environment.API_BASE_URL}/api/processos/`,
      {
        movimento: name,
      }
    );
  }
}
