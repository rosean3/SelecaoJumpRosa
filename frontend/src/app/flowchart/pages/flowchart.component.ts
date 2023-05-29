import { Component, OnInit, OnDestroy } from '@angular/core';
import { ImageApiService } from '../../shared/services/image-api.service';
import { SafeHtml } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import * as d3 from 'd3';
import { Router } from '@angular/router';
import { ProcessoStatsApiService } from 'src/app/shared/services/stats-api.service';
import convertSecondsToTime from 'src/app/shared/utils/second-converter';
import { ProcessoStats } from '../types/ProcessoStats';

@Component({
  selector: 'app-flowchart',
  templateUrl: './flowchart.component.html',
  styleUrls: ['./flowchart.component.scss'],
})
export class FlowchartComponent implements OnInit, OnDestroy {
  graph: SafeHtml | null = null;
  dataFromApi: any = [];
  isLoading: number = 2;
  private subscription: Subscription | null = null;

  constructor(
    private imageApiService: ImageApiService,
    private router: Router,
    private apiService: ProcessoStatsApiService
  ) {}

  ngOnInit() {
    this.subscription = this.imageApiService
      .getFlowGraph()
      .subscribe((graph: SafeHtml) => {
        this.graph = graph;
        setTimeout(() => {
          const svg = d3.select('svg');

          const self = this;

          svg.selectAll('.node').each(function () {
            // Get the node and its title
            const node = d3.select(this);
            const processTitle = node.select('a').attr('xlink:title');
            const processNumber = processTitle.slice(1);
            const x = parseInt(node.select('text').attr('x'));
            const y = parseInt(node.select('text').attr('y'));

            // Create an SVG group (g) for the icon, and translate it to the desired position
            const icon = node
              .append('g')
              .attr('transform', `translate(${x - 61}, ${y + 3})`);

            // Add a circle element with a border
            icon
              .append('circle')
              .attr('r', 10)
              .attr('fill', 'blue')
              .attr('stroke', 'white')
              .attr('stroke-width', 2);

            // Add a text element with a border to represent the icon
            icon
              .append('text')
              .text('i')
              .attr('fill', '#fff')
              .attr('stroke', 'white')
              .attr('stroke-width', 0.5)
              .attr('text-anchor', 'middle')
              .attr('dominant-baseline', 'middle');

            // Add mouseover event handler
            icon.on('mouseover', function () {
              icon.style('cursor', 'pointer');
            });

            // On clic, navigate to the corresponding analysis page
            icon.on('click', function () {
              self.router.navigate([`/analysis/${processNumber}`]);
            });
          });
        }, 0);
        this.isLoading--;
      });

    this.apiService.getProcessStats().subscribe((data: ProcessoStats[]) => {
      this.dataFromApi = data && [
        data[0].movimentosCount,
        data[0].casesCount,
        data[0].avgCaseDuration,
        convertSecondsToTime(data[0].avgMovimentoDuration),
        data[0].avgMovimentosPerCase,
      ];
      this.isLoading--;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.isLoading = 2;
  }
}
