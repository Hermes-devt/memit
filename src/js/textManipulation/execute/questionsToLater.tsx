
import {iDay, iUserData} from '../../../templatesTypes';
import splitAwayQuestionAndAnswers from '../splitAwayQuestionAndAnswers'


export interface iQuestionsToLater{
  question: string;
  deck: string;
}

export const questionsToLater = (card: iDay, questionsToSend: iQuestionsToLater[], data: iUserData): iUserData=>{
  if(questionsToSend.length === 0) return data;

  let questionAnswerObj = splitAwayQuestionAndAnswers( card );

  console.log( questionAnswerObj );
  let q2: string = '\n';
  let re = /^\d+\. ?/;

  for( let i=0; i<questionsToSend.length;i++){
    let q:number = Number( questionsToSend[i].question);
    if( q < 0 || q >= questionAnswerObj.questions.length ) continue;

    q2 += questionAnswerObj.questions[q].replace( re, '#') + '' + questionAnswerObj.answers[q].replace(re, '@') + '';
  }

  if( data.laterLearnings.list.length >=1 ){
    let str: string = data.laterLearnings.list[0].questionsAnswers;
    str = str.trim() + '\n' + q2.trim() + '\n';
    data.laterLearnings.list[0].questionsAnswers = str;
  }

  return data;
}

export default questionsToLater;
