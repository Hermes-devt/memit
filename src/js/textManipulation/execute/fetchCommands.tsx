
export const fetchCommands = (str: string):string[] =>{
  let text = str.split('\n') || [];
  let arr: string[] = [];
  text.forEach( (line=>{
    const regex2 = /^\d+[rxqaRQXlL]{1,4}$/
    let m = line.match( regex2 );
    if( m !== null) 
      arr.push( m[0]);
  }));

  return arr;
}

export default fetchCommands;
