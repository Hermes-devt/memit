import dateHandling from './dateHandling';
import {createUserAccount} from './createUserAccount';
import {createNewDay} from './createNewDay';
import {UserData} from '../interfaces';
// import {cardsCounter} from '../js/questionCounter';
// import { cleanListFromPastEmptyDays, removeMissedCardsThatIsCompleted, moveUncheckedDailyCardsToMissedCardsList, setDailyCards, getAllMissedCardsFromThePastDays, removeMissedCardsThatsMatchAcurrentDailyCard } from '../js/storageHandling';
import { cleanListFromPastEmptyDays, setDailyCards } from '../js/storageHandling';
import {removeMissedCardsThatIsCompleted, moveUncheckedDailyCardsToMissedCardsList, getAllMissedCardsFromThePastDays, removeMissedCardsThatsMatchAcurrentDailyCard} from '../js/missedCardHandling';

export function init(): UserData{
  let data: string | null = localStorage.getItem("dailyNotes");
  let dataObj = data ? JSON.parse(data) : createUserAccount();
  // let dataObj = JSON.parse( localStorage.getItem('memBackup') || ""); dataObj = JSON.parse(dataObj);
  // localStorage.setItem('membackup', JSON.stringify(dataObj));
  // dataObj.list[dataObj.list.length-1].onDay = dataObj.list[dataObj.list.length-1].onDay - 1; 

  if( dateHandling.ifNewDay(dataObj)){
    dataObj.list.push( createNewDay() )

    cleanListFromPastEmptyDays(dataObj);

    removeMissedCardsThatIsCompleted(dataObj);
    moveUncheckedDailyCardsToMissedCardsList(dataObj);
    getAllMissedCardsFromThePastDays(dataObj);

    setDailyCards(dataObj);
    removeMissedCardsThatsMatchAcurrentDailyCard(dataObj)
  }

  // dataObj.laterLearnings = {
  //   list: [
  //     {
  //       name: 'Chinese characters',
  //       questionsFetch: 8,
  //       questions: "Rabbit snossing in the windaa",
  //       answers: "And dies of an accidental overdose",
  //     }
  //   ]
  // }
  console.log('dataObj', dataObj);
  return dataObj;
}