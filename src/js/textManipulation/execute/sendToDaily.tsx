import { iUserClass, iListItem } from "../../../templatesTypes";

export const sendToDaily = (data: iUserClass, card: iListItem): iUserClass =>{
  // alert('here');
  if( !card.userInput )
    return data;

  const re = /\nsend/
  let sendMatch = card.userInput.match(re);

  if(sendMatch){
    let subStr: string = card.userInput.substring(0, sendMatch.index);
    card.userInput = card.userInput.replace(re, "");

    if( sendMatch.index ){
      let leftOver:string = card.userInput.substring(sendMatch.index).trim();
      card.userInput = leftOver;
    }
    data.data.dailyNotes.newData += subStr;
  }
  return data;
}

export default sendToDaily;