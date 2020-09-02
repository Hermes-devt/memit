
export interface Day {
  questions: string,
  answers: string,
  tags: string[],
  onDay: number,
  creationDate?: string,
  userInput?: string,
}

export interface UserData{
  schedule: number[],
  lastUse: {date: number},
  list: Day[],
  dailyCards: {ID: number, done: boolean}[],
  missedCards: {ID: number, done:boolean}[],
  laterLearnings?: any,
}
export interface iDailyCard { ID: number, done: boolean }
export interface iMissedCard { ID: number, done: boolean, }

export interface CardsToRepeat{
  ID: number,
  done: boolean,
}

export interface iCardsToRepeat{
  ID: number,
  done: boolean,
}

export interface DailyNotes{
  onDay: number,
  questions: string,
  answers: string,
}

export interface tLaterType{
  name: string,
  answers: string,
  questions: string,
  questionsFetch: string | number,
}

export interface tLaterTypes extends Array<tLaterType>{}
