
import {getDaysAfter1970} from './util';
import {iCardsToRepeat, iUserClass, iList} from '../templatesTypes';

interface iMissedCard {
  ID: number;
  done: boolean;
}
export function getMissedCards( data: iUserClass, fromDaysPast: number): iMissedCard[]{
  let schedule = [...data.data.schedule];
  let currentDay: number = getDaysAfter1970();
  let list: iList = data.get.list();

  let missedList: iMissedCard[] = [];

  for( let i = 0, listLen=list.length; i< listLen; i++){
    let item = list[i];
    for( let index=1, scheduleLen=schedule.length; index<scheduleLen; index++){
      let dayScheduled = item.created + schedule[index];
      if( (dayScheduled > (currentDay - fromDaysPast)) && (dayScheduled < currentDay) ){
        if(unique(data.data.missedCards, item.cardID)) 
          data.data.missedCards.push( { ID: item.cardID, done: false});
        break;
      }
    }
  }
  return missedList;
}

export function removeMissedCardsThatIsCompleted(userObj: iUserClass){
  let length = userObj.data.missedCards.length-1;
  for(let i=length; i>= 0; i--){
    if( userObj.data.missedCards[i].done === true ){
      userObj.data.missedCards.splice(i, 1); }
  }
}

export function moveUncheckedDailyCardsToMissedCardsList(dataObj: iUserClass){
  let missed = dataObj.get.todaysCardToRepeat().filter( (cards:any)=> {
    return !cards.done;
  })
  missed.forEach( (item:any)=>{
    let exists = false;
    dataObj.data.missedCards.forEach( ({ID}:any)=>{ 
      if( ID === item.ID ){ exists = true;} 
    })
    if(!exists) dataObj.data.missedCards.push(item);
  })
}

export function getAllMissedCardsFromThePastDays(dataObj: iUserClass){
  const daysSinceLastUse = getDaysAfter1970() - dataObj.data.lastUse.date;
  getMissedCards(dataObj, daysSinceLastUse );
  dataObj.data.lastUse.date = getDaysAfter1970();
}

export function removeMissedCardsThatsMatchAcurrentDailyCard( dataObj:iUserClass){
  for(let i=dataObj.data.missedCards.length -1; i>=0; i--){
    let match = false;
    dataObj.data.dailyCards.forEach( (card:any)=>{ 
      if( dataObj.data.missedCards[i].ID === card.ID ) 
        match = true; 
    });
    if( match ) {
      dataObj.data.missedCards.splice(i, 1);
    }
  }
}

function unique( missingCards: iCardsToRepeat[], ID: number) : boolean{
  for(let index=0; index<missingCards.length; index++){
    if( missingCards[index].ID === ID ) 
      return false;
  }
  return true;
}
