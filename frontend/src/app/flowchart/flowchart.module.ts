import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlowchartComponent } from './pages/flowchart.component';
import { FlowchartRoutingModule } from './flowchart-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FlowchartStatisticsComponent } from './components/flowchart-statistics/flowchat-statistics.component.';
import { MatCardModule } from '@angular/material/card';
import { FlowGraphComponent } from './components/flow-graph/flow-graph.component';

@NgModule({
  providers: [],
  declarations: [
    FlowchartComponent,
    FlowchartStatisticsComponent,
    FlowGraphComponent,
  ],
  imports: [
    CommonModule,
    FlowchartRoutingModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
  ],
})
export class FlowchartModule {}
