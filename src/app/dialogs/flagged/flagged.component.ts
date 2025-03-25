import {Component, DestroyRef, inject, OnChanges, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FlaggedService} from "./flagged.service";
import {flaggedForm} from "../../utils";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-flagged',
  standalone: false,
  templateUrl: './flagged.component.html',
  styleUrl: './flagged.component.scss'
})
export class FlaggedComponent {
  private dialogRef = inject(MatDialogRef);
  private destroyRef = inject(DestroyRef)
  private flaggedService = inject(FlaggedService);

  protected flaggedForm = flaggedForm;

  public getFlaggedSignal = this.flaggedService.getFlaggedSignal;

  loadFlagged() {
    this.flaggedService.sendGetFlagged();
  }

  saveFlagged() {
    this.flaggedService.setFlagged(this.flaggedForm).pipe(
        takeUntilDestroyed(this.destroyRef),
    ).subscribe();
  }

  close() {
    this.dialogRef.close();
  }
}
