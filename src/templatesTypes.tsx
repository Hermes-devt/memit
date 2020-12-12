import dateHandling from './js/dateHandling';

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
  userInput?: string,
}

export const tDay = ( questions: string="", answers: string="", tags: string[] = [], onDay: number = dateHandling.getDaysAfter1970()): iDay=>{
  return { 
    questions, 
    answers, 
    tags, 
    onDay,
  };
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
  settings: { cardLayout: number, activeNote: number, minimize?: boolean };
}

export function tUserData(): iUserData{
  let data: iUserData = {
    list: [],
    dailyCards: [],
    lastUse: { date: dateHandling.getDaysAfter1970()},
    schedule: [0, 1, 3, 6, 12, 24, 48, 100, 200, 400, 800, 1600],
    missedCards: [],
    laterLearnings: { list: [{name: "Mix", questionsAnswers: "",  questionsToFetch: 10}, {name: "Mix2", questionsAnswers: "",  questionsToFetch: 10}] },
    // laterLearnings: { list: [] },
    dailyNotes: {newData: "", oldData: ""},
    note: { list: [{headline: "New doc", text: ""}], str: ""},
    settings: { cardLayout: 1, activeNote: 0, minimize: false}
  }
  return data;
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

