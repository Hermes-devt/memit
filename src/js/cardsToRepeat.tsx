

import {iUserClass, iList} from '../templatesTypes';
import OPEARATORS from '../js/operators';

//includeToday was added because the schedule component wants to have todays day included also
export function cardsToRepeat( data: iUserClass, dayToRepeat: number, includeToday=false): iList{
  let dailyNotes: iList = data.get.list();
  let schedule: number[] = data.get.schedule();
  let todayCards: iList = [];
  if( !dailyNotes ) return todayCards;

  let len = dailyNotes.length - 1;
  const OP = OPEARATORS();
  let operation = includeToday ? '<=' : '<';

  for( let index = 0; OP[operation](index, len); index++){
    let noteNr = dailyNotes[index].created;

    for( let i=0; i<schedule.length;i++){
      let cardRepeatDay = noteNr + schedule[i];
      if( dayToRepeat === cardRepeatDay ){ 
        if( 'cardSetting' in dailyNotes[index] && 'pause' in (dailyNotes[index].cardSetting || {}) )
          break;
        todayCards.push( dailyNotes[index] );
        break;
      }
    }
  }
  return todayCards;
}

export default cardsToRepeat;
