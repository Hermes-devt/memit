

export const replaceMultipleCommands = (text: string): string =>{
  const regex2 = /^\d+-\d+[rxqaRQXl]{1,4}$/
  let textArr = text.split('\n') || [];
  let nText: string[] = [];

  textArr.forEach( ( (line:string)=>{
    let m = line.match( regex2 );
    if( m !== null) {
      const re3 = /[rxqaRQXl]{1,4}$/;
      let firstDigit:number = Number( (line.match( /^\d+/ ) || ['0'])[0] );
      const secondDigit = Number((line.match( /-\d+/ ) || ['0'])[0].substring(1));
      const command = (line.match( re3 ) || [""])[0];
      for(; firstDigit <= secondDigit; firstDigit++ ){
        nText.push( (firstDigit + command).trim());
      }
    }else{
      nText.push( line.trim() );
    }
  }));

  let inputString = nText.join('\n');
  return inputString ;
}

export default replaceMultipleCommands;
