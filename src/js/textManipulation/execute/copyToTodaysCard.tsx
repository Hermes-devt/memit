
import {iDay} from '../../../templatesTypes';
import {copyQuestions} from '../copyQuestion';
import splitAwayQuestionAndAnswers from '../splitAwayQuestionAndAnswers'
import adjustNumbers from '../adjustNumbers';


// Copy questions to todays card. 
export const copyToTodaysCard = (card: iDay, toCopy: string[], daily: iDay): iDay=>{
  if( toCopy.length < 1 ) return daily;

  let questionAnswer = copyQuestions(card, toCopy);
  let temp = splitAwayQuestionAndAnswers(daily);

  //so the first newly inserted question gets on a new row.
  let questionStr:string = '\n' + questionAnswer.question.join('');
  let answerStr:string = '\n' + questionAnswer.answer.join('');

  //insert the new questions in the splittet double arr
  temp.questions.splice( temp.questions.length - 1, 0, questionStr );
  temp.answers.splice( temp.answers.length - 1, 0, answerStr );


  //create a simple string from the arrays.
  daily.questions = temp.questions.join('').trim();
  daily.answers = temp.answers.join('').trim();

  daily = adjustNumbers( daily);
  console.log('daily', daily);
  return daily;
}

export default copyToTodaysCard;