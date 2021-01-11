

export const SETDATA = 'SETDATA';
export interface dataType{
  list: any[];
  dailyCards: any[];
  lastUse: {date: number};
  missedCards: any;
  schedule: number[];
}

export interface Data{
  type: typeof SETDATA,
  payload: any,
  // payload: dataType,
};

export const SETSCHEDULE = 'SETSCHEDULE';
export interface Schedule{
  type: typeof SETSCHEDULE;
  payload: any
}


export type DataActionTypes = Data | Schedule;

