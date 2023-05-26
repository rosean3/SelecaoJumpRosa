import { Component } from '@angular/core';
import { AnalysisFacade } from '../../analysis.facade';
import { Processo } from '../../types/Processo';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss'],
})
export class AnalysisComponent {
  selectedMovimento: string = 'Expedição de movimento';
  processoList: Processo[] = [];

  constructor(private readonly facade: AnalysisFacade) {
    facade.getProcessoData().subscribe((processoData: any) => {
      console.log('analysis component: ' + processoData);
      this.processoList = processoData;
    });
  }
}
