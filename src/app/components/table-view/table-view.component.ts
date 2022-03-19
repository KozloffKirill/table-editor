import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TableDataService } from 'src/app/services/table-data.service';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject();

  @ViewChild('file') file!: ElementRef;

  public stringData: string = '';

  public allowFileLoading: boolean = false;
  public allowUploading: boolean = false;

  constructor(private _tableDataService: TableDataService) { }

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
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
  }

  public loadFromFile() {
    const file = this.file?.nativeElement?.files[0];
    this._tableDataService.loadFromFile(file);

  }

  public loadTableData() {
    this._tableDataService.setStringData(this.stringData);
  }

  public downloadTableData() {
    this._tableDataService.updateStringData();
  }

  public fileChanged(event: Event) {
    this.allowFileLoading = this.file?.nativeElement?.files?.length > 0;
  }

  public uploadTableData() {
    this._tableDataService.updateStringData();
  }
}
