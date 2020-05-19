import dateHandling from './dateHandling';
import {cardsToRepeat} from './cardsToRepeat';
import {createUserAccount} from './createUserAccount';
import {createNewDay} from './createNewDay';
import {getDaysAfter1970} from './util';
import {getMissedCards} from './getMissedCards';
import {UserData} from '../interfaces';

export function init(): UserData{
  let data: string | null = localStorage.getItem("dailyNotes");

  

  let dataObj = data ? JSON.parse(data) : createUserAccount();
  const todaysDay: number = getDaysAfter1970();

  // console.log('len', data && (data.length * 8) / 1000, 'kb');
  // console.log('data list length', dataObj.list.length);
  // dataObj.list = JSON.parse( localStorage.getItem('superbackup') || '');
  if( dateHandling.ifNewDay(dataObj)){
    dataObj.list.push( createNewDay() )

    //Clean the main list from all empty objects(days) except the last card. 
    for( let i=dataObj.list.length-2; i>= 0; i--){
      let item = dataObj.list[i];
      if( item.questions === '' && item.answers === '')
        dataObj.list.splice( i, 1);
    }

    //Clear out the missed cards that has been done. 
    for(let i=dataObj.missedCards.length-1; i>= 0; i--){
      if( dataObj.missedCards[i].done === true ){
        dataObj.missedCards.splice(i, 1); }
    }

    // Set all cards with unmarked checkboxes from the previous time in the missed card list, 
    let missed = dataObj.dailyCards.filter( (cards:any)=> !cards.done);
    missed.forEach( (item:any)=>{
      let exists = false;
      dataObj.missedCards.forEach( ({ID}:any)=>{ if( ID === item.ID ){ exists = true;} })
      if(!exists) dataObj.missedCards.push(item);
    })

    // Find todays card you should repeat and set their checkboxes
    let todayCards = cardsToRepeat( dataObj, todaysDay );
    let dailyCards = todayCards.map( (card:any)=> ({ID: card.onDay, done: false}));
    dataObj.dailyCards = dailyCards;

    // if exists get cards from all the days you have missed.
    const daysSinceLastUse = todaysDay - dataObj.lastUse.date;
    getMissedCards(dataObj, daysSinceLastUse );
    dataObj.lastUse.date = todaysDay;

    //If a missed cards is scheduled to be repeated today remove it from the list of missed cards.
    for(let i=dataObj.missedCards.length -1; i>=0; i--){
      let match = false;
      dataObj.dailyCards.forEach( (card:any)=>{ if( dataObj.missedCards[i].ID === card.ID ) match = true; });
      if( match ) dataObj.missedCards.splice(i, 1);
    }
  }

  console.log('d', dataObj.list);
  dataObj.list.forEach( (item:any)=> item.userInput = '');

  // dataObj = JSON.parse( localStorage.getItem('superbackup') || '' );
  // localStorage.setItem('membackup', JSON.stringify(dataObj));
  return dataObj;
}