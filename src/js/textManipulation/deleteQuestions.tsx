
import {Day} from '../../types';
import splitAwayQuestionAndAnswers from './splitAwayQuestionAndAnswers'


export const deleteQuestions= (card: Day, questionsToDelete: string[]): Day =>{
  if(questionsToDelete.length === 0) return card;

  let obj = splitAwayQuestionAndAnswers( card );

  questionsToDelete.forEach( (questionNr: string)=>{
    obj.questions = obj.questions.map( (questionStr:string)=>{
      return questionStr.indexOf( questionNr + '.') === 0 ? "" : questionStr;
    });

    obj.answers = obj.answers.map( (answerStr:string)=>{
      return answerStr.indexOf( questionNr + '.') === 0 ? "" : answerStr;
    });
  });

  card.answers = obj.answers.join("");
  card.questions = obj.questions.join("");
  // let q = obj.questions.join("");
  // let a = obj.answers.join("");
  // card.answers = a;
  // card.questions = q;
  return card;
}

export default deleteQuestions;