
import {Day} from '../../types';

import splitAwayQuestionAndAnswers from './splitAwayQuestionAndAnswers'

interface itoCopy{ question: string; answer: string; tags?: string[] }

export const copyToTodaysCard = (card: Day, toCopy: itoCopy): Day=>{
  card.questions += toCopy.question;
  card.answers += toCopy.answer;
  return card;
}

export interface Returnv{
  question: string[];
  answer: string[];
}

export const copyQuestions = (card: Day, questionsToCopy: string[]): Returnv =>{
  if( questionsToCopy.length === 0) return {question: [], answer: []}
  let obj = splitAwayQuestionAndAnswers( card);
  let question: string[] = []; let answer: string[] = [];

  obj.questions.forEach( (questionStr:string)=>{
    questionsToCopy.forEach( (questionNr: string)=>{
      if( questionStr.indexOf( questionNr + '.') === 0){
        question.push(questionStr);
      }
    });
  });

  obj.answers.forEach( (questionStr:string)=>{
    questionsToCopy.forEach( (questionNr: string)=>{
      if( questionStr.indexOf( questionNr + '.') === 0){
        answer.push( questionStr);
      }
    });
  });

  return {question, answer};
}


export default copyQuestions;