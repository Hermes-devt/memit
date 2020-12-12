
import {iDay} from '../../../templatesTypes';
import splitAwayQuestionAndAnswers from '../splitAwayQuestionAndAnswers'


export const deleteQuestions= (card: iDay, questionsToDelete: string[]): iDay =>{
  if(questionsToDelete.length === 0) return card;

  // console.log( 'string', questionsToDelete );

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
  return card;
}

export default deleteQuestions;