import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableComponent } from './components/table/table.component';
import { TableViewComponent } from './components/table-view/table-view.component';
import { PreventLinebreakDirective } from './directives/prevent-linebreak.directive';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    TableViewComponent,
    PreventLinebreakDirective
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
