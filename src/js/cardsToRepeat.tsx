
// import {Day, UserData} from '../interfaces/userData';
// import {Day, UserData} from '../interfaces';

import {iDay, iUserData} from '../templatesTypes';
import OPEARATORS from '../js/operators';
//includeToday was added because the schedule component wants to have todays day included also

export function cardsToRepeat( data: iUserData, dayToRepeat: number, includeToday=false): iDay[]{
  let dailyNotes = data.list;
  let schedule = data.schedule;
  let todayCards:any = [];

  if( !dailyNotes ) return todayCards;

  let len = dailyNotes.length - 1;
  const OP = OPEARATORS();
  let operation = includeToday ? '<=' : '<';
  for( let index = 0; OP[operation](index, len); index++){
    let noteNr = dailyNotes[index].onDay;

    for( let i=0; i<schedule.length;i++){
      let cardRepeatDay = noteNr + schedule[i];
      if( dayToRepeat === cardRepeatDay ){ 
        todayCards.push( dailyNotes[index] );
        break;
      }
    }
  }
  return todayCards;
}


export default{
  cardsToRepeat,
}
