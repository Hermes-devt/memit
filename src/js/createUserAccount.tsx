
import {iUserData} from '../templatesTypes';
import DateHandling from './dateHandling';


export function createUserAccount(): iUserData{
  let data: iUserData = {
    list: [],
    dailyCards: [],
    lastUse: { date: DateHandling.getDaysAfter1970()},
    schedule: [0, 1, 3, 6, 12, 24, 48, 100, 200, 400, 800, 1600],
    missedCards: [],
    laterLearnings: { list: [] },
    dailyNotes: {newData: "", oldData: ""},
    note: {str: ""},
  }
  return data;
}
