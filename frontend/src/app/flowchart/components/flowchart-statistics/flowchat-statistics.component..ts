import { Component, OnInit } from '@angular/core';
import { ProcessoStats } from '../../types/ProcessoStats';
import { ProcessoStatsApiService } from 'src/app/shared/services/stats-api.service';
// import { YourApiService } from './your-api.service'; // replace with your service

@Component({
  selector: 'flowchat-statistics',
  templateUrl: './flowchat-statistics.component.html',
  styleUrls: ['./flowchat-statistics.component.scss'],
})
export class FlowchartStatisticsComponent implements OnInit {
  dataFromApi: number[] = [];
  smallTexts = [
    'Quantidade de movimentos',
    'Quantidade de processos',
    'Número de grupos de processos',
    'Média de duração dos processos',
    'Média de movimentos por processo',
  ];

  descriptions = [
    'description 1',
    'description 2',
    'description 3',
    'description 4',
    'description 5 ',
  ];

  constructor(private apiService: ProcessoStatsApiService) {}

  ngOnInit(): void {
    this.apiService.getProcessStats().subscribe((data: ProcessoStats[]) => {
      this.dataFromApi = data && [
        data[0].movimentosCount,
        data[0].casesCount,
        data[0].avgCaseDuration,
        data[0].avgMovimentoDuration,
        data[0].avgMovimentosPerCase,
      ];
    });
  }
}
