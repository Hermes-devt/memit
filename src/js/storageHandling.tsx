
import {UserData} from '../interfaces';

export function save(data: UserData){
  const obj: UserData = {
    list: data.list,
    dailyCards: data.dailyCards,
    lastUse: data.lastUse,
    schedule: data.schedule,
    missedCards: data.missedCards,
  }

  console.log('saving to localstorage:', obj);
  localStorage.setItem( "dailyNotes", JSON.stringify(obj) );
}