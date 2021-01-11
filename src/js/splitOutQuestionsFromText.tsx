import { iListItem, iQuestionAnswerPair } from "../templatesTypes";

export const splitOutQuestionsFromText = (textString: string, intoCard: iListItem): boolean=>{

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
  let questionAnswers = toSplit( textString, /^#/)

  // Check so each split contains one  \n# and one \n@
  let misMatch = false;
  for(let i = 1; i< questionAnswers.length; i++){
    let match1 = ((questionAnswers[i]|| '').match(/^#/) || []).length;
    let match2 =  ((questionAnswers[i]|| '').match(/\n@/) || []).length;
    if( match1 !== 1 || match2 !==1){
      misMatch = true;
    }
  }

  // If something is wrong with the inputed user structure
  if( misMatch ){
    alert('Mismatch between the number of # and @. \n# should always be followed by a @' +
    "\n@question\n#answer")
    return false ;
  }

  let split: [string, string][]= [];
  textString = '\n' + textString;
  questionAnswers.forEach( (str:string)=>{
    //split answer from question
    let question_answer_split = toSplit( str, /^@/)

    // make sure the length is 2
    if( question_answer_split.length === 2){
      let answer = question_answer_split[1].split("\n\n")[0];
      split.push([question_answer_split[0], answer ]);

      // Remove question and answer from the input field.
      textString = textString.replace( '\n' + question_answer_split[0], '');
      textString = textString.replace( answer, '');
    }
  });
  if( split.length === 0) return false;

  // If all questions / answers are empty remove all empty questions
  let counter = 0;
  intoCard.questionAnswerPair.forEach( (item: iQuestionAnswerPair)=>{
    if( item.question.text.trim() === '' && item.answer.text.trim() === ''){
      counter++;
    }
  });

  intoCard.questionAnswerPair.splice(0, counter);

  // Insert new questions into the active card
  split.forEach( (pair: [string, string], index:number)=>{ intoCard.questionAnswerPair.push({
      questionID: index,
      question: {text: pair[0].length > 0 ? pair[0].substring(1) : "" },
      answer: {text: pair[1].length > 0 ? pair[1].substring(1) : "" },
  })});
    
  return true;
}
export default splitOutQuestionsFromText;