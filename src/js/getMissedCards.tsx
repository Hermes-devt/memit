
import {getDaysAfter1970} from './util';
import {UserData, CardsToRepeat} from '../interfaces';

export function getMissedCards( data: UserData, fromDaysPast: number){
  let schedule = [...data.schedule];
  let currentDay: number = getDaysAfter1970();
  let list = data.list;

  let missedList: {ID: number, done: boolean}[] = [];
  const scheduleLen = schedule.length, listLen = list.length;

  for( let i = 0; i< listLen; i++){
    let item = list[i];
    for( let index=1; index<scheduleLen; index++){
      let dayScheduled = item.onDay + schedule[index];

      if( (dayScheduled > (currentDay - fromDaysPast)) && (dayScheduled < currentDay) ){
        if(unique(data.missedCards, item.onDay)) 
          data.missedCards.push( { ID: item.onDay, done: false});
        break;
      }
    }
  }
  return missedList;
}

// interface missingCard { ID:number, done: boolean};
function unique( missingCards: CardsToRepeat[], ID: number) : boolean{
  for(let index=0; index<missingCards.length; index++){
    if( missingCards[index].ID === ID ) 
      return false;
  }
  return true;
}
