

import {iDay} from '../templatesTypes';

export function cardsCounter(cards: iDay[]): number{
  let accumulator = 0;
  for(let i=0; i < cards.length; i++){
    accumulator += cardCounter( cards[i]);
  }
  return accumulator;
}

export function cardCounter( card: iDay): number {
  const re = /\r\n|\r|\n\s*\d/g;
  const count = ((card || {questions:''}).questions.match(re) || []).length;
  return count;
}

export function laterCardsCounter(cards: iDay[]): number{
  let accumulator = 0;
  for(let i=0; i < cards.length; i++){
    accumulator += cardCounter( cards[i]);
  }
  return accumulator;
}

export function laterCardCounter( card: iDay): number {
  const re = /\r\n|\r|\n\s*\d/g;
  const count = ((card || {questions:''}).questions.match(re) || []).length;
  return count;
}