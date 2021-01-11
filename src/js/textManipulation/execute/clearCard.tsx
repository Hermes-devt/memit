
// Clear away all the information that exist in the card
// with the command clear-card

import { iListItem } from "../../../templatesTypes";

export const clearCard = (card: iListItem): iListItem=>{

  if( card.userInput !== null && card.userInput !== undefined)
    card.userInput = "" 

  card.tags = '';
  card.questionAnswerPair = [];
  return card;
}

export default clearCard;