import {Component, computed, inject, OnInit, Signal} from '@angular/core';
import {PistachioService} from '../pistachio.service';
import {MatTableDataSource} from '@angular/material/table';
import {DataManipulationService} from '../data-manipulation.service';
import {of} from 'rxjs';

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
  getBatterReportSignal = this.pistachioService.getBatterReportSignal;
  getPitcherReportSignal = this.pistachioService.getPitcherReportSignal;
  batterData = computed(() => new MatTableDataSource(this.dataManipulationService.readBatterCsvDataToObject(this.getBatterReportSignal())));
  pitcherData = computed(() => new MatTableDataSource(this.dataManipulationService.readPitcherCsvDataToObject(this.getPitcherReportSignal())));

  ngOnInit() {
    this.pistachioService.sendGetBatterReport();
    this.pistachioService.sendGetPitcherReport();
  }


}
