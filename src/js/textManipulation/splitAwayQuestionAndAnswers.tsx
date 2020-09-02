
import {Day} from '../../types';

interface Returnv {
  questions: string[];
  answers: string[];
}

export const splitAwayQuestionAndAnswers = (card: Day): Returnv =>{

  const{questions, answers} = card;

  //split away the questions and answers from each other.
  const toSplit = (str: string = ""):string[] => {
    let text = str.split('\n') || [];
    let arr: string[] = [""];
    text.forEach( (line=>{
      const regex2 = /^\d{1,2}\./
      let m = line.match( regex2 );
      if( m !== null) 
        arr.push( line + '\n');
      else
        arr[arr.length - 1] += line + '\n';
    }));
    return arr;
  }

  let questionsArr = toSplit( questions )
  let answersArr = toSplit( answers )

  // Make sure the extra text below the last question dont stick with the actual question
  let last = questionsArr.length > 0 ? questionsArr[questionsArr.length - 1] : "";
  let te = last.split('\n\n') || [];
  if( te.length > 1 ){
    let q:string = te.shift() || "";
    questionsArr[questionsArr.length - 1] = q;
    questionsArr.push('\n\n' + te.join('\n'));
  }else{
    questionsArr.push('');
  }

  // Make sure the extra text below the last answer dont stick with the actual answer
  let last2 = answersArr.length > 0 ? answersArr[answersArr.length - 1] : "";
  let te2 = last2.split('\n\n') || [];
  if( te2.length > 1 ){
    let q:string = te2.shift() || "";
    answersArr[answersArr.length - 1] = q;
    answersArr.push('\n\n' + te2.join('\n'));
  }else{
    answersArr.push('');
  }


  return ({
    questions: questionsArr, 
    answers: answersArr
  })
  // return activeCard;
}

export default splitAwayQuestionAndAnswers;