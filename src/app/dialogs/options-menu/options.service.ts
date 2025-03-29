import {computed, inject, Injectable, Signal} from '@angular/core';
import {HttpClient, httpResource} from '@angular/common/http';
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

    private getOptionsUrl = 'http://localhost:8080/getSettings';
    private getOptionsResource = httpResource<OptionsModel>(this.getOptionsUrl);
    public getOptionsSignal: Signal<OptionsModel> = computed(() => this.getOptionsResource.value() ?? {
        csv_path: '',
        scout_id: '',
        team_id: '',
        gb_weight: ''
    });

    refresh() {
        this.getOptionsResource.reload();
    }

    setSettings(form: any) {
        return this.http.post('http://localhost:8080/setSettings', form.getRawValue(), {responseType: "text"}).pipe(
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
