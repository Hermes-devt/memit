

import {iUserClass, iListItem, iQuestionAnswerPair} from '../../../templatesTypes';

export interface iFetchQuestionAnswer{
  command: string, 
  question: number
};

export const fetchQuestionsAnswersToInputField = (data: iUserClass, activeNote: number, toFetch:iFetchQuestionAnswer[]): string=>{

  let card: iListItem = {...data.get.list()[activeNote]};

  if( card.userInput === undefined || card.userInput === null) 
    return "";

  let userInput:string = card.userInput || "";

  for( let index=0; index < toFetch.length; index++){
    let {command, question } = toFetch[index];

    let str = '';
    const questionAnswer:iQuestionAnswerPair|undefined  = data.get.question( card, question);
    if( questionAnswer === undefined )
      continue;

    if( command.includes('q')){
        str +=  question + "Q. " + questionAnswer.question.text.trim() + "";
    }

    if( command.includes('a')){
        str +=  question + "A. " + questionAnswer.answer.text.trim() + "";
    }

    if( command.includes('Q')){
        str +=  '\n' + question + "Q. " + questionAnswer.question.text.trim() + "";
        str +=  '\n' + question + "A. " + questionAnswer.answer.text.trim() + "";
    }

    let findMatch = question + command;
    let indexPos = userInput.indexOf(findMatch) + findMatch.length;

    userInput = userInput.substring(0, indexPos ) + '\n' + str.trim() + userInput.substring(indexPos );
  }
  return userInput;
}

export default fetchQuestionsAnswersToInputField;