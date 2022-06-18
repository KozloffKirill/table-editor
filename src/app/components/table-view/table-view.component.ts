import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CSVHelper } from 'src/app/helpers/csv.helper';
import { TableDataService } from 'src/app/services/table-data.service';

export type DataFormat = 'JSON' | 'CSV';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject();

  @ViewChild('file') file!: ElementRef;

  /**
   * Textarea data
   *
   * @type {string}
   * @memberof TableViewComponent
   */
  public stringData: string = '';

  /**
   * Allow file loading flag
   *
   * @type {boolean}
   * @memberof TableViewComponent
   */
  public allowFileLoading: boolean = false;
  
  /**
   * Allow uploading flag
   *
   * @type {boolean}
   * @memberof TableViewComponent
   */
  public allowUploading: boolean = false;

  /**
   * Creates an instance of TableViewComponent
   * 
   * @param {TableDataService} _tableDataService
   * @memberof TableViewComponent
   */
  constructor(private _tableDataService: TableDataService) { }

  /**
   * ngOnInit lifecycle hook
   *
   * @memberof TableViewComponent
   */
  ngOnInit(): void {
    this._tableDataService.stringData.pipe(
      takeUntil(this._destroy$)
    ).subscribe(value => {
      this.stringData = value;
    });

    this._tableDataService.tableData.pipe(
      takeUntil(this._destroy$)
    ).subscribe(value => {
      this.allowUploading = value?.length > 0;
      console.log(CSVHelper.arrayToCSV(value));
    });
  }

  /**
   * ngOnDestroy lifecycle hook
   *
   * @memberof TableViewComponent
   */
  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  /**
   * Uploads file
   *
   * @memberof TableViewComponent
   */
  public loadFromFile() {
    const file = this.file?.nativeElement?.files[0];
    this._tableDataService.loadFromFile(file);

  }

  /**
   * Loads data from textarea
   *
   * @memberof TableViewComponent
   */
  public loadTableData() {
    this._tableDataService.setStringData(this.stringData);
  }

  /**
   * Input file change handler
   *
   * @param {Event} event
   * @memberof TableViewComponent
   */
  public fileChanged(event: Event) {
    this.allowFileLoading = this.file?.nativeElement?.files?.length > 0;
  }

  /**
   * Updates data for textarea
   *
   * @param {DataFormat} format
   * @memberof TableViewComponent
   */
  public uploadStringData(format: DataFormat) {
    this._tableDataService.updateStringData(format);
  }
}
