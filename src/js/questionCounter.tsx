
import { iList, iListItem } from "../templatesTypes";

export function cardQuestionCounter( cards: iList): number{
  let count = 0;
  cards.forEach( (card: iListItem)=>{
    if( card.questionAnswerPair.length === 1){
      if( card.questionAnswerPair[0].question.text !== ""){
        count = 1;
      }
    }
    if( card.questionAnswerPair.length > 1){
      count += card.questionAnswerPair.length-1;
    }
  })
  return count;
}
