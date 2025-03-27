import {computed, inject, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from "@angular/material/snack-bar";
import {BehaviorSubject, catchError, filter, of, switchMap, tap} from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';
import {DataManipulationService} from './data-manipulation.service';
import {filterFormBatters, filterFormPitchers} from "./utils";

@Injectable({
    providedIn: 'root'
})
export class PistachioService {
    private http = inject(HttpClient);
    private snackBar = inject(MatSnackBar);
    loadingSignal: WritableSignal<boolean> = signal(false);

    private dataManipulationService = inject(DataManipulationService);

    private getBatterReportSubject = new BehaviorSubject<void>(undefined);
    getBatterReportAction = this.getBatterReportSubject.asObservable();

    private getPitcherReportSubject = new BehaviorSubject<void>(undefined);
    getPitcherReportAction = this.getPitcherReportSubject.asObservable();

    public runNotebook() {
        this.loadingSignal.set(true);
        filterFormBatters.reset({
            'search': '',
            'filterColumn': 'all',
            'flagged': false,
            'opsPlusPotentialHasPosition': false,
            'majorLeagueOnly': false
        });
        filterFormPitchers.reset({
            'search': '',
            'filterColumn': 'all',
            'flagged': false,
            'majorLeagueOnly': false
        });

        this.http.post('http://localhost:8080/runNotebook', {}, { responseType: 'text' }).pipe(
            tap((res: any) => {
                console.log(res);
                this.loadingSignal.set(false);
                this.snackBar.open(res, 'Dismiss', {
                    duration: 7500
                });
                this.sendGetBatterReport();
                this.sendGetPitcherReport();
            }),
            catchError((error) => {
                console.log(error);
                this.loadingSignal.set(false);
                this.snackBar.open(`Error: ${error}`, 'Dismiss');
                return of(error);
            })
        ).subscribe();
    }

    getBatterReport$ = this.getBatterReportAction.pipe(
        switchMap(() => {
            this.loadingSignal.set(true);

            return this.http.get('http://localhost:8080/getBatterReport', {responseType: "text"}).pipe(
                tap(res => {
                    this.loadingSignal.set(false);
                }),
                catchError((error) => {
                    this.loadingSignal.set(false);
                    console.log(error);
                    if (error.status != 404) {
                        this.snackBar.open(`Error: ${error.status}`, 'Dismiss');
                    }
                    return of(error);
                })
            );
        })
    );

    getPitcherReport$ = this.getPitcherReportAction.pipe(
        switchMap(() => {
            this.loadingSignal.set(true);

            return this.http.get('http://localhost:8080/getPitcherReport', {responseType: "text"}).pipe(
                tap(res => {
                    this.loadingSignal.set(false);
                }),
                catchError((error) => {
                    this.loadingSignal.set(false);
                    if (error.status != 404) {
                        this.snackBar.open(`Error: ${error.status}`, 'Dismiss');
                    }
                    return of(error);
                })
            )
        })
    );

    getBatterReportSignal: Signal<any> = toSignal(this.getBatterReport$, {initialValue: null});
    getPitcherReportSignal: Signal<any> = toSignal(this.getPitcherReport$, {initialValue: null});

    sendGetBatterReport() {
        this.getBatterReportSubject.next();
    }

    sendGetPitcherReport() {
        this.getPitcherReportSubject.next();
    }
}
