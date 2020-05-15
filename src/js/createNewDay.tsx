
import DateHandling from './dateHandling';
import {Day} from '../interfaces';

export function createNewDay(): Day{
  let newDay = {
    questions: '',
    answers: '',
    tags: [],
    creationDate: DateHandling.createDate(),
    onDay: DateHandling.getDaysAfter1970(),
  };
  return newDay;
}