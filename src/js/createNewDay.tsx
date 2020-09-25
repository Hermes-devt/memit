
import DateHandling from './dateHandling';
// import {Day} from '../interfaces';
import {iDay} from '../templatesTypes';

export function createNewDay(): iDay{
  let newDay = {
    questions: '',
    answers: '',
    tags: [],
    onDay: DateHandling.getDaysAfter1970(),
  };
  return newDay;
}