

import {Day} from '../types';

export function cardsCounter(cards: Day[]): number{
  let accumulator = 0;
  for(let i=0; i < cards.length; i++){
    accumulator += cardCounter( cards[i]);
  }
  return accumulator;
}

export function cardCounter( card: Day): number {
  const re = /\r\n|\r|\n\s*\d/g;
  const count = ((card || {questions:''}).questions.match(re) || []).length;
  return count;
}

export function laterCardsCounter(cards: Day[]): number{
  let accumulator = 0;
  for(let i=0; i < cards.length; i++){
    accumulator += cardCounter( cards[i]);
  }
  return accumulator;
}

export function laterCardCounter( card: Day): number {
  const re = /\r\n|\r|\n\s*\d/g;
  const count = ((card || {questions:''}).questions.match(re) || []).length;
  return count;
}