
import {iUserData} from '../templatesTypes';
import {cardsToRepeat} from './cardsToRepeat';
import {getDaysAfter1970} from '../js/util'

export function save(data: iUserData){
  const obj: iUserData = {
    list: data.list,
    dailyCards: data.dailyCards,
    lastUse: data.lastUse,
    schedule: data.schedule,
    missedCards: data.missedCards,
    laterLearnings: data.laterLearnings,
    dailyNotes: data.dailyNotes,
    note: data.note,
  }

  localStorage.setItem( "dailyNotes", JSON.stringify(obj) ); 
  // console.log('saving to localstorage:', obj);
}

export function cleanListFromPastEmptyDays(dataObj: iUserData){
  //Skip the newly inserted day.
  const length = dataObj.list.length  - 2;
  for( let i=length; i>= 0; i--){
    let item = dataObj.list[i];
    if( item.questions === '' && item.answers === '')
      dataObj.list.splice( i, 1);
  }
}

export function cleanlistFromUserInput(dataObj: iUserData){
  dataObj.list.forEach( (item:any)=>{
    if( 'userInput' in item ){
      delete item.userInput;
    }
  });
}


interface DailyCards { ID: number, done: boolean }

export function setDailyCards(dataObj: iUserData,){
  let todayCards = cardsToRepeat( dataObj, getDaysAfter1970() );
  dataObj.dailyCards = todayCards.map( (card:any): DailyCards => ({ID: card.onDay, done: false}));

  // const notReverse = true;
  // if( notReverse ){
  //   dataObj.dailyCards = todayCards.map( (card:any): DailyCards => ({ID: card.onDay, done: false}));
  // }

  // else{
    //map to the new datastructure
    // let dailys: DailyCards[] = todayCards.map( (card:any): DailyCards => ({ID: card.onDay, done: false}));

    // //Reverse the array so the newly learnt knowledge is in the fist place. 
    // let reverseDailys: DailyCards[] = dailys.reverse();

    // dataObj.dailyCards = [...reverseDailys];
    // console.log('dailyCads', dataObj.dailyCards);
    // dataObj.dailyCards = todayCards.map( (card:any): DailyCards => ({ID: card.onDay, done: false}));
  // }
}
































