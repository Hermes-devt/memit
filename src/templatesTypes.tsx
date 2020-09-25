
export interface iLaterLearningsList{
  name: string;
  questionsAnswers: string;
  questionsToFetch: string|number;
}
export const tLaterLearningsList = (name: string, questionsAnswers: string, questionsToFetch: string | number): iLaterLearningsList =>{ return(
  { name, questionsAnswers, questionsToFetch})}


export interface iDay {
  questions: string,
  answers: string,
  tags: string[],
  onDay: number,
  creationDate?: string,
  userInput?: string,
}
export const tDay = ( questions: string, answers: string, tags: string[], onDay: number): iDay=>{
  return { questions, answers, tags, onDay, creationDate: "" };
}

export interface iUserData{
  schedule: number[];
  lastUse: {date: number};
  list: iDay[];
  dailyCards: {ID: number, done: boolean}[];
  missedCards: {ID: number, done:boolean}[];
  laterLearnings?: any;
  dailyNotes: {newData: string, oldData: string};
  note?: any;
}


export interface iCardsToRepeat{
  ID: number,
  done: boolean,
}


export interface iMissedCard { 
  ID: number, 
  done: boolean, 
  data?: any;
}

// export function laterType(name: string = '', answers: string = '', questions: string = '', questionsFetch: number = 5):tLaterType{
//   return ({ name, answers, questions, questionsFetch})
// }

// export default{
//   laterType,
// }
// export interface DailyNotes{
//   onDay: number,
//   questions: string,
//   answers: string,
// }

// export interface Day {
  //   questions: string,
  //   answers: string,
  //   tags: string[],
  //   onDay: number,
  //   creationDate?: string,
  //   userInput?: string,
  // }
  
  // export interface UserData{
  //   schedule: number[],
  //   lastUse: {date: number},
  //   list: Day[],
  //   dailyCards: {ID: number, done: boolean}[],
  //   missedCards: {ID: number, done:boolean}[],
  //   laterLearnings?: any;
  //   dailyLearnings?: any;
  //   dailyNotes: {newData: string, oldData: string};
  //   note?: any;
  // }
  
  // export interface iDailyCard { ID: number, done: boolean }
  // export interface iMissedCard { ID: number, done: boolean, }
  
  // export interface CardsToRepeat{
  //   ID: number,
  //   done: boolean,
  // }
  
  // export interface iCardsToRepeat{
  //   ID: number,
  //   done: boolean,
  // }
  
  // export interface DailyNotes{
  //   onDay: number,
  //   questions: string,
  //   answers: string,
  // }
  
  // export interface tLaterType{
  //   name: string,
  //   answers: string,
  //   questions: string,
  //   questionsFetch: string | number,
  // }
  
  // export interface tLaterTypes extends Array<tLaterType>{}