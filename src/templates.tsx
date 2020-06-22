

import {tLaterType} from './types';

export function laterType(name: string = '', answers: string = '', questions: string = '', questionsFetch: number = 5):tLaterType{
  return ({ name, answers, questions, questionsFetch})
}

export default{
  laterType,
}