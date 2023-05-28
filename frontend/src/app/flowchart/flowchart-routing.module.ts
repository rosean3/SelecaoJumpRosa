import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlowchartComponent } from './pages/flowchart.component';

const routes: Routes = [
  {
    path: 'graph',
    component: FlowchartComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlowchartRoutingModule {}
