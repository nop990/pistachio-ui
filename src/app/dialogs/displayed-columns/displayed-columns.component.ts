import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, OnInit} from '@angular/core';
import {
  columnMapBatters,
  columnMapPitchers,
  displayedColumnsBatters,
  displayedColumnsBattersForm,
  displayedColumnsPitchers, displayedColumnsPitchersForm
} from '../../utils';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DisplayedColumnsService} from './displayed-columns.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-displayed-columns',
  standalone: false,
  templateUrl: './displayed-columns.component.html',
  styleUrl: './displayed-columns.component.scss'
})
export class DisplayedColumnsComponent implements OnInit {
  private type = inject(MAT_DIALOG_DATA);
  private displayedColumnsService = inject(DisplayedColumnsService);
  private dialogRef = inject(MatDialogRef<DisplayedColumnsComponent>);
  private destroyRef = inject(DestroyRef);

  protected columnMap;
  protected displayedColumns;
  protected displayedColumnsForm;
  protected displayedColumnsSignal = this.displayedColumnsService.getDisplayedColumnsSignal;

  ngOnInit() {
  }

  constructor() {
    if(this.type === 'batters') {
      this.columnMap = columnMapBatters;
      this.displayedColumns = displayedColumnsBatters;
      this.displayedColumnsForm = displayedColumnsBattersForm;
    } else {
      this.columnMap = columnMapPitchers;
      this.displayedColumns = displayedColumnsPitchers;
      this.displayedColumnsForm = displayedColumnsPitchersForm;
    }
  }

  clearColumns() {
    Object.keys(this.displayedColumnsForm.controls).forEach((key: string) => {
      if (key !== 'name') {
        // @ts-ignore
        this.displayedColumnsForm.controls[key].setValue(false);
      }
    });
  }

  enableAllColumns() {
    Object.keys(this.displayedColumnsForm.controls).forEach((key: string) => {
      // @ts-ignore
      this.displayedColumnsForm.controls[key].setValue(true);
    });
  }

  saveColumns() {
    let columns = '';
    Object.keys(this.displayedColumnsForm.controls).filter(key => {
      // @ts-ignore
      if(this.displayedColumnsForm.controls[key].value) {
        columns = columns + ',' + key;
      }
    });
    columns = columns.slice(1, columns.length);
    this.displayedColumnsService.setColumns(columns, this.type).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  loadColumns() {
    this.displayedColumnsService.sendGetDisplayedColumns(this.type);
  }

  close() {
    this.dialogRef.close();
  }

  stopSortingMyKeyValuesPlease() {
    return 0;
  }
}
