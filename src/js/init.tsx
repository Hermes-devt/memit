import dateHandling from './dateHandling';
import {iUserData, tDay, tUserData} from '../templatesTypes';
import { cleanListFromPastEmptyDays, cleanlistFromUserInput, setDailyCards } from '../js/storageHandling';
import {removeMissedCardsThatIsCompleted, moveUncheckedDailyCardsToMissedCardsList, getAllMissedCardsFromThePastDays, removeMissedCardsThatsMatchAcurrentDailyCard} from '../js/missedCardHandling';
import checkLocalStorageSpace from '../js/checkLocalStorageSpace';
import setUserInstructions from '../js/setUserInststructions';

export function init(): iUserData{
  let data: string | null = localStorage.getItem("dailyNotes");
  let userdata = data ? JSON.parse(data) : tUserData();

  if( dateHandling.ifNewDay(userdata)){
    userdata.list.push( tDay() )
    if( userdata.list.length === 1){ //if first day
      userdata = setUserInstructions(userdata);
    }

    cleanListFromPastEmptyDays(userdata);
    cleanlistFromUserInput(userdata);

    removeMissedCardsThatIsCompleted(userdata);
    moveUncheckedDailyCardsToMissedCardsList(userdata);
    getAllMissedCardsFromThePastDays(userdata);

    setDailyCards(userdata);
    removeMissedCardsThatsMatchAcurrentDailyCard(userdata)

    // Make room for new info and transfer the old new info to old data
    let newData = userdata.dailyNotes.newData;
    userdata.dailyNotes.newData = "";
    userdata.dailyNotes.oldData += '\n\n###\n' + newData;
  }

  checkLocalStorageSpace();
  console.log( userdata );
  return userdata;
}