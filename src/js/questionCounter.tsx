


export function cardsCounter(cards:any): number{
  let accumulator = 0;
  for(let i=0; i < cards.length; i++){
    accumulator += cardCounter( cards[i]);
  }
  return 5;
}

export function cardCounter( card:any ): number {
  const re = /\r\n|\r|\n\s*\d/g;
  const count = ((card || {questions:''}).questions.match(re) || []).length;
  return count;
}