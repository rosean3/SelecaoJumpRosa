import { Component, Input } from '@angular/core';
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
