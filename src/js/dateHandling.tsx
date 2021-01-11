import { iUserClass } from "../templatesTypes";


export function createDate(): string{
  const min2digits = (value: number)=> value < 10 ? "0" + value : value;
  let d = new Date();
  let date = min2digits(d.getFullYear()) + '-' + min2digits(d.getMonth()) + "-" + min2digits(d.getDate());
  return date;
}

export function getDaysAfter1970(): number{
  let d = new Date();
  let ms: number = d.getTime();
  let daysAfter: number  = Math.floor( ms / (1000*3600*24) );
  return daysAfter;
}

export function getDayMonthFromInt(fromDay:number): string{
  let today:number = getDaysAfter1970();
  let date: Date = new Date();
  let diff = today - fromDay;
  var newDate: Date = new Date(date.setTime( date.getTime() - diff * 86400000 ));
  let str = newDate.getDate() + "/";

  let month: number = newDate.getMonth() + 1;
  str += month;
  return str;
}

export function ifNewDay(data: iUserClass): boolean {
  const list = data.get.list();
  if(list.length === 0 ) return true;

  let lastElement = list.length - 1;
  let latestDay = list[lastElement].created;
  let newDay = latestDay < getDaysAfter1970();
  return newDay;
}

export default {
  createDate,
  getDaysAfter1970,
  ifNewDay,
  getDayMonthFromInt,
}






































