import {Component, computed, inject, OnInit, Signal} from '@angular/core';
import {PistachioService} from '../pistachio.service';
import {MatTableDataSource} from '@angular/material/table';
import {DataManipulationService} from '../data-manipulation.service';
import {of} from 'rxjs';
import {BatterReport} from "../models/batter-report.model";
import {PitcherReport} from "../models/pitcher-report.model";

@Component({
  selector: 'app-main-menu',
  standalone: false,
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss'
})
export class MainMenuComponent implements OnInit {
  pistachioService = inject(PistachioService);
  dataManipulationService = inject(DataManipulationService);
  loadingSignal = this.pistachioService.loadingSignal;
  getBatterReportSignal: Signal<MatTableDataSource<BatterReport>> = this.pistachioService.getBatterReportSignal;
  getPitcherReportSignal: Signal<MatTableDataSource<PitcherReport>> = this.pistachioService.getPitcherReportSignal;

  ngOnInit() {

  }


}
