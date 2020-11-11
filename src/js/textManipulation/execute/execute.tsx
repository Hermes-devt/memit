
import {iUserData} from '../../../templatesTypes';
import deleteQuestions from './deleteQuestions';
import {questionsToLater} from './questionsToLater'
import transferFromQuestionsToAnswers from './transferFromQuestionsToAnswers';
import fetchQuestionsAnswersToInputField from './fetchQuestionsAnswersToInputField';
import clearCard from './clearCard';
import clearAwayCommands from './clearAwayCommands';
import {groupCommands} from './groupCommands';
import replaceMultipleCommands from './replaceMultipleCommands';
import fetchCommands from './fetchCommands';
import copyToTodaysCard from './copyToTodaysCard';
import fetchQuestionsFromInputField from './fetchQuestionsFromInputField';
import sendToDaily from './sendToDaily';

import adjustNumbersFromQuestionAndAnswers from '../adjustNumbers';


export const execute = (data: iUserData, activeNote: number): iUserData =>{
  let list = data.list;

  if( list[activeNote].userInput === undefined || list[activeNote].userInput === null) 
    return data;
  
  data.list[activeNote].userInput = replaceMultipleCommands(data.list[activeNote].userInput || "");
  let userInputString:string = data.list[activeNote].userInput || "";

  const objCommands = groupCommands( fetchCommands(userInputString) );

  let currentNote = data.list[activeNote];
  currentNote = fetchQuestionsAnswersToInputField( currentNote, objCommands.fetchQuestionAnswer );

  list[list.length-1] = {...copyToTodaysCard( currentNote, objCommands.questionsToRepeat, list[list.length-1])};
  data = questionsToLater( currentNote, objCommands.questionsToLater, data);

  currentNote = deleteQuestions( currentNote, objCommands.questionsToDelete);
  if( userInputString.indexOf( '\ntransfer-questions\n') >= 0) 
    currentNote = transferFromQuestionsToAnswers( currentNote );
  if( userInputString.indexOf( '\nclear-card\n') >= 0)
    currentNote = clearCard( currentNote );

  currentNote.userInput = clearAwayCommands( currentNote.userInput || "" );
  currentNote = fetchQuestionsFromInputField( currentNote );

  sendToDaily( data, currentNote, activeNote);
  currentNote = adjustNumbersFromQuestionAndAnswers( currentNote )
  list[activeNote] = {...currentNote};

  data.list = [...list];
  return data;
}

export default execute;