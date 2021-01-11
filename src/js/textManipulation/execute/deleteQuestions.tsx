
// import {iDay} from '../../../templatesTypes';

import { iListItem } from "../../../templatesTypes";


export const deleteQuestions= (card: iListItem, questionsToDelete: number[]): iListItem =>{
  if(questionsToDelete.length === 0) return card;

  questionsToDelete.sort(function(a, b){return b - a});

  questionsToDelete.forEach( (question: number)=>{
    let indexPos = question - 1;
    if( indexPos === 0 && card.questionAnswerPair.length === 1){
      card.questionAnswerPair[0].question.text = '';
      card.questionAnswerPair[0].answer.text = '';
      return card;
    }

    if( indexPos >= 0 && indexPos < card.questionAnswerPair.length){
      card.questionAnswerPair.splice(indexPos, 1);
    }
  });

  return card;
}

export default deleteQuestions;