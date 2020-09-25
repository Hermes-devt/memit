import dateHandling from './dateHandling';
import {createUserAccount} from './createUserAccount';
import {createNewDay} from './createNewDay';
import {iUserData} from '../templatesTypes';
import { cleanListFromPastEmptyDays, cleanlistFromUserInput, setDailyCards } from '../js/storageHandling';
import {removeMissedCardsThatIsCompleted, moveUncheckedDailyCardsToMissedCardsList, getAllMissedCardsFromThePastDays, removeMissedCardsThatsMatchAcurrentDailyCard} from '../js/missedCardHandling';

const localStorageSpace = function(){
  let allStrings = '';
  for(let key in window.localStorage){
      if(window.localStorage.hasOwnProperty(key)){
          allStrings += window.localStorage[key];
      }
  }
  let storageSize = allStrings ? 3 + ((allStrings.length*16)/(8*1024)) + ' KB' : 'Empty (0 KB)';
  console.log( 'Size', storageSize )
};


export function init(): iUserData{
  let data: string | null = localStorage.getItem("dailyNotes");
  let dataObj = data ? JSON.parse(data) : createUserAccount();

  if( dateHandling.ifNewDay(dataObj)){
    dataObj.list.push( createNewDay() )

    cleanListFromPastEmptyDays(dataObj);
    cleanlistFromUserInput(dataObj);

    removeMissedCardsThatIsCompleted(dataObj);
    moveUncheckedDailyCardsToMissedCardsList(dataObj);
    getAllMissedCardsFromThePastDays(dataObj);

    setDailyCards(dataObj);
    removeMissedCardsThatsMatchAcurrentDailyCard(dataObj)

    // Make room for new info and transfer the old new info to old data
    let newData = dataObj.dailyNotes.newData;
    dataObj.dailyNotes.newData = "";
    dataObj.dailyNotes.oldData += '\n\n###\n' + newData;
  }


  // localStorageSpace();
  console.log(dataObj)
  return dataObj;
}