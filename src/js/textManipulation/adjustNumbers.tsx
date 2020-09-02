

import {Day} from '../../types';
import splitAwayQuestionAndAnswers from './splitAwayQuestionAndAnswers'
export const adjustNumbersOnQuestionAnswers = (obj: Day): Day=>{

  let temp = splitAwayQuestionAndAnswers(obj);
  let re = /^\d+\./

  let q = temp.questions.map( (item: string, index:number)=>{
    return item.replace(re, index + '.');
  });

  let a = temp.answers.map( (item: string, index:number)=>{
    return item.replace(re, index + '.');
  });

  let nQuestions:string = q.join('');
  let nAnswers:string = a.join('');

  obj.questions = nQuestions;
  obj.answers = nAnswers;

  return obj;
}

export default adjustNumbersOnQuestionAnswers;