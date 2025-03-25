import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, catchError, of, switchMap, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {toSignal} from "@angular/core/rxjs-interop";
import {flaggedForm} from "../../utils";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
})
export class FlaggedService {
    private http = inject(HttpClient);
    private snackbar = inject(MatSnackBar);

    private GetFlaggedSubject = new BehaviorSubject<void>(undefined);
    GetFlaggedAction = this.GetFlaggedSubject.asObservable();

    sendGetFlagged() {
        this.GetFlaggedSubject.next();
    }

    GetFlagged$ = this.GetFlaggedAction.pipe(
        switchMap(() => {
            return this.http.get('http://localhost:5000/getFlagged', {responseType: "text"}).pipe(
                tap(res => {
                    flaggedForm.controls['flaggedPlayers'].setValue(res);
                    if(res.split('\n').length > 0 && res.split('\n').length < 16) {
                        flaggedForm.controls['rows'].setValue(res.split('\n').length.toString());
                    } else {
                        flaggedForm.controls['rows'].setValue('15');
                    }

                }),
                catchError(err => {
                    console.error(err);
                    if (err.status != 404) {
                        this.snackbar.open(`Error: ${err.status}`, 'Dismiss');
                    }
                    return of();
                }),
            );
        })
    )

    public getFlaggedSignal = toSignal(this.GetFlagged$);

    setFlagged(form: any) {
        return this.http.post('http://localhost:5000/setFlagged', form.controls.flaggedPlayers.value).pipe(
            tap((res: any) => {
                this.snackbar.open(res, 'Dismiss', {
                    duration: 7500
                });
            }),
            catchError(err => {
                console.error(err);
                return of();
            }),
        );
    }
}
