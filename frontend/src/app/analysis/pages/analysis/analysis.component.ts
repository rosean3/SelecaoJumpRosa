import { Component, OnInit } from '@angular/core';
import { AnalysisFacade } from '../../analysis.facade';
import { Processo } from '../../types/Processo';
import { ActivatedRoute } from '@angular/router';
import { ProcessoInfo } from '../../types/ProcessoInfo';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss'],
})
export class AnalysisComponent implements OnInit {
  selectedMovimento: string = 'A9';
  processoInfo: ProcessoInfo | null = null;
  processoList: Processo[] = [];
  id: string | null = null;

  constructor(
    private readonly facade: AnalysisFacade,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) this.facade.fetchProcessosData('A' + this.id);

      facade.getProcessoData().subscribe((processoData: ProcessoInfo) => {
        this.processoList = processoData.processos
          ? processoData.processos
          : [];
        this.processoInfo = processoData;
      });
    });
  }
  ngOnInit(): void {
    if (this.id) this.selectedMovimento = 'A' + this.id;
    else if (this.processoInfo?.processName)
      this.selectedMovimento = this.processoInfo.processName;
  }
}
