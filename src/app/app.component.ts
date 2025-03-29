import {Component, inject, Renderer2, Signal} from '@angular/core';
import {PistachioService} from './pistachio.service';
import {MatDialog} from '@angular/material/dialog';
import {OptionsMenuComponent} from './dialogs/options-menu/options-menu.component';
import {FlaggedComponent} from "./dialogs/flagged/flagged.component";
import {OptionsService} from "./dialogs/options-menu/options.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private pistachioService = inject(PistachioService);
  private optionsService = inject(OptionsService);
  private getOptionsSignal: Signal<any> = this.optionsService.getOptionsSignal;
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
      data: this.getOptionsSignal()
    });
  }

  openFlagged() {
    const dialogRef = this.dialog.open(FlaggedComponent, {
      width: '600px',
    });
  }

  refresh() {
    this.pistachioService.refresh();
  }
}
