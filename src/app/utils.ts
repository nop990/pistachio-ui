import {FormControl, FormGroup, Validators} from '@angular/forms';

export let optionsForm = new FormGroup({
  csv_path: new FormControl('', Validators.required),
  scout_id: new FormControl('', Validators.required),
  team_id: new FormControl(''),
})

export let filterForm = new FormGroup({
  search: new FormControl(''),
  filterColumn: new FormControl('all'),
  flagged: new FormControl(false),
  opsPlusPotentialHasPosition: new FormControl(false),
  majorLeagueOnly: new FormControl(false)
})

export let displayedColumnsBattersForm = new FormGroup({
  name: new FormControl(true),
  age: new FormControl(true),
  team: new FormControl(true),
  minor: new FormControl(true),
  pa: new FormControl(false),
  primaryPosition: new FormControl(true),
  recommendedPositions: new FormControl(true),
  bats: new FormControl(true),
  warOverall: new FormControl(true),
  hrOverall: new FormControl(true),
  obpOverall: new FormControl(true),
  opsPlusOverall: new FormControl(true),
  warPotential: new FormControl(true),
  hrPotential: new FormControl(true),
  obpPotential: new FormControl(true),
  opsPlusPotential: new FormControl(true),
  dhOverall: new FormControl(true),
  catcherOverall: new FormControl(true),
  firstBaseOverall: new FormControl(true),
  secondBaseOverall: new FormControl(true),
  thirdBaseOverall: new FormControl(true),
  shortstopOverall: new FormControl(true),
  leftFieldOverall: new FormControl(true),
  centerFieldOverall: new FormControl(true),
  rightFieldOverall: new FormControl(true),
  dhPotential: new FormControl(true),
  catcherPotential: new FormControl(true),
  firstBasePotential: new FormControl(true),
  secondBasePotential: new FormControl(true),
  thirdBasePotential: new FormControl(true),
  shortstopPotential: new FormControl(true),
  leftFieldPotential: new FormControl(true),
  centerFieldPotential: new FormControl(true),
  rightFieldPotential: new FormControl(true),
  offensiveWarOverall: new FormControl(true),
  offensiveWarPotential: new FormControl(true),
  catcherDefensiveWar: new FormControl(true),
  firstBaseDefensiveWar: new FormControl(true),
  secondBaseDefensiveWar: new FormControl(true),
  thirdBaseDefensiveWar: new FormControl(true),
  shortstopDefensiveWar: new FormControl(true),
  leftFieldDefensiveWar: new FormControl(true),
  centerFieldDefensiveWar: new FormControl(true),
  rightFieldDefensiveWar: new FormControl(true),
  flagged: new FormControl(true),
})

export let displayedColumnsPitchersForm = new FormGroup({
  name: new FormControl(true),
  age: new FormControl(true),
  team: new FormControl(true),
  minor: new FormControl(true),
  ip: new FormControl(false),
  throws: new FormControl(true),
  spOverall: new FormControl(true),
  rpOverall: new FormControl(true),
  spPotential: new FormControl(true),
  rpPotential: new FormControl(true),
  fipOverall: new FormControl(true),
  fipPotential: new FormControl(true),
  flagged: new FormControl(true),
})

export let displayedColumnsBatters: string[] = [
  'name', 'age', 'team', 'minor', 'pa', 'primaryPosition', 'recommendedPositions', 'bats', 'warOverall',
  'hrOverall', 'obpOverall', 'opsPlusOverall', 'warPotential', 'hrPotential', 'obpPotential', 'opsPlusPotential',
  'dhOverall', 'catcherOverall', 'firstBaseOverall', 'secondBaseOverall', 'thirdBaseOverall',
  'shortstopOverall', 'leftFieldOverall', 'centerFieldOverall', 'rightFieldOverall', 'dhPotential', 'catcherPotential',
  'firstBasePotential', 'secondBasePotential', 'thirdBasePotential', 'shortstopPotential', 'leftFieldPotential',
  'centerFieldPotential', 'rightFieldPotential', 'offensiveWarOverall', 'offensiveWarPotential', 'catcherDefensiveWar',
  'firstBaseDefensiveWar', 'secondBaseDefensiveWar', 'thirdBaseDefensiveWar', 'shortstopDefensiveWar', 'leftFieldDefensiveWar',
  'centerFieldDefensiveWar', 'rightFieldDefensiveWar', 'flagged'
];

export let displayedColumnsPitchers: string[] = [
  'name', 'age', 'team', 'minor', 'ip', 'throws', 'spOverall', 'rpOverall', 'spPotential', 'rpPotential',
  'fipOverall', 'fipPotential', 'flagged'
];

