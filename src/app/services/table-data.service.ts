import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataFormat } from '../components/table-view/table-view.component';
import { IEditValueArgs, IReorderArgs } from '../components/table/table.component';
import { CSVHelper } from '../helpers/csv.helper';

@Injectable({
  providedIn: 'root'
})
export class TableDataService {

  private _stringData$ = new BehaviorSubject<string>('[{"key1":"k1v1","key2":"k2v1","key3":"k3v1"},{"key1":"k1v2","key2":"k2v2","key3":"k3v2"},{"key1":"k1v3","key2":"k2v3","key3":"k3v3"}]');
  private _tableData$ = new BehaviorSubject<any[]>([]);
  private _columnNames: string[] = [];

  /**
   * Table data property
   *
   * @readonly
   * @memberof TableDataService
   */
  public get tableData() {
    return this._tableData$.asObservable();
  }

  /**
   * Creates an instance of TableDataService
   * 
   * @memberof TableDataService
   */
  constructor() { }

  /**
   * String data property
   *
   * @readonly
   * @memberof TableDataService
   */
  public get stringData() {
    return this._stringData$.asObservable();
  }

  /**
   * Set string data
   *
   * @param {string} value
   * @memberof TableDataService
   */
  public setStringData(value: string) {
    this._stringData$.next(value);
    this._setTableData();
  }

  /**
   * Updates string data
   *
   * @param {DataFormat} format
   * @memberof TableDataService
   */
  public updateStringData(format: DataFormat) {
    if (format == 'JSON') {
      this._stringData$.next(JSON.stringify(this._tableData$.getValue()));
    } else {
      this._stringData$.next(CSVHelper.arrayToCSV(this._tableData$.getValue()));
    }
  }

  /**
   * Set table data
   *
   * @private
   * @memberof TableDataService
   */
  private _setTableData() {
    if (this._isJSON(this._stringData$.getValue())) {
      this._tableData$.next(JSON.parse(this._stringData$.getValue()));
      this._setColumnNames();
    } else
      if (CSVHelper.isCSV(this._stringData$.getValue())) {
        this._tableData$.next(CSVHelper.CSVToArray(this._stringData$.getValue()));
        this._setColumnNames();
      } else
        alert('The input data must be in JSON or CSV format!');
  }

  /**
   * JSON check
   *
   * @private
   * @param {string} value
   * @return {*}  {boolean}
   * @memberof TableDataService
   */
  private _isJSON(value: string): boolean {
    try {
      JSON.parse(value);
    } catch {
      return false;
    }
    return true;
  }

  /**
   * Set column names
   *
   * @private
   * @memberof TableDataService
   */
  private _setColumnNames() {
    this._columnNames = Object.keys(this._tableData$.getValue()[0]);
  }

  /**
   * Loads data from file
   *
   * @param {File} file
   * @memberof TableDataService
   */
  public loadFromFile(file: File) {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (typeof result == 'string') {
          this.setStringData(result);
        }
      }
      reader.readAsText(file);
    }
  }

  /**
   * Adds row to dataset
   *
   * @memberof TableDataService
   */
  public addRow() {
    const data = this._tableData$.getValue();
    let obj: any = {};
    this._columnNames.forEach((item) => {
      obj[item] = item;
    });
    data.push(obj);
    this._tableData$.next(data);
  }

  /**
   * Removes row from dataset
   *
   * @param {number} index
   * @memberof TableDataService
   */
  public removeRow(index: number) {
    const tableData = this._tableData$.getValue();
    tableData.splice(index, 1);
    this._tableData$.next(tableData);
  }

  /**
   * Move row in data
   *
   * @param {IReorderArgs} param
   * @memberof TableDataService
   */
  public moveRow(param: IReorderArgs) {
    let data = this._tableData$.getValue();
    if (param.direction == 'up' && param.index > 0) {
      let newData = data.slice(0, param.index - 1);
      newData.push(data[param.index], data[param.index - 1]);
      newData = newData.concat(data.slice(param.index + 1));
      this._tableData$.next(newData);
    }
    if (param.direction == 'down' && param.index != data.length - 1 && param.index >= 0) {
      let newData = data.slice(param.index + 2);
      newData.unshift(data[param.index + 1], data[param.index]);
      newData = data.slice(0, param.index).concat(newData);
      console.log(newData);
      this._tableData$.next(newData);
    }
  }

  /**
   * Alternative move row in data
   *
   * @param {IReorderArgs} param
   * @memberof TableDataService
   */
  public moveRow2(param: IReorderArgs) {
    const data = this._tableData$.getValue();
    if (param.direction == 'up' && param.index != 0) {
      const value = data[param.index - 1];
      data[param.index - 1] = data[param.index];
      data[param.index] = value;
    }
    if (param.direction == 'down' && param.index != data.length - 1) {
      const value = data[param.index + 1];
      data[param.index + 1] = data[param.index];
      data[param.index] = value;
    }
  }

  /**
   * Updates cell value
   *
   * @param {IEditValueArgs} param
   * @memberof TableDataService
   */
  public updateCellValue(param: IEditValueArgs) {
    const data = this._tableData$.getValue();
    data[param.index][param.propName] = param.value.trim();
  }

}