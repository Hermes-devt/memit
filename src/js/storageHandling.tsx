
import {UserData} from '../interfaces';

export function save(data: UserData){
  const obj: UserData = {
    list: data.list,
    dailyCards: data.dailyCards,
    lastUse: data.lastUse,
    schedule: data.schedule,
    missedCards: data.missedCards,
  }

  localStorage.setItem( "dailyNotes", JSON.stringify(obj) ); console.log('saving to localstorage:', obj);
}