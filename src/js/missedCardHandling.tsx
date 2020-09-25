
import {getDaysAfter1970} from './util';
import {iUserData, iCardsToRepeat} from '../templatesTypes';

export function getMissedCards( data: iUserData, fromDaysPast: number){
  let schedule = [...data.schedule];
  let currentDay: number = getDaysAfter1970();
  let list = data.list;

  let missedList: {ID: number, done: boolean}[] = [];

  for( let i = 0, listLen=list.length; i< listLen; i++){
    let item = list[i];
    for( let index=1, scheduleLen=schedule.length; index<scheduleLen; index++){
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

export function removeMissedCardsThatIsCompleted(dataObj: iUserData){
  let length = dataObj.missedCards.length-1;
  for(let i=length; i>= 0; i--){
    if( dataObj.missedCards[i].done === true ){
      dataObj.missedCards.splice(i, 1); }
  }
}

export function moveUncheckedDailyCardsToMissedCardsList(dataObj: iUserData){
  let missed = dataObj.dailyCards.filter( (cards:any)=> !cards.done);
  missed.forEach( (item:any)=>{
    let exists = false;
    dataObj.missedCards.forEach( ({ID}:any)=>{ 
      if( ID === item.ID ){ exists = true;} 
    })
    if(!exists) dataObj.missedCards.push(item);
  })
}

export function getAllMissedCardsFromThePastDays(dataObj: iUserData){
  const daysSinceLastUse = getDaysAfter1970() - dataObj.lastUse.date;
  getMissedCards(dataObj, daysSinceLastUse );
  dataObj.lastUse.date = getDaysAfter1970();
}

export function removeMissedCardsThatsMatchAcurrentDailyCard( dataObj: iUserData){
  for(let i=dataObj.missedCards.length -1; i>=0; i--){
    let match = false;
    dataObj.dailyCards.forEach( (card:any)=>{ if( dataObj.missedCards[i].ID === card.ID ) match = true; });
    if( match ) dataObj.missedCards.splice(i, 1);
  }
}

// interface missingCard { ID:number, done: boolean};
function unique( missingCards: iCardsToRepeat[], ID: number) : boolean{
  for(let index=0; index<missingCards.length; index++){
    if( missingCards[index].ID === ID ) 
      return false;
  }
  return true;
}
