
export const clearAwayCommands = (userInput: string): string=>{
  let userInputArr: string[] = userInput.split('\n') || [];

  let newUserInputStr:string = '';
  userInputArr.forEach( (line=>{
    const regex2 = /^\d+[rxqaRQX]{1,4}$/
    let line2 = line.replace( regex2, '');

    if( line !== 'e' && 
        line !== 'transfer-questions' && 
        line !== 'clear-card') 
      newUserInputStr += line !== line2 ? line2.trim() : line.trim() + '\n';
  }));


  return newUserInputStr;
}

export default clearAwayCommands;

