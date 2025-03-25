import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, catchError, of, switchMap, tap} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {toSignal} from '@angular/core/rxjs-interop';
import * as toml from 'toml';
import {OptionsModel} from '../../models/options.model';
import {optionsForm} from '../../utils';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {
  private http = inject(HttpClient);
  private snackbar = inject(MatSnackBar);

  private GetOptionsSubject = new BehaviorSubject<void>(undefined);
  GetOptionsAction = this.GetOptionsSubject.asObservable();

  public sendGetOptions() {
    this.GetOptionsSubject.next();
  }

  getOptions$ = this.GetOptionsAction.pipe(
    switchMap(() => {
      return this.http.get('http://localhost:5000/getSettings', {responseType: "text"}).pipe(
        tap(res => {
          let response = toml.parse(res).Settings as OptionsModel;
          console.log(response);
          optionsForm.patchValue(response);
          return response;
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

  public getOptionsSignal = toSignal(this.getOptions$);

  setSettings(form: any) {
    return this.http.post('http://localhost:5000/setSettings', form.getRawValue()).pipe(
      tap((res: any) => {
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
