import { iUserClass } from "../templatesTypes";


export function lastElement( arr: object[]): number{
  return arr.length > 0 ? arr.length - 1 : 0;
}

export function getDaysAfter1970(): number{
  let d = new Date();
  let ms: number = d.getTime();
  const secondsInaDay = 86400000;
  let daysAfter: number = Math.floor( ( ms / secondsInaDay) );
  return daysAfter;
}

export function generateCardID(data: iUserClass): number{
  let list = data.get.list();
  let lastDay = list[ list.length-1];

  let cardID = -1;
  for( let i = list.length-1; i >= 0; i--){
    if( lastDay.created !== list[i].created){
      cardID = list[i+1].cardID + 1;
      break;
    }
  }
  if( cardID < 0){
    cardID = list[list.length-1].cardID + 1
  }
  return cardID;
}


export default {
  lastElement,
  getDaysAfter1970,
}

























