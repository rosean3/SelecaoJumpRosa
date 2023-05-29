import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { ProcessoStats } from 'src/app/flowchart/types/ProcessoStats';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProcessoStatsApiService {
  constructor(private readonly http: HttpClient) {}

  public getProcessStats() {
    return this.http
      .get<ProcessoStats[]>(`${environment.API_BASE_URL}/api/processos/stats/`)
      .pipe(take(1));
  }
}
