import { Component, OnInit, OnDestroy } from '@angular/core';
import { ImageApiService } from '../../shared/services/image-api.service';
import { SafeHtml } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import * as d3 from 'd3';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flowchart',
  templateUrl: './flowchart.component.html',
  styleUrls: ['./flowchart.component.scss'],
})
export class FlowchartComponent implements OnInit, OnDestroy {
  graph: SafeHtml | null = null;
  private subscription: Subscription | null = null;
  private teste: string = 'teste';

  constructor(
    private imageApiService: ImageApiService,
    private router: Router
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
              .attr('transform', 'translate(0, -10)');

            // Add a circle element with a border
            icon
              .append('circle')
              .attr('r', 10)
              .attr('fill', 'blue')
              .attr('stroke', 'white')
              .attr('stroke-width', 2)
              .attr('cx', x - 61)
              .attr('cy', y + 12);

            // Add a text element with a border to represent the icon
            icon
              .append('text')
              .text('i')
              .attr('fill', '#fff')
              .attr('stroke', 'white')
              .attr('stroke-width', 0.5)
              .attr('text-anchor', 'middle')
              .attr('dominant-baseline', 'middle')
              .attr('x', x - 61)
              .attr('y', y + 13);

            // ! Make a description appear here
            // icon.on('hover', function () {
            //   console.log(title);
            // });

            node.on('click', () => {
              self.router.navigate([`/analysis/${processNumber}`]);
            });
          });
        }, 0);
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
