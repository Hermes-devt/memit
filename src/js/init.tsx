import dateHandling from './dateHandling';
import {tListItem, tUserData, iUserData, iUserClass} from '../templatesTypes';
import { cleanListFromPastEmptyDays, cleanlistFromUserInput, setDailyCards } from '../js/storageHandling';
import {removeMissedCardsThatIsCompleted, moveUncheckedDailyCardsToMissedCardsList, getAllMissedCardsFromThePastDays, removeMissedCardsThatsMatchAcurrentDailyCard} from '../js/missedCardHandling';
import checkLocalStorageSpace from '../js/checkLocalStorageSpace';
import setUserInstructions from '../js/setUserInststructions';
import {appendMethods} from '../js/globalObject';
import { generateCardID } from './util';
import { daily_init } from './daily_init';

export function init(): iUserClass{
  let data: string | null = localStorage.getItem("dailyNotes");
  let user: iUserData = data ? JSON.parse(data) : tUserData();
  let userdata: iUserClass = appendMethods({...user});

  // userdata.get.settings().displayMissing = true;
  // userdata.get.list().forEach( (item:any, index:number, arr:any)=>{
  //   arr[index].cardID = index;
  // })

  // userdata.get.settings().version = 1;

  if( userdata.get.list().length === 1){ //if first day
    userdata = setUserInstructions(userdata);
  }

  if( dateHandling.ifNewDay(userdata)){
    cleanListFromPastEmptyDays(userdata);
    cleanlistFromUserInput(userdata);

    userdata.data.list.push( tListItem( generateCardID(userdata) ) )

    removeMissedCardsThatIsCompleted(userdata);
    moveUncheckedDailyCardsToMissedCardsList(userdata);
    getAllMissedCardsFromThePastDays(userdata);

    setDailyCards(userdata);
    removeMissedCardsThatsMatchAcurrentDailyCard(userdata)

    daily_init( userdata );

    if( userdata.data.missedCards.length > 0)
      userdata.get.settings().displayMissing = true;
  }

  checkLocalStorageSpace();
  // userdata.data.settings.minimize = true;

  console.log( userdata );

  return userdata;
}