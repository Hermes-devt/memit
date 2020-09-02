// import React from 'react';


// import {Day} from '../../types';
export const transferQuestions = (cardIndex: number, props: any)=>{
  // if (props.data.list === undefined || props.data.list.length === 0){ return; }
    let today = {...props.data.list[props.data.list.length -1]};

    // console.log('here');
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

    // console.log( questionAnswers );
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
      q += index+1 + ". " + arr[0].substring(1).trim();
      a += index+1 + ". " + arr[1].substring(1).trim();
    })

    q += "\n" + leftOver.join("");
    today = {...today, ...{questions: q, answers: a}}
    let data = {...props.data};
    data.list[props.data.list.length -1] = {...today};
    props.update( data );
}

export default transferQuestions;