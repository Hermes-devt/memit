
// Clear away all the information that exist in the card
// with the command clear-card

import {iDay} from '../../../templatesTypes';
export const clearCard = (card: iDay):iDay=>{
  card = {...card, ...{questions: "", answers: "", tags:[""]}};
  
  if( card.userInput !== null && card.userInput !== undefined)
    card.userInput = "" 

  return card;
}

export default clearCard;