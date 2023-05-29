import { Component, Input, OnInit } from '@angular/core';
import { ProcessoStats } from '../../types/ProcessoStats';
import { ProcessoStatsApiService } from 'src/app/shared/services/stats-api.service';
import convertSecondsToTime from 'src/app/shared/utils/second-converter';
// import { YourApiService } from './your-api.service'; // replace with your service

@Component({
  selector: 'flowchat-statistics',
  templateUrl: './flowchat-statistics.component.html',
  styleUrls: ['./flowchat-statistics.component.scss'],
})
export class FlowchartStatisticsComponent {
  @Input() dataFromApi: any = null;

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
}
