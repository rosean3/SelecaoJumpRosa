import { Input, Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-flow-graph',
  templateUrl: './flow-graph.component.html',
  styleUrls: ['./flow-graph.component.scss'],
})
export class FlowGraphComponent {
  @Input() graph: any = null;
}
