import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AnalysisFacade } from '../../analysis.facade';
import { Processo } from '../../types/Processo';
import { ActivatedRoute } from '@angular/router';
import { ProcessoInfo } from '../../types/ProcessoInfo';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss'],
})
export class AnalysisComponent implements OnChanges {
  selectedMovimento: string = '';
  processoInfo: ProcessoInfo | null = null;
  processoList: Processo[] = [];
  id: string | null = null;
  isLoading: boolean = true;

  constructor(
    private readonly facade: AnalysisFacade,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) this.facade.fetchProcessosData('A' + this.id);

      this.facade.getProcessoData().subscribe((processoData: ProcessoInfo) => {
        this.processoList = processoData.processos
          ? processoData.processos
          : [];
        this.processoInfo = processoData;
        if (this.processoInfo?.processName) {
          this.selectedMovimento = this.processoInfo.processName;
        }
        if (this.selectedMovimento) this.isLoading = false;
        if (!this.id) this.isLoading = false;
      });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isLoading = true;
  }
}
