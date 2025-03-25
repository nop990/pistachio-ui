import {AfterViewInit, ChangeDetectorRef, Component, inject, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {PitcherReport} from '../../models/pitcher-report.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {
  columnMapPitchers,
  displayedColumnsPitchers,
  displayedColumnsPitchersForm,
  filterForm, formatData, getTooltip
} from "../../utils";
import {AdvancedFilterComponent} from '../../dialogs/advanced-filter/advanced-filter.component';
import {DisplayedColumnsComponent} from '../../dialogs/displayed-columns/displayed-columns.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-pitcher-report',
  standalone: false,
  templateUrl: './pitcher-report.component.html',
  styleUrl: './pitcher-report.component.scss'
})
export class PitcherReportComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() data: MatTableDataSource<any> = new MatTableDataSource<PitcherReport>();
  @Input() originalData: MatTableDataSource<PitcherReport, MatPaginator> = new MatTableDataSource();
  protected localPaginator: MatPaginator = new MatPaginator();
  protected filterForm = filterForm;

  private cdr = inject(ChangeDetectorRef);
  private dialog = inject(MatDialog);

  @ViewChild(MatPaginator) set paginator(paginator: MatPaginator) {
    this.localPaginator = paginator;
    this.data.paginator = this.localPaginator;
  };

  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns = displayedColumnsPitchers;
  columnsMap = columnMapPitchers;

  ngOnInit() {
    displayedColumnsPitchersForm.valueChanges.subscribe(() => {
      this.ngOnChanges();
    });
  }

  constructor() {
  }

  ngOnChanges() {
    this.enableDisableColumns();
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
      maxHeight: '400px',
      maxWidth: '700px',
      minHeight: '400px',
      data: 'pitchers'
    })
  }

  enableDisableColumns() {
    this.displayedColumns = [];
    Object.keys(displayedColumnsPitchersForm.controls).forEach((key) => {
      // @ts-ignore
      if (displayedColumnsPitchersForm.controls[key]!.value) {
        this.displayedColumns.push(key.toString());
      }
    });
  }

  protected readonly formatData = formatData;
  protected readonly getTooltip = getTooltip;
}
