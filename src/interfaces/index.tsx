
export interface Day {
  questions: string,
  answers: string,
  tags: string[],
  creationDate: string,
  onDay: number,
}

export interface UserData{
  schedule: number[],
  lastUse: {date: number},
  list: Day[],
  dailyCards: {ID: number, done: boolean}[],
  missedCards: {ID: number, done:boolean}[]
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