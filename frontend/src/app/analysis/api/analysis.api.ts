import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Processo } from '../types/Processo';
import { of } from 'rxjs';

const API_BASE_URL = 'http://localhost:8000';

@Injectable()
export class AnalysisApi {
  constructor(private readonly http: HttpClient) {}

  // public fetchProcessosData() {
  //   return of([
  //     {
  //       NPU: '0000000-00.0000.0.00.0000',
  //       totalMovimentos: 1,
  //       totalDuration: 10,
  //     },
  //     {
  //       NPU: '0000000-00.0000.0.00.0001',
  //       totalMovimentos: 2,
  //       totalDuration: 20,
  //     },
  //     {
  //       NPU: '0000000-00.0000.0.00.0002',
  //       totalMovimentos: 3,
  //       totalDuration: 30,
  //     },
  //     {
  //       NPU: '0000000-00.0000.0.00.0003',
  //       totalMovimentos: 4,
  //       totalDuration: 40,
  //     },
  //     {
  //       NPU: '0000000-00.0000.0.00.0004',
  //       totalMovimentos: 5,
  //       totalDuration: 50,
  //     },
  //     {
  //       NPU: '0000000-00.0000.0.00.0005',
  //       totalMovimentos: 6,
  //       totalDuration: 60,
  //     },
  //   ] as Processo[]);
  // }

  // public fetchProcessosDataByName(name: string) {
  //   return this.http.get<Processo[]>(`${API_BASE_URL}/api/processos/${name}/`);
  // }

  public fetchProcessosDataByName(name: string) {
    return this.http.post<Processo[]>(`${API_BASE_URL}/api/processos/`, {
      movimento: name,
    });
  }
}
