import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BehaviorSubject, catchError, of, switchMap, tap} from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';
import {displayedColumnsBattersForm, displayedColumnsPitchersForm} from '../../utils';

@Injectable({
  providedIn: 'root'
})
export class DisplayedColumnsService {
  private http = inject(HttpClient);
  private snackbar = inject(MatSnackBar);

  private GetDisplayedColumnsSubject = new BehaviorSubject<string>('');
  GetDisplayedColumnsAction = this.GetDisplayedColumnsSubject.asObservable();

  public sendGetDisplayedColumns(type: string) {
    this.GetDisplayedColumnsSubject.next(type);
  }

  getDisplayedColumns$ = this.GetDisplayedColumnsAction.pipe(
    switchMap((type) => {
      let endpoint;
      if (type === 'batters') {
        endpoint = 'getBatterColumns';
      } else if (type === 'pitchers') {
        endpoint = 'getPitcherColumns';
      } else {
        return of();
      }
      return this.http.get('/' + endpoint, {responseType: "text"}).pipe(
        tap(res => {
          this.detectColumns(res, type);
          this.snackbar.open('Columns loaded', 'Dismiss', {
            duration: 7500
          });
        }),
        catchError((error) => {
          console.log(error);
          if (error.status != 404) {
            this.snackbar.open(`Error: ${error.status}`, 'Dismiss');
          }
          return of(error);
        })
      );
    }));

  getDisplayedColumnsSignal = toSignal(this.getDisplayedColumns$);

  detectColumns(columnsTxt: string, type: string) {
    let columns = columnsTxt.split(',');
    let form;

    if (type === 'batters') {
      form = displayedColumnsBattersForm;
    } else {
      form = displayedColumnsPitchersForm;
    }

    Object.keys(form.controls).forEach((key: string) => {
      // @ts-ignore
      form.controls[key].setValue(false);
    })

    for (let column of columns) {
      Object.keys(form.controls).forEach((key: string) => {
        if (key === column) {
          // @ts-ignore
          form.controls[key].setValue(true);
        }
      });
    }
  }

  setColumns(columns: any, type: string) {
    let endpoint;
    if (type === 'batters') {
      endpoint = 'setBatterColumns';
    } else if (type === 'pitchers') {
      endpoint = 'setPitcherColumns';
    }

    console.log(columns);

    return this.http.post('/' + endpoint, columns).pipe(
      tap((res: any) => {
        console.log(res);
        this.snackbar.open(res, 'Dismiss', {
          duration: 7500
        });
      }),
      catchError((error) => {
        this.snackbar.open(`Error: ${error}`, 'Dismiss');
        return of(error);
      })
    );
  }
}
