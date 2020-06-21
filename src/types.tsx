
export interface Day {
  questions: string,
  answers: string,
  tags: string[],
  creationDate?: string,
  onDay: number,
}

export interface UserData{
  schedule: number[],
  lastUse: {date: number},
  list: Day[],
  dailyCards: {ID: number, done: boolean}[],
  missedCards: {ID: number, done:boolean}[],
  laterLearnings?: any,
}

export interface CardsToRepeat{
  ID: number,
  done: boolean,
}

export interface DailyNotes{
  onDay: number,
  questions: string,
  answers: string,
}

// export interface MyInterface extends Array<MyType> { }

// export interface tLaterTypes extends Array<tLaterTypes>{
export interface tLaterTypes{
  name: string,
  answers: string,
  questions: string,
  questionsFetch: string | number,
}

export interface tLaterTypesArr{
  array: tLaterTypes,
}