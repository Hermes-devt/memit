
import {iDay} from '../../../templatesTypes';

export const TransferFromQuestions = (card: iDay): iDay=>{

  let today = card;
  const toSplit = (str: string = "", regex2:any):string[] => {
    let text = str.split('\n') || [];
    let arr: string[] = [""];
    text.forEach( (line=>{
      let m = line.match( regex2 );
      if( m !== null) 
        arr.push( line + '\n');
      else
        arr[arr.length - 1] += line + '\n';
    }));
    return arr;
  }

  let questionAnswers = toSplit( today.questions, /^#/);

  let split: any = [];
  let leftOver: any = [];
  questionAnswers.forEach( (str:string)=>{
    let temp = toSplit( str, /^@/)
    if( temp.length === 2)
      split.push( temp );
    else{
      leftOver.push( temp );
    }
  });

  let q:string = ''; let a: string = ''
  split.forEach( (arr: any, index:number)=>{
    q += index+1 + ". " + arr[0].substring(1);
    a += index+1 + ". " + arr[1].substring(1).trim() + '\n';
  })

  q += "\n" + leftOver.join("");
  card = {...card, ...{questions: q, answers: a}}
  return card;
}

export default TransferFromQuestions;


