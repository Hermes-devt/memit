
import {iUserClass} from '../templatesTypes';
import {cardsToRepeat} from './cardsToRepeat';
import {getDaysAfter1970} from '../js/util'

export function save(data: any){
  const {list, dailyCards, lastUse, schedule, missedCards, laterLearnings, dailyNotes, note, settings} = data.data;
  const obj: any = {
    list,
    dailyCards,
    lastUse,
    schedule,
    missedCards,
    laterLearnings,
    dailyNotes,
    note,
    settings,
  }
  // const obj: any = {
  //   list: data.data.list,
  //   dailyCards: data.data.dailyCards,
  //   lastUse: data.data.lastUse,
  //   schedule: data.data.schedule,
  //   missedCards: data.data.missedCards,
  //   laterLearnings: data.data.laterLearnings,
  //   dailyNotes: data.data.dailyNotes,
  //   note: data.data.note,
  //   settings: data.data.settings,
  // }

  localStorage.setItem( "dailyNotes", JSON.stringify(obj) ); 
  // console.log('saving to localstorage:', obj);
}

export function cleanListFromPastEmptyDays(userObj: iUserClass): void{
  //Skip the newly inserted day.
  let list = [...userObj.get.list()];
  const length = list.length - 1;
  for( let i=length; i>= 0; i--){
    if( list[i].questionAnswerPair.length <= 2 ){
      if( list[i].questionAnswerPair.length === 0)
        userObj.data.list.splice(i, 1);
      else{
        if( list[i].questionAnswerPair[0].question.text.trim().length <= 0){
          userObj.data.list.splice(i, 1);
        }
      }
    }
  }

}

export function cleanlistFromUserInput(userObj: iUserClass){
  userObj.data.list.forEach( (item:any)=>{
    if( 'userInput' in item ){
      delete item.userInput;
    }
  });
}


// interface DailyCards { ID: number, done: boolean }

export function setDailyCards(userObj: iUserClass){
  let todayCards = cardsToRepeat( userObj, getDaysAfter1970() );

  userObj.data.dailyCards = todayCards.map( (card:any): any=> ({
    ID: card.cardID, 
    done: false,
    card,
  }));
}
































