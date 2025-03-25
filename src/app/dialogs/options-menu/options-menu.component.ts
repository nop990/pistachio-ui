import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, Signal} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {optionsForm} from '../../utils';
import {OptionsService} from './options.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-options-menu',
  standalone: false,
  templateUrl: './options-menu.component.html',
  styleUrl: './options-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionsMenuComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<OptionsMenuComponent>);
  readonly destroyRef = inject(DestroyRef);
  protected tooltipTextPath = 'e.g. C:\\Users\\chris\\Documents\\Out of the Park Developments\\OOTP Baseball 26\\saved_games\\Gunch 2.0.lg\\import_export\\csv';
  protected tooltipTextScout = 'Find this in your exported coaches.csv file'
  protected tooltipTextTeam = 'Find this on your Home > Settings page in-game'
  protected tooltipTextGB = 'Set this to 59 to only show GB and EX-GB, 54 for >= Neutral, or another number of your choosing'

  protected optionsForm = optionsForm;

  private optionsService = inject(OptionsService);

  public getOptionsSignal: Signal<any> = this.optionsService.getOptionsSignal;

  ngOnInit() {
    this.optionsService.sendGetOptions();
    console.log(this.getOptionsSignal())
  }

  constructor() {

  }

  apply() {
    this.optionsService.setSettings(optionsForm).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  close() {
    this.dialogRef.close();
  }

  protected readonly document = document;
}
