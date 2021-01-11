
import {iQuestionsToLater} from './questionsToLater'
import {iFetchQuestionAnswer} from './fetchQuestionsAnswersToInputField';

export interface iGroupCommands{
  questionsToRepeat: number[];
  questionsToDelete: number[];
  fetchQuestionAnswer: iFetchQuestionAnswer[];
  questionsToLater: iQuestionsToLater[];
}

export const groupCommands = (commandArr: string[] ): iGroupCommands=>{

  let groupedCommands: iGroupCommands = {
    questionsToRepeat: [], 
    questionsToDelete: [], 
    fetchQuestionAnswer: [],
    questionsToLater: [],
  };

  commandArr.forEach( (command:string = "")=>{
    let stringNr = (command.match(/\d+/) || []).join(""); //get number
    let number: number = parseInt( stringNr );
    if( command.indexOf('r') >= 0){ 
      groupedCommands.questionsToRepeat.push( number ); 
    }

    if( command.indexOf('R') >= 0){ 
      groupedCommands.questionsToRepeat.push( number ); 
      groupedCommands.questionsToDelete.push( number );
    }

    if( command.indexOf('l') >= 0 ){
      groupedCommands.questionsToLater.push({
        question: number, 
        deck: "mix"
      });
    }

    if( command.indexOf('L') >= 0 ){
      groupedCommands.questionsToLater.push({
        question: number, 
        deck: "mix"
      });
      groupedCommands.questionsToDelete.push( number ); 
    }

    if( command.indexOf('Q') >= 0){
      // command = command.replace('Q', 'qa');
      groupedCommands.fetchQuestionAnswer.push({
        command: (command.match(/\D+/) || []).join(""),
        question: number
      })
    }

    if( command.indexOf('x') >= 0 || command.indexOf('X') >= 0){  
      groupedCommands.questionsToDelete.push( number ); 
    } 
    if( command.indexOf('q') >=0 || command.indexOf('a') >= 0){
      groupedCommands.fetchQuestionAnswer.push({
        command: (command.match(/\D+/) || []).join(""),
        question: number
      })
    }
  });

  return groupedCommands;
}