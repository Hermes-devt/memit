
import DateHandling from './dateHandling';
import {Day} from '../interfaces';

export function createNewDay(): Day{
  let newDay = {
    questions: '',
    answers: '',
    tags: [],
    onDay: DateHandling.getDaysAfter1970(),
  };
  return newDay;
}