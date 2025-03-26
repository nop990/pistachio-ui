import {Component, inject, Renderer2, Signal} from '@angular/core';
import {PistachioService} from './pistachio.service';
import {MatDialog} from '@angular/material/dialog';
import {OptionsMenuComponent} from './dialogs/options-menu/options-menu.component';
import {FlaggedComponent} from "./dialogs/flagged/flagged.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private pistachioService = inject(PistachioService);
  isDarkMode = true;

  private renderer = inject(Renderer2);
  private dialog = inject(MatDialog);

  constructor() {
    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode = savedTheme === 'dark';
    this.updateTheme();
  }

  runNotebook() {
    this.pistachioService.runNotebook();
  }

  changeTheme() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.updateTheme();
  }

  updateTheme() {
    if (this.isDarkMode) {
      this.renderer.addClass(document.body, 'dark');
    } else {
      this.renderer.removeClass(document.body, 'dark');
    }
  }

  openOptions() {
    const dialogRef = this.dialog.open(OptionsMenuComponent, {
      height: '400px',
      width: '600px',
    });
  }

  openFlagged() {
    const dialogRef = this.dialog.open(FlaggedComponent, {
      width: '600px',
    });
  }

  refresh() {
    this.pistachioService.sendGetBatterReport();
    this.pistachioService.sendGetPitcherReport();
  }
}
