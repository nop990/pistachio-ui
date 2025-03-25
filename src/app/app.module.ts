import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MainMenuComponent} from './main-menu/main-menu.component';
import {MatButtonModule} from '@angular/material/button';
import {provideHttpClient} from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {BatterReportComponent} from './report-pages/batter-report/batter-report.component';
import {PitcherReportComponent} from './report-pages/pitcher-report/pitcher-report.component';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import {NgOptimizedImage} from "@angular/common";
import {OptionsMenuComponent} from './dialogs/options-menu/options-menu.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AdvancedFilterComponent } from './dialogs/advanced-filter/advanced-filter.component';
import { DisplayedColumnsComponent } from './dialogs/displayed-columns/displayed-columns.component';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    BatterReportComponent,
    PitcherReportComponent,
    OptionsMenuComponent,
    AdvancedFilterComponent,
    DisplayedColumnsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTabsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatIconModule,
    NgOptimizedImage,
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTooltipModule,
    MatDividerModule,
    MatCheckboxModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
