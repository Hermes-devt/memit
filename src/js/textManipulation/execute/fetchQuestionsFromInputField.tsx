
// Fetches questions fromt he input field with the following format
// #This is a question
// @answer
// the answer is split either by the next # || \n\n || the end of the file. 

import { iListItem, iQuestionAnswerPair, tQuestionAnswerPair } from "../../../templatesTypes";

export const fetchQuestionsFromInputField = (card: iListItem): iListItem =>{ 
  if( card.userInput === undefined ) 
    return card;

  let newInput = card.userInput;


  // split the string by the regex value
  const toSplit= (str: string = "", regex2:any):string[] => {
    let text = str.split('\n') || [];
    let arr: string[] = [""];
    text.forEach( (line=>{
      let m = line.match( regex2 );
      if( m !== null) {
        arr.push( line + '\n');
      } else{
        arr[arr.length - 1] += line + '\n';
      }
    }));
    return arr;
  }
  let questionAnswers = toSplit( newInput, /^#/)

  // Check so each split contains one  \n# and one \n@
  let misMatch = false;
  for(let index = 1; index< questionAnswers.length; index++){
    let match1 = ((questionAnswers[index]|| '').match(/^#/) || []).length;
    let match2 =  ((questionAnswers[index]|| '').match(/\n@/) || []).length;
    if( match1 !== 1 || match2 !==1){
      misMatch = true;
    }
  }

  // If something is wrong with the inputed user structure
  if( misMatch ){
    alert('Mismatch between the number of # and @. \n# should always be followed by a @' +
    "\n@question\n#answer")
    return card;
  }

  newInput = '\n' + newInput;

  let split: [string, string][] = [];
  questionAnswers.forEach( (str:string)=>{
    //split answer from question
    let question_answer= toSplit( str, /^@/)

    // make sure the length is 2
    if( question_answer.length === 2){
      let answer = question_answer[1].split("\n\n")[0];
      split.push([question_answer[0], answer ]);

      // Remove question and answer from the input field.
      newInput = newInput.replace( '\n' + question_answer[0], '');
      newInput = newInput.replace( answer, '');
    }
  });

  if( split.length === 0) 
    return card;

  // If all questions / answers are empty remove all empty questions
  let counter = 0;
  card.questionAnswerPair.forEach( (item: iQuestionAnswerPair)=>{
    if( item.question.text.trim() === '' && item.answer.text.trim() === ''){
      counter++;
    }
  });

  if( counter === card.questionAnswerPair.length)
    card.questionAnswerPair = []; 


  // Insert new questions into the active card
  split.forEach( (pair: [string, string])=>{ 
    card.questionAnswerPair.push( tQuestionAnswerPair(
      pair[0].length > 0 ? pair[0].substring(1) : "", 
      pair[1].length > 0 ? pair[1].substring(1) : ""
    ))
  });
  // remove the questions from the input
  card.userInput = newInput.trim();
  return card;
}

export default fetchQuestionsFromInputField;