export let columnMapBatters: { [key: string]: { index: number, label: string } } = {
  'name': {index: 0, label: 'Name'},
  'age': {index: 1, label: 'Age'},
  'team': {index: 2, label: 'Team'},
  'minor': {index: 3, label: 'MiLB/INTL'},
  'pa': {index: 4, label: 'PA'},
  'primaryPosition': {index: 5, label: 'Primary Position'},
  'recommendedPositions': {index: 6, label: 'Recommended Positions'},
  'bats': {index: 7, label: 'Bats'},
  'warOverall': {index: 8, label: 'WAR'},
  'hrOverall': {index: 9, label: 'HR'},
  'obpOverall': {index: 10, label: 'OBP'},
  'opsPlusOverall': {index: 11, label: 'OPS+'},
  'warPotential': {index: 12, label: 'WAR POT'},
  'hrPotential': {index: 13, label: 'HR POT'},
  'obpPotential': {index: 14, label: 'OBP POT'},
  'opsPlusPotential': {index: 15, label: 'OPS+ POT'},
  'dhOverall': {index: 16, label: 'DH OVR'},
  'catcherOverall': {index: 17, label: 'C OVR'},
  'firstBaseOverall': {index: 18, label: '1B OVR'},
  'secondBaseOverall': {index: 19, label: '2B OVR'},
  'thirdBaseOverall': {index: 20, label: '3B OVR'},
  'shortstopOverall': {index: 21, label: 'SS OVR'},
  'leftFieldOverall': {index: 22, label: 'LF OVR'},
  'centerFieldOverall': {index: 23, label: 'CF OVR'},
  'rightFieldOverall': {index: 24, label: 'RF OVR'},
  'dhPotential': {index: 25, label: 'DH POT'},
  'catcherPotential': {index: 26, label: 'C POT'},
  'firstBasePotential': {index: 27, label: '1B POT'},
  'secondBasePotential': {index: 28, label: '2B POT'},
  'thirdBasePotential': {index: 29, label: '3B POT'},
  'shortstopPotential': {index: 30, label: 'SS POT'},
  'leftFieldPotential': {index: 31, label: 'LF POT'},
  'centerFieldPotential': {index: 32, label: 'CF POT'},
  'rightFieldPotential': {index: 33, label: 'RF POT'},
  'offensiveWarOverall': {index: 34, label: 'oWAR OVR'},
  'offensiveWarPotential': {index: 35, label: 'oWAR POT'},
  'catcherDefensiveWar': {index: 36, label: 'C dWAR'},
  'firstBaseDefensiveWar': {index: 37, label: '1B dWAR'},
  'secondBaseDefensiveWar': {index: 38, label: '2B dWAR'},
  'thirdBaseDefensiveWar': {index: 39, label: '3B dWAR'},
  'shortstopDefensiveWar': {index: 40, label: 'SS dWAR'},
  'leftFieldDefensiveWar': {index: 41, label: 'LF dWAR'},
  'centerFieldDefensiveWar': {index: 42, label: 'CF dWAR'},
  'rightFieldDefensiveWar': {index: 43, label: 'RF dWAR'},
  'flagged': {index: 44, label: 'Flagged'}
};

export let columnMapPitchers: { [key: string]: { index: number, label: string } } = {
  'name': {index: 0, label: 'Name'},
  'age': {index: 1, label: 'Age'},
  'team': {index: 2, label: 'Team'},
  'minor': {index: 3, label: 'MiLB/INTL'},
  'ip': {index: 4, label: 'IP'},
  'throws': {index: 5, label: 'Throws'},
  'spOverall': {index: 6, label: 'SP OVR'},
  'rpOverall': {index: 7, label: 'RP OVR'},
  'spPotential': {index: 8, label: 'SP POT'},
  'rpPotential': {index: 9, label: 'RP POT'},
  'fipOverall': {index: 10, label: 'FIP OVR'},
  'fipPotential': {index: 11, label: 'FIP POT'},
  'flagged': {index: 12, label: 'Flagged'}
};

export function formatData(element: string, column: string) {
  switch (column) {
    case 'team':
      return element === 'Free' ? 'Free Agent' : element;
    case 'minor':
      return element === '1' ? `<i class="mdi mdi-check"></i>` : '';
    case 'primaryPosition':
    case 'recommendedPositions':
      return element.toUpperCase();
    case 'flagged':
      return element ? `<i class="mdi mdi-flag"></i>` : '';
    case 'spOverall':
    case 'rpOverall':
    case 'spPotential':
    case 'rpPotential':
    case 'fipOverall':
    case 'fipPotential':
      return parseFloat(element).toFixed(2);
    default:
      return element;
  }
}

export function getTooltip(column: string) {
  switch (column) {
    case 'warOverall':
    case 'warPotential':
      return 'At the primary position';
    default:
      return '';
  }
}
