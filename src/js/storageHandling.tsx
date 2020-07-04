
import {UserData} from '../interfaces';
import {cardsToRepeat} from './cardsToRepeat';
import {getDaysAfter1970} from '../js/util'

export function save(data: UserData){
  const obj: UserData = {
    list: data.list,
    dailyCards: data.dailyCards,
    lastUse: data.lastUse,
    schedule: data.schedule,
    missedCards: data.missedCards,
    laterLearnings: data.laterLearnings,
  }
  localStorage.setItem( "dailyNotes", JSON.stringify(obj) ); 
  // console.log('saving to localstorage:', obj);
}

export function cleanListFromPastEmptyDays(dataObj: UserData){
  //Skip the newly inserted day.
  const length = dataObj.list.length  - 2;
  for( let i=length; i>= 0; i--){
    let item = dataObj.list[i];
    if( item.questions === '' && item.answers === '')
      dataObj.list.splice( i, 1);
  }
}

export function cleanlistFromUserInput(dataObj: UserData){
  dataObj.list.forEach( (item:any)=>{
    if( 'userInput' in item ){
      console.log( item.userInput);
      delete item.userInput;
    }
  });
}


interface DailyCards { ID: number, done: boolean }

export function setDailyCards(dataObj: UserData,){
  let todayCards = cardsToRepeat( dataObj, getDaysAfter1970() );
  dataObj.dailyCards = todayCards.map( (card:any): DailyCards => ({ID: card.onDay, done: false}));
}
































