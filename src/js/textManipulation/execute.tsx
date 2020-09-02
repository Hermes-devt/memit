
import {Day} from '../../types';

import {copyQuestions} from './copyQuestion';
import deleteQuestions from './deleteQuestions';
import transferFromQuestionsToAnswers from './transferFromQuestionsToAnswers';
import fetchQuestionsAnswersToInputField from './fetchQuestionsAnswersToInputField';
import clearAwayCommands from './clearAwayCommands';
import clearCard from './clearCard';
import copyToTodaysCard from './copyToTodaysCard';
import adjustNumbersFromQuestionAndAnswers from './adjustNumbers';

const fetchCommands = (str: string):string[] =>{
  let text = str.split('\n') || [];
  let arr: string[] = [];
  text.forEach( (line=>{
    const regex2 = /^\d+[rxqaRQ]{1,4}$/
    // const regex2 = /^\d+[rx]{1,2}$/
    let m = line.match( regex2 );
    if( m !== null) 
      arr.push( m[0]);
  }));
  return arr;
}


interface iGroupCommands{
  questionsToRepeat: string[];
  questionsToDelete: string[];
  fetchQuestionAnswer: {command: string, question: string}[];
}

const groupCommands = (commandArr: string[] ): iGroupCommands=>{

  let groupedCommands: iGroupCommands = {
    questionsToRepeat: [], 
    questionsToDelete: [], 
    fetchQuestionAnswer: [] 
  };

  commandArr.forEach( (command:string = "")=>{
    let number = (command.match(/\d+/) || []).join(""); //get number
    // const commandStr:string = (command.match(/\D+/) || []).join("");
    // console.log('commands', command);
    if( command.indexOf('r') >= 0){ groupedCommands.questionsToRepeat.push( number ); }
    if( command.indexOf('R') >= 0){ 
      groupedCommands.questionsToRepeat.push( number ); 
      groupedCommands.questionsToDelete.push( number );
    }
    if( command.indexOf('Q') >= 0){
      // command = command.replace('Q', 'qa');
      groupedCommands.fetchQuestionAnswer.push({
        command: (command.match(/\D+/) || []).join(""),
        question: number
      })
      // console.log('command', command)
    }

    if( command.indexOf('x') >= 0){  groupedCommands.questionsToDelete.push( number ); } 
    if( command.indexOf('q') >=0 || command.indexOf('a') >= 0){
      groupedCommands.fetchQuestionAnswer.push({
        command: (command.match(/\D+/) || []).join(""),
        question: number
      })
    }
  });
  return groupedCommands;
}

export const execute = (list: Day[], activeNote: number): Day[]=>{
  if( list[activeNote].userInput === undefined || list[activeNote].userInput === null) 
    return list;


  let str:string = list[activeNote].userInput || "";
  const arr: string[] = fetchCommands(str);

  const objCommands = groupCommands( arr );
  let currentNote = list[activeNote];

  currentNote = fetchQuestionsAnswersToInputField( currentNote, objCommands.fetchQuestionAnswer );


  if( objCommands.questionsToRepeat.length >= 1 ){
    list[list.length-1] = {...copyToTodaysCard( currentNote, objCommands.questionsToRepeat, list[list.length-1])};
  }


  currentNote = deleteQuestions( currentNote, objCommands.questionsToDelete);
  if( str.indexOf( '\ntransfer-questions\n') >= 0) {
    currentNote = transferFromQuestionsToAnswers( currentNote )}
  if( str.indexOf( '\nclear-card\n') >= 0){ 
    currentNote = clearCard( currentNote )};

  if( currentNote.userInput ){
    let userInput: string = currentNote.userInput;
    currentNote.userInput = clearAwayCommands( userInput );
  }


  currentNote = adjustNumbersFromQuestionAndAnswers( currentNote )
  list[activeNote] = {...currentNote};
  // props.update( props.data);

  return list;
}

export default{
  execute
}