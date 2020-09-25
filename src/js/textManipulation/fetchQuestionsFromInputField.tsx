
import {iDay} from '../../templatesTypes';

// Fetches questions fromt he input field with the following format
// #This is a question
// @answer
// the answer is split either by the next # || \n\n || the end of the file. 

export const fetchQuestionsFromInputField = (card: iDay): iDay=>{ 
  if( card.userInput === undefined ) return card;

  let newInput = card.userInput;

  const toSplit = (str: string = "", regex2:any):string[] => {
    // split text into an array of rows
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
  let split: any = [];

  newInput = '\n' + newInput;

  questionAnswers.forEach( (str:string)=>{
    //split answer from question
    let temp = toSplit( str, /^@/)
    if( temp.length === 2){
      // Split the answer from the rest of the text below the question
      let answer = temp[1].split("\n\n")[0];
      split.push([temp[0], answer ]);

      // Remove question and answer from the input field.
      newInput = newInput.replace( '\n' + temp[0], '');
      newInput = newInput.replace( answer, '');
    }
  });

  let q:string = ''; let a: string = ''
  split.forEach( (arr: any, index:number)=>{
    q += index+1 + ". " + arr[0].substring(1);
    a += index+1 + ". " + arr[1].substring(1).trim() + '\n';
  })

  card.questions += q;
  card.answers += a;
  card.userInput = newInput.trim();
  return card;
}

export default fetchQuestionsFromInputField;