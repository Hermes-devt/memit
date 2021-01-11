
import {iListItem, iUserClass} from '../../../templatesTypes';
// import splitAwayQuestionAndAnswers from '../splitAwayQuestionAndAnswers'


export interface iQuestionsToLater{
  question: number;
  deck: string;
}

export const questionsToLater = (card: iListItem, questionsToSend: iQuestionsToLater[], data: iUserClass): iUserClass=>{
  if(questionsToSend.length === 0) return data;

  // let questionAnswerObj = splitAwayQuestionAndAnswers( card );

  // let q2: string = '\n';
  // let re = /^\d+\. ?/;

  // for( let i=0; i<questionsToSend.length;i++){
  //   let q:number = Number( questionsToSend[i].question);
  //   if( q < 0 || q >= questionAnswerObj.questions.length ) continue;

  //   q2 += questionAnswerObj.questions[q].replace( re, '#') + '' + questionAnswerObj.answers[q].replace(re, '@') + '';
  // }

  // if( data.data.laterLearnings.list.length >=1 ){
  //   let str: string = data.data.laterLearnings.list[0].questionsAnswers;
  //   str = str.trim() + '\n' + q2.trim() + '\n';
  //   data.data.laterLearnings.list[0].questionsAnswers = str;
  // }

  return data;
}

export default questionsToLater;
