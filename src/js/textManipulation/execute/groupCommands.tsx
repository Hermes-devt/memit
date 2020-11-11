
import {iQuestionsToLater} from './questionsToLater'

export interface iGroupCommands{
  questionsToRepeat: string[];
  questionsToDelete: string[];
  fetchQuestionAnswer: {command: string, question: string}[];
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
    let number = (command.match(/\d+/) || []).join(""); //get number
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
      // console.log('command', command)
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