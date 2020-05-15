

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


export default {
  lastElement,
  getDaysAfter1970,
}

























