import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TableDataService } from 'src/app/services/table-data.service';

export type Direction = 'up' | 'down';

/**
 * Reorder row args interface
 *
 * @export
 * @interface IReorderArgs
 */
export interface IReorderArgs {
  direction: Direction,
  index: number
}

/**
 * Edit value args interface
 *
 * @export
 * @interface IEditValueArgs
 */
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

  /**
   * Table rows
   *
   * @type {any[]}
   * @memberof TableComponent
   */
  public tableRows: any[] = [];

  /**
   * Column names
   *
   * @type {string[]}
   * @memberof TableComponent
   */
  public columnNames: string[] = [];

  /**
   * Creates an instance of TableComponent
   * 
   * @param {TableDataService} _tableDataService
   * @memberof TableComponent
   */
  constructor(private _tableDataService: TableDataService) { }

  /**
   * ngOnInit lifecycle hook
   *
   * @memberof TableComponent
   */
  ngOnInit(): void {
    this._tableDataService.tableData.pipe(
      takeUntil(this._destroy$)
    ).subscribe(value => {
      this.tableRows = value;
      this._updateColumnNames();
    });
  }

  /**
   * ngOnDestroy lifecycle hook
   *
   * @memberof TableComponent
   */
  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  /**
   * Row adding handler
   *
   * @memberof TableComponent
   */
  public addRow() {
    this._tableDataService.addRow();
  }

  /**
   * Row removing handler
   *
   * @param {number} index
   * @memberof TableComponent
   */
  public removeRow(index: number) {
    this._tableDataService.removeRow(index);
  }

  /**
   * Row reordering handler
   *
   * @param {number} index
   * @param {Direction} direction
   * @memberof TableComponent
   */
  public moveRow(index: number, direction: Direction) {
    this._tableDataService.moveRow({ index, direction })
  }

  /**
   * Table cell edit handler
   *
   * @param {*} e
   * @param {string} columnName
   * @param {number} index
   * @memberof TableComponent
   */
  public editValue(e: any, columnName: string, index: number) {
    const value: string = e.target.textContent;
    this._tableDataService.updateCellValue({ propName: columnName, index, value });
  }

  /**
   * Updates column names
   *
   * @private
   * @memberof TableComponent
   */
  private _updateColumnNames() {
    if (this.tableRows.length) {
      this.columnNames = Object.keys(this.tableRows[0]);
    } else {
      this.columnNames = [];
    }
  }

}
