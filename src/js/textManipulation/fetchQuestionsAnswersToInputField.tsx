

import {Day} from '../../types';
import {copyQuestions} from './copyQuestion';

export const fetchQuestionsAnswersToInputField = (card1: Day, toFetch:any): Day=>{

  let card = {...card1};
  if( card.userInput === undefined || card.userInput === null) return card;

  let userInput:string = card.userInput || "";

  toFetch.forEach( (item:any)=>{
    let {command, question } = item;
    let questionAnswer = copyQuestions( card, [question]);

    let str = '';
    if( command.includes('q')) str += (questionAnswer.question[0] || "").trim() + '';
    if( command.includes('a')) str += '\n' + (questionAnswer.answer[0] || "").trim();
    if( command.includes('Q')){
      str += '\n' + (questionAnswer.question[0] || "").trim();
      str += '\n' + (questionAnswer.answer[0] || "").trim();
    }

    let findMatch = question + command;
    let indexPos = userInput.indexOf(findMatch) + findMatch.length;

    userInput = userInput.substring(0, indexPos ) + '\n' + str.trim() + userInput.substring(indexPos );
  });

  card.userInput = userInput;
  return card;
}

export default fetchQuestionsAnswersToInputField;