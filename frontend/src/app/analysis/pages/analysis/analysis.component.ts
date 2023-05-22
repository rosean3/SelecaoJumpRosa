import { Component } from '@angular/core';
import { AnalysisFacade } from '../../analysis.facade';
import { Processo } from '../../types/Processo';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent {
  selectedMovimento: string = 'Expedição de movimento';
  processoList: Processo[] = [];

  constructor() {
    facade.getProcessoData().subscribe((processoData) => {
      this.processoList = processoData;
    });
  }
}
