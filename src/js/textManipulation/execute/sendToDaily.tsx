

import {iUserData} from '../../../templatesTypes';
export const sendToDaily = (data: iUserData, card: any, activeNote: number): iUserData =>{

  const re = /\nsend/
  let sendMatch = card.userInput.match(re);

  if(sendMatch){
    let subStr = card.userInput.substring(0, sendMatch.index);
    card.userInput = card.userInput.replace(re, "");

    let leftOver = card.userInput.substring(sendMatch.index).trim();
    card.userInput = leftOver;
    data.dailyNotes.newData += subStr;
  }
  return data;
}

export default sendToDaily;