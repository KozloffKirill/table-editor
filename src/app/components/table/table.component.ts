import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TableDataService } from 'src/app/services/table-data.service';

export type Direction = 'up' | 'down';
export interface IReorderArgs {
  direction: Direction,
  index: number
}
export interface IEditValueArgs {
  propName: string,
  index: number,
  value: string
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy {

  private _destroy$ = new Subject();

  public tableRows: any[] = [];
  public columnNames: string[] = [];

  constructor(private _tableDataService: TableDataService) { }

  ngOnInit(): void {
    this._tableDataService.tableData.pipe(
      takeUntil(this._destroy$)
    ).subscribe(value => {
      this.tableRows = value;
      this._updateColumnNames();
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
  }

  public addRow() {
    this._tableDataService.addRow();
  }

  public removeRow(index: number) {
    this._tableDataService.removeRow(index);
  }

  public moveRow(index: number, direction: Direction) {
    this._tableDataService.moveRow({ index, direction })
  }

  public editValue(e: any, columnName: string, index: number) {
    const value: string = e.target.textContent;
    this._tableDataService.updateCellValue({ propName: columnName, index, value });
  }

  private _updateColumnNames() {
    if (this.tableRows.length) {
      this.columnNames = Object.keys(this.tableRows[0]);
    } else {
      this.columnNames = [];
    }
  }

}
