
// import {Day, UserData} from '../interfaces/userData';
import {Day, UserData} from '../interfaces';

export function cardsToRepeat( data: UserData, dayToRepeat: number): Day[]{
  let dailyNotes = data.list;
  let schedule = data.schedule;

  let todayCards:any = [];

  if( !dailyNotes ) return todayCards;

  for( let index = 0; index < dailyNotes.length - 1; index++){
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
