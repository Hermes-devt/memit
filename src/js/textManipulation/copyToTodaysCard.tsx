
import {Day} from '../../types';
import {copyQuestions} from './copyQuestion';
import splitAwayQuestionAndAnswers from './splitAwayQuestionAndAnswers'
import adjustNumbers from './adjustNumbers';


// Copy questions to todays card. 
export const copyToTodaysCard = (card: Day, toCopy: string[], list: Day): Day=>{
  let questionAnswer = copyQuestions(card, toCopy);
  let temp = splitAwayQuestionAndAnswers(list);

  //so the first newly inserted question gets on a new row.
  let questionStr:string = '\n' + questionAnswer.question.join('');
  let answerStr:string = '\n' + questionAnswer.answer.join('');

  //insert the new questions in the splittet double arr
  temp.questions.splice( temp.questions.length - 1, 0, questionStr );
  temp.answers.splice( temp.answers.length - 1, 0, answerStr );


  //create a simple string from the arrays.
  list.questions = temp.questions.join('');
  list.answers = temp.answers.join('');

  list = adjustNumbers( list);
  return list;
}

export default copyToTodaysCard;