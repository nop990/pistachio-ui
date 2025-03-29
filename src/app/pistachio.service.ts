import {computed, effect, inject, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {HttpClient, httpResource} from '@angular/common/http';
import {MatSnackBar} from "@angular/material/snack-bar";
import {catchError, of, tap} from 'rxjs';
import {filterFormBatters, filterFormPitchers} from "./utils";
import {BatterReport} from "./models/batter-report.model";
import {PitcherReport} from "./models/pitcher-report.model";
import {MatTableDataSource} from "@angular/material/table";

@Injectable({
    providedIn: 'root'
})
export class PistachioService {
    private http = inject(HttpClient);
    private snackBar = inject(MatSnackBar);
    loadingSignal: WritableSignal<boolean> = signal(false);

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
            }),
            catchError((error) => {
                console.log(error);
                this.loadingSignal.set(false);
                this.snackBar.open(`Error: ${error}`, 'Dismiss');
                return of(error);
            })
        ).subscribe();
    }

    private batterReportUrl = 'http://localhost:8080/getBatterReport'
    private batterReportResource = httpResource<BatterReport[]>(this.batterReportUrl);

    getBatterReportSignal: Signal<MatTableDataSource<BatterReport>> = computed(() => new MatTableDataSource(this.batterReportResource.value()) ?? [])


    private pitcherReportUrl = 'http://localhost:8080/getPitcherReport'
    private pitcherReportResource = httpResource<PitcherReport[]>(this.pitcherReportUrl);

    getPitcherReportSignal: Signal<MatTableDataSource<PitcherReport>> = computed(() => new MatTableDataSource(this.pitcherReportResource.value()) ?? [])

    refresh() {
        this.loadingSignal.set(true);

        this.batterReportResource.reload();
        this.pitcherReportResource.reload();

        this.loadingSignal.set(false);
    }
}
