import {Injectable} from '@angular/core';
import {BatterReport} from './models/batter-report.model';
import {PitcherReport} from './models/pitcher-report.model';
import Papa from 'papaparse';

@Injectable({
  providedIn: 'root'
})
export class DataManipulationService {
 readBatterCsvDataToObject(data: string): BatterReport[] {
    if (data != null) {
      let batterData: BatterReport[] = [];
      let dataArr = data.split('\n');
      dataArr.shift();
      dataArr.pop();
      data = dataArr.join('\n');

      Papa.parse(data, {
        header: false,
        complete: (results) => {
          batterData = results.data.map((row: any) => ({
            name: row[0],
            age: Number(row[1]),
            team: row[2],
            minor: row[3],
            pa: Number(row[4]),
            warOverall: Number(row[5]),
            primaryPosition: row[6],
            recommendedPositions: row[7],
            bats: row[8],
            hr_650: Number(row[9]),
            hrOverall: Number(row[10]),
            obpOverall: Number(row[11]),
            opsPlusOverall: Number(row[12]),
            warPotential: Number(row[13]),
            hrPotential: Number(row[14]),
            obpPotential: Number(row[15]),
            opsPlusPotential: Number(row[16]),
            opsPlusPotentialHasPosition: Number(row[17]),
            dhOverall: Number(row[18]),
            catcherOverall: Number(row[19]),
            firstBaseOverall: Number(row[20]),
            secondBaseOverall: Number(row[21]),
            thirdBaseOverall: Number(row[22]),
            shortstopOverall: Number(row[23]),
            leftFieldOverall: Number(row[24]),
            centerFieldOverall: Number(row[25]),
            rightFieldOverall: Number(row[26]),
            dhPotential: Number(row[27]),
            catcherPotential: Number(row[28]),
            firstBasePotential: Number(row[29]),
            secondBasePotential: Number(row[30]),
            thirdBasePotential: Number(row[31]),
            shortstopPotential: Number(row[32]),
            leftFieldPotential: Number(row[33]),
            centerFieldPotential: Number(row[34]),
            rightFieldPotential: Number(row[35]),
            offensiveWarOverall: Number(row[36]),
            offensiveWarPotential: Number(row[37]),
            catcherDefensiveWar: Number(row[39]),
            firstBaseDefensiveWar: Number(row[40]),
            secondBaseDefensiveWar: Number(row[41]),
            thirdBaseDefensiveWar: Number(row[42]),
            shortstopDefensiveWar: Number(row[43]),
            leftFieldDefensiveWar: Number(row[44]),
            centerFieldDefensiveWar: Number(row[45]),
            rightFieldDefensiveWar: Number(row[46]),
            flagged: row[48] === 'flagged'
          }));
        }
      });

      return batterData;
    } else return [];
  }

  readPitcherCsvDataToObject(data: string): PitcherReport[] {
    if (data != null) {
      let pitcherData: PitcherReport[] = [];
      let dataArr = data.split('\n');
      dataArr.shift();
      dataArr.pop();
      data = dataArr.join('\n');

      Papa.parse(data, {
        header: false,
        complete: (results) => {
          pitcherData = results.data.map((row: any) => ({
            name: row[0],
            age: Number(row[1]),
            team: row[2],
            minor: row[3],
            ip: row[4],
            throws: row[5],
            spOverall: Number(row[6]),
            rpOverall: Number(row[7]),
            spPotential: Number(row[8]),
            rpPotential: Number(row[9]),
            fipOverall: Number(row[10]),
            fipPotential: Number(row[11]),
            flagged: row[12] === 'flagged'
          }));
        }
      });

      return pitcherData;
    } else return [];
  }
}
