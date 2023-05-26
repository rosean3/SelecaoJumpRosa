/* This is a "dumb" or "presentational" component. It receives data as an @Input() from a parent
component (in this case, probably from the AnalysisComponent) and displays the data in a table.
This component is not concerned with where the data comes from or how it's processed, only with
displaying it. */

import {
  Input,
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  AfterViewInit,
  OnInit,
  OnChanges,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
/*The MatTableDataSource, MatSort, and MatPaginator are classes from Angular Material
that help with presenting and interacting with the data in a table format. This includes
things like sorting the data and paginating it. */
import { Processo } from '../../types/Processo';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-analysis-table',
  templateUrl: './analysis-table.component.html',
  styleUrls: ['./analysis-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  /*The ChangeDetectionStrategy.OnPush setting improves performance by limiting change
  detection runs to only when the input data changes. */
})
export class AnalysisTableComponent
  implements OnInit, AfterViewInit, OnChanges
{
  @Input() data: readonly Processo[] = [];
  @Input() displayedColumns: string[] = [
    'NPU',
    'movimentos',
    'totalMovimentos',
    'duration',
  ];

  dataSource!: MatTableDataSource<Processo>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /*The ngOnInit and ngOnChanges lifecycle hooks update the table's data source whenever the
  component is initialized or its input data changes. The ngAfterViewInit lifecycle hook sets up
  the table's sorting functionality after the view is initialized. */

  ngOnInit(): void {
    const data = Object.assign([], this.data);
    this.dataSource = new MatTableDataSource(data);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    // TODO: Fix paginator
    // TODO: Sort not working on movimentos/totalMovimentos
  }

  ngOnChanges(): void {
    const data = Object.assign([], this.data);
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
  }
}
