import {AfterViewInit, ChangeDetectorRef, Component, inject, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {BatterReport} from '../../models/batter-report.model';
import {MatTableDataSource} from '@angular/material/table';
import {DataManipulationService} from '../../data-manipulation.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {
  columnMapBatters,
  displayedColumnsBatters,
  displayedColumnsBattersForm,
  filterForm,
  formatData,
  getTooltip
} from '../../utils';
import {MatDialog} from '@angular/material/dialog';
import {AdvancedFilterComponent} from '../../dialogs/advanced-filter/advanced-filter.component';
import {DisplayedColumnsComponent} from '../../dialogs/displayed-columns/displayed-columns.component';

@Component({
  selector: 'app-batter-report',
  standalone: false,
  templateUrl: './batter-report.component.html',
  styleUrl: './batter-report.component.scss'
})
export class BatterReportComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() data: MatTableDataSource<BatterReport, MatPaginator> = new MatTableDataSource();
  @Input() originalData: MatTableDataSource<BatterReport, MatPaginator> = new MatTableDataSource();
  protected localPaginator: MatPaginator = new MatPaginator();
  protected filterForm = filterForm;

  private cdr = inject(ChangeDetectorRef);
  private dialog = inject(MatDialog);

  @ViewChild(MatPaginator) set paginator(paginator: MatPaginator) {
    this.localPaginator = paginator;
    this.data.paginator = this.localPaginator;
  };

  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns = displayedColumnsBatters;
  columnsMap = columnMapBatters;

  ngOnInit() {
    displayedColumnsBattersForm.valueChanges.subscribe(() => {
      this.ngOnChanges();
    });
  }

  constructor() {

  }

  ngOnChanges() {
    this.enableDisableColumns()
    this.data.sort = this.sort;
    this.data.paginator = this.localPaginator;
    this.cdr.detectChanges();
  }

  ngAfterViewInit() {
    this.data.sort = this.sort;
    this.data.paginator = this.localPaginator;
  }

  filterData() {
    this.data = new MatTableDataSource(this.originalData.data);
    let filteredData = this.data.data.filter((batter) => {
      let search: string = this.filterForm.controls.search.value!
      let filterColumn: string = this.filterForm.controls.filterColumn.value!
      let flaggedBool: boolean = this.filterForm.controls.flagged.value!
      let opsPlusPotentialHasPositionBool: boolean = this.filterForm.controls.opsPlusPotentialHasPosition.value!
      let majorLeagueOnlyBool: boolean = this.filterForm.controls.majorLeagueOnly.value!

      if (search != '' && filterColumn === 'all') {
        let searchLower = search.toLowerCase();
        let found = false;
        for (let key in batter) {
          // @ts-ignore
          if (batter[key] && batter[key].toString().toLowerCase().includes(searchLower)) {
            found = true;
            break;
          }
        }
        if (!found) {
          return false;
        }
      } else if (search != '') {
        let searchLower = search.toLowerCase();
        // @ts-ignore
        if (!batter[filterColumn] || !batter[filterColumn].toString().toLowerCase().includes(searchLower)) {
          return false;
        }
      }

      if (flaggedBool && !batter.flagged) {
        return false;
      }

      if (opsPlusPotentialHasPositionBool && batter.opsPlusPotentialHasPosition <= 0) {
        return false;
      }

      if (majorLeagueOnlyBool && batter.minor.toString() === '1') {
        return false;
      }

      return true;
    })
    this.data = new MatTableDataSource(filteredData)
    this.ngOnChanges()
  }

  openAdvancedFilterDialog() {
    this.dialog.open(AdvancedFilterComponent, {
      height: '600px',
      width: '800px'
    })
  }

  openDisplayedColumnsDialog() {
    this.dialog.open(DisplayedColumnsComponent, {
      maxHeight: '700px',
      maxWidth: '700px',
      minHeight: '700px',
      data: 'batters'
    })
  }

  enableDisableColumns() {
    this.displayedColumns = [];
    Object.keys(displayedColumnsBattersForm.controls).forEach((key) => {
      // @ts-ignore
      if (displayedColumnsBattersForm.controls[key]!.value) {
        this.displayedColumns.push(key.toString());
      }
    });
  }

  protected readonly formatData = formatData;
  protected readonly getTooltip = getTooltip;
}
