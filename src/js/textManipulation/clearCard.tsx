
// Clear away all the information that exist in the card
// with the command clear-card

import {Day} from '../../types';
export const clearCard = (card: Day):Day=>{
  card = {...card, ...{questions: "", answers: "", tags:[""]}};
  
  if( card.userInput !== null && card.userInput !== undefined)
    card.userInput = "" 

  return card;
}

export default clearCard;