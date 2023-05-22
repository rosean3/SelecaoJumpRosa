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
import { Processo } from '../../types/Processo';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-analysis-table',
  templateUrl: './analysis-table.component.html',
  styleUrls: ['./analysis-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalysisTableComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() data: readonly Processo[] = [];
  @Input() displayedColumns: string[] = [
    'NPU', 'movimentos', 'totalMovimentos', 'duration'
  ];

  dataSource!: MatTableDataSource<Processo>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

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
