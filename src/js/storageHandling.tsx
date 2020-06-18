
import {UserData} from '../interfaces';
// import { getMissedCards } from './getMissedCards';
import {cardsToRepeat} from './cardsToRepeat';
// import {getMissedCards} from './getMissedCards';
import {getDaysAfter1970} from '../js/util'

export function save(data: UserData){
  const obj: UserData = {
    list: data.list,
    dailyCards: data.dailyCards,
    lastUse: data.lastUse,
    schedule: data.schedule,
    missedCards: data.missedCards,
  }

  // localStorage.setItem( "dailyNotes", JSON.stringify(obj) ); 
  // console.log('saving to localstorage:', obj);
}

export function cleanListFromPastEmptyDays(dataObj: UserData){
  const length = dataObj.list.length  - 2;
  for( let i=length; i>= 0; i--){
    let item = dataObj.list[i];
    if( item.questions === '' && item.answers === '')
      dataObj.list.splice( i, 1);
  }
}

export function setDailyCards(dataObj: UserData,){
  let todayCards = cardsToRepeat( dataObj, getDaysAfter1970() );
  dataObj.dailyCards = todayCards.map( (card:any)=> ({ID: card.onDay, done: false}));
}


// missed card handling. 

// export function removeMissedCardsThatIsCompleted(dataObj: UserData){
//   let length = dataObj.missedCards.length-1;
//   for(let i=length; i>= 0; i--){
//     if( dataObj.missedCards[i].done === true ){
//       dataObj.missedCards.splice(i, 1); }
//   }
// }

// export function moveUncheckedDailyCardsToMissedCardsList(dataObj: UserData){
//   let missed = dataObj.dailyCards.filter( (cards:any)=> !cards.done);
//   missed.forEach( (item:any)=>{
//     let exists = false;
//     dataObj.missedCards.forEach( ({ID}:any)=>{ 
//       if( ID === item.ID ){ exists = true;} 
//     })
//     if(!exists) dataObj.missedCards.push(item);
//   })
// }

// export function getAllMissedCardsFromThePastDays(dataObj: UserData){
//   const daysSinceLastUse = getDaysAfter1970() - dataObj.lastUse.date;
//   getMissedCards(dataObj, daysSinceLastUse );
//   dataObj.lastUse.date = getDaysAfter1970();
// }

// export function removeMissedCardsThatsMatchAcurrentDailyCard( dataObj: UserData){
//   for(let i=dataObj.missedCards.length -1; i>=0; i--){
//     let match = false;
//     dataObj.dailyCards.forEach( (card:any)=>{ if( dataObj.missedCards[i].ID === card.ID ) match = true; });
//     if( match ) dataObj.missedCards.splice(i, 1);
//   }
// }

// 
































