import {AfterViewInit, ChangeDetectorRef, Component, inject, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {BatterReport} from '../../models/batter-report.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {
    columnMapBatters,
    displayedColumnsBatters,
    displayedColumnsBattersForm,
    filterFormBatters,
    formatData,
    getTooltip, optionsForm
} from '../../utils';
import {MatDialog} from '@angular/material/dialog';
import {AdvancedFilterComponent} from '../../dialogs/advanced-filter/advanced-filter.component';
import {DisplayedColumnsComponent} from '../../dialogs/displayed-columns/displayed-columns.component';
import {OptionsService} from "../../dialogs/options-menu/options.service";

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
    protected filterForm = filterFormBatters;

    private cdr = inject(ChangeDetectorRef);
    private dialog = inject(MatDialog);
    private optionsService = inject(OptionsService);

    @ViewChild(MatPaginator) set paginator(paginator: MatPaginator) {
        this.localPaginator = paginator;
        this.data.paginator = this.localPaginator;
    };

    @ViewChild(MatSort) sort!: MatSort;

    displayedColumns = displayedColumnsBatters;
    columnsMap = columnMapBatters;
    filterAbleColumns = this.displayedColumns.filter(column =>
        column !== 'team' && column !== 'flagged' && column !== 'minor'
    ).slice(0, 44);

    private optionsSignal = this.optionsService.getOptionsSignal;
    public window = window;

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
        let filteredData = this.data.data.filter(batter => this.applyFilters(batter));
        this.data = new MatTableDataSource(filteredData);
        this.ngOnChanges();
    }

    private applyFilters(batter: BatterReport): boolean {
        return this.filterByTeam(batter) &&
            this.filterBySearch(batter) &&
            this.filterByFlagged(batter) &&
            this.filterByOpsPlusPotential(batter) &&
            this.filterByMajorLeagueOnly(batter);
    }

    private filterByTeam(batter: BatterReport): boolean {
        let teamSearch = this.filterForm.controls.team.value ? this.filterForm.controls.team.value : '';
        return teamSearch === '' || formatData(batter['team'], 'team').toLowerCase() === teamSearch.toLowerCase();

    }

    private filterBySearch(batter: BatterReport): boolean {
        let search = this.filterForm.controls.search.value!;
        let filterColumn = this.filterForm.controls.filterColumn.value!;
        if (search === '') return true;

        if (filterColumn === 'all') {
            return Object.values(batter).some(value => value?.toString().toLowerCase().includes(search.toLowerCase()));
        }

        if (filterColumn === 'recommendedPositions' || filterColumn === 'primaryPosition') {
            return this.filterByPosition(batter, search, filterColumn);
        }

        // @ts-ignore
        return batter[filterColumn]?.toString().toLowerCase().includes(search.toLowerCase());
    }

    private filterByPosition(batter: BatterReport, search: string, filterColumn: string): boolean {
        let searchTerms = search.toLowerCase().split(',').map(term => term.trim());
        // @ts-ignore
        let positions = batter[filterColumn].toLowerCase().split(',').map(pos => pos.trim());

        if (search.toLowerCase() === 'of') {
            return ['lf', 'cf', 'rf'].some(pos => positions.includes(pos));
        } else if (search.toLowerCase() === 'if') {
            return ['2b', '3b', 'ss'].some(pos => positions.includes(pos));
        }

        return searchTerms.every(term => positions.includes(term));
    }

    private filterByFlagged(batter: BatterReport): boolean {
        let flaggedBool = this.filterForm.controls.flagged.value!;
        return !flaggedBool || batter.flagged;
    }

    private filterByOpsPlusPotential(batter: BatterReport): boolean {
        let opsPlusPotentialHasPositionBool = this.filterForm.controls.opsPlusPotentialHasPosition.value!;
        return !opsPlusPotentialHasPositionBool || batter.opsPlusPotentialHasPosition > 0;
    }

    private filterByMajorLeagueOnly(batter: BatterReport): boolean {
        let majorLeagueOnlyBool = this.filterForm.controls.majorLeagueOnly.value!;
        return !majorLeagueOnlyBool || batter.minor.toString() !== '1';
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
