
import {iUserClass, iList} from '../../../templatesTypes';
import deleteQuestions from './deleteQuestions';
// import {questionsToLater} from './questionsToLater'
// import transferFromQuestionsToAnswers from './transferFromQuestionsToAnswers';
import fetchQuestionsAnswersToInputField from './fetchQuestionsAnswersToInputField';
import clearCard from './clearCard';
import clearAwayCommands from './clearAwayCommands';
import {groupCommands} from './groupCommands';
import replaceMultipleCommands from './replaceMultipleCommands';
import fetchCommands from './fetchCommands';
import copyToTodaysCard from './copyToTodaysCard';
import fetchQuestionsFromInputField from './fetchQuestionsFromInputField';
import sendToDaily from './sendToDaily';

export const execute = (data: iUserClass, activeNote: number): iUserClass =>{
  let list: iList = data.data.list;

  if( list[activeNote].userInput === undefined || list[activeNote].userInput === null) 
    return data;
  
  list[activeNote].userInput = replaceMultipleCommands(list[activeNote].userInput || "");

  const objCommands = groupCommands( fetchCommands(list[activeNote].userInput || "") );

  let currentNote = list[activeNote];
  list[activeNote].userInput = fetchQuestionsAnswersToInputField( data, activeNote, objCommands.fetchQuestionAnswer );

  copyToTodaysCard( data, activeNote, objCommands.questionsToRepeat);
  // data = questionsToLater( currentNote, objCommands.questionsToLater, data);

  list[activeNote] = deleteQuestions( list[activeNote], objCommands.questionsToDelete);
  if( (list[activeNote].userInput || "").indexOf( '\nclear-card\n') >= 0){
    list[activeNote] = clearCard( list[activeNote] );
  }

  list[activeNote].userInput = clearAwayCommands( list[activeNote].userInput || "" );
  list[activeNote] = fetchQuestionsFromInputField( currentNote );

  sendToDaily( data, currentNote);
  list[activeNote] = {...currentNote};
  return data;
}

export default execute;