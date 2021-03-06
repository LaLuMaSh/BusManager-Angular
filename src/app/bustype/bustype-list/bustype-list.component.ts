import {Component, OnInit, ViewChild} from '@angular/core';
import {BusType} from '../../../_model/bus';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatSort, MatTableDataSource} from '@angular/material';
import {BusService} from '../../../_services/bus.service';

@Component({
  selector: 'bm-bustype-list',
  templateUrl: './bustype-list.component.html',
  styleUrls: ['./bustype-list.component.css', '../../../_styles/expandable-table-style.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class BustypeListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'capacity', 'recoveryTime', 'maxRange', 'distancePerH'];
  expandedElement: BusType | null;
  @ViewChild(MatSort) sort: MatSort;
  private dataSource: MatTableDataSource<BusType>;

  constructor(private busService: BusService) {
  }

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.busService.getBusTypes().subscribe(value => {
      this.dataSource = new MatTableDataSource(value);
      this.dataSource.sort = this.sort;
    });
  }
}
