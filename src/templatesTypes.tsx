import dateHandling from './js/dateHandling';
// import { generateCardID } from './js/util';


export interface iLaterLearningsListItem{
  name: string;
  questionsAnswers: string;
  questionsToFetch: number;
}

export interface iLaterLearnings{
  list: iLaterLearningsListItem[];
}

export const tLaterLearningsList = (name: string, questionsAnswers: string, questionsToFetch: number): iLaterLearningsListItem =>{ return(
  { name, questionsAnswers, questionsToFetch})}

export interface iQuestionAnswer{
  text: string;
}

export interface iQuestionAnswerPair{
  questionID: number;
  question: iQuestionAnswer;
  answer: iQuestionAnswer;
}

export const tQuestionAnswerPair = (question: string="", answer: string="", questionID: number|undefined = 5 ):iQuestionAnswerPair=>{
  //function that generates a unique ID
  return ({
    questionID,
    question: {text: question},
    answer: {text: answer},
  })
}

export interface iCardSetting{
  pause?: any;
  customSchedule?: number[];
  extraRepeats?: number[];
}

export interface iListItem{
  cardID: number;
  created: number;
  tags: string;
  questionAnswerPair: iQuestionAnswerPair[];
  userInput?: string;
  style?: any;
  cardSetting?: iCardSetting;
}

export const tListItem = ( cardID:number, question: string="", answer: string="", tags: string = '', created: number = dateHandling.getDaysAfter1970()): iListItem=>{
  return ({
    cardID,
    created,
    tags: tags,
    questionAnswerPair: [{questionID: created, question: {text: question}, answer: {text: answer}}],
    userInput: "",
  })
}

export interface iList extends Array<iListItem>{}


export interface iNoteListItem{
  headline: string;
  text: string;
}

export interface iNote{
  list: iNoteListItem[];
}

export interface iInterface{
  cardLayout: number;
  activeNote: number;
  minimize: boolean;
  displayMissing: true;
  version: number;
}

export interface iDailyNotes{
  newData: string;
  oldData: string;
}

export interface iDailyCards{
  done: boolean;
  ID: number;
  card: iListItem;
}

export interface iMissedCards{
  ID: number;
  done: boolean;
  card?: iListItem;
}

export interface iLastUse{
  date: number;
}

export interface iUserData{
  list: iList;
  dailyCards: iDailyCards[];
  lastUse: iLastUse;
  schedule: number[];
  missedCards: iMissedCards[];
  laterLearnings: iLaterLearnings;
  dailyNotes: iDailyNotes;
  note: iNote;
  settings: iInterface;
  version?: number;
}

export interface iUserClass{
  data: iUserData;
  get: any,
  set: any,
}


export function tUserData(): iUserData{
  let data: any= {
    list: [tListItem(1)],
    dailyCards: [],
    lastUse: { date: dateHandling.getDaysAfter1970()},
    schedule: [0, 1, 3, 6, 12, 24, 48, 100, 200, 400, 800, 1600],
    missedCards: [],
    laterLearnings: { list: [{name: "Mix", questionsAnswers: "",  questionsToFetch: 10}] },
    dailyNotes: {newData: "", oldData: ""},
    note: { list: [{headline: "New doc", text: ""}], str: ""},
    settings: { 
      version: 1,
      cardLayout: 1, 
      activeNote: 0, 
      minimize: false, 
      displayMissing: true
    },
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

