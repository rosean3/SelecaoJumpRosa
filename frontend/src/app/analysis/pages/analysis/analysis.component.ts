import { Component, OnInit } from '@angular/core';
import { AnalysisFacade } from '../../analysis.facade';
import { Processo } from '../../types/Processo';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss'],
})
export class AnalysisComponent implements OnInit {
  selectedMovimento: string = 'A9';
  processoList: Processo[] = [];
  id: string | null = null;

  constructor(
    private readonly facade: AnalysisFacade,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      if (this.id) this.facade.fetchProcessosData('A' + this.id);

      facade.getProcessoData().subscribe((processoData: any) => {
        this.processoList = processoData;
      });
    });
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log('this.id: ', this.id);
      if (this.id) this.selectedMovimento = 'A' + this.id;
    });
  }
}
