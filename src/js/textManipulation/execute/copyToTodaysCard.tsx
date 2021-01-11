import { iListItem, iQuestionAnswerPair, iUserClass } from "../../../templatesTypes";

// Copy questions to todays card. 
export const copyToTodaysCard = (data: iUserClass, activeCard:number, toCopy: number[]): void=>{
  if( toCopy.length < 1 ) return;

  let list = data.data.list[activeCard].questionAnswerPair;

  let questions: iQuestionAnswerPair[] = [];
  toCopy.forEach( (indexPos:number)=>{
    --indexPos;
    if( indexPos >= 0 && indexPos < list.length)
    questions.push( list[indexPos]);
  })

  let todays: iListItem = data.get.todaysCard();

  let counter = 0;
  todays.questionAnswerPair.forEach( (item: iQuestionAnswerPair )=>{
    if( item.question.text.trim() === '' && item.answer.text.trim() === ''){
      counter++;
    }
  });

  if( counter === todays.questionAnswerPair.length)
    todays.questionAnswerPair = []; 
  questions.forEach( (pair: iQuestionAnswerPair)=> todays.questionAnswerPair.push( pair) );

}

export default copyToTodaysCard;