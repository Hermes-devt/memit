
// Break out question and answers from textarea before specific marking


export const breakOutQuestionAnswersFromNote = (questionAnswerString: string): {questions:string, answers: string}=>{
  // if( card.userInput === undefined ) return card;

  let newInput = questionAnswerString;

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

  return {questions: q, answers: a};
}

export default breakOutQuestionAnswersFromNote;