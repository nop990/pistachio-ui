import {Component, DestroyRef, inject} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-advanced-filter',
  standalone: false,
  templateUrl: './advanced-filter.component.html',
  styleUrl: './advanced-filter.component.scss'
})
export class AdvancedFilterComponent {
  private dialogRef = inject(MatDialogRef);
  private destroyRef = inject(DestroyRef);

  close() {
    this.dialogRef.close();
  }
}
