import dateHandling from './dateHandling';
import {iList, iUserData, iUserClass, tUserData, iListItem, iDailyCards, iQuestionAnswerPair} from '../templatesTypes';


// textareaText += index+1 + ". " + obj[name as keyof iQuestionAnswerPair].text.trim() + '\n' 
export const appendMethods = (userData: iUserData): iUserClass=>{
  class DataClass{
    data: iUserData = tUserData()
    // data:any = userData

    constructor(userData:any){
      this.data = userData;
    }

    get = {
      schedule: (): number[] =>{ return this.data.schedule },
      length: ():number =>{ return this.data.list.length || 0; },
      todaysCardToRepeat: (): iDailyCards[] =>{ return this.data.dailyCards; },
      settings: ()=>{ return this.data.settings },
      list: (): iList =>{ return this.data.list;},

      todaysCard:(): iListItem =>{
        let dataPos:any = this.data.list.length - 1 > 0 ? this.data.list.length -1 : 0;
        return this.data.list[dataPos];
      },

      listItem:(cardIndex: number)=>{
        if( cardIndex < 0 || cardIndex >= this.data.list.length -1 )
          return undefined;
        return this.data.list[cardIndex];
      },

      todaysCards:(): iList =>{
        let len = this.data.list.length - 1;
        let todayInInt = dateHandling.getDaysAfter1970();
        let arr = [];

        for( let i = len; i >= 0; i--){
          if( this.data.list[i].created === todayInInt ){
            arr.push( this.data.list[i] );
          }else{
            break;
          }
        }
        return arr;
      },

      cardFromIndex: (indexPos: number): iListItem|null =>{
        if( isNaN(indexPos)) return null;
        if( indexPos < 0 || indexPos >= this.data.list.length - 1) return null;
        return this.data.list[indexPos];
        // return this.data.list[indexPos];
      },

      indexFromCard2: (day: iListItem): number =>{
        let len = this.data.list.length - 1;

        for( let i = len; i >= 0; i--){
          if( this.data.list[i].cardID === day.cardID ){
            return i;
          }
        }
        return 0;
      },


      question: (card: iListItem, question:number): iQuestionAnswerPair|undefined =>{
        --question;
        let len = card.questionAnswerPair.length;
        if( question < 0 && question >= len )
          return undefined;
        return card.questionAnswerPair[question];
      },
    }

    set = {
      schedule: (newSchedule: number[])=>{
        this.data.schedule = [...newSchedule];
      },

      list: (newList:any)=>{
        this.data.list = newList;
      },

      layout: (layout: number)=>{
        this.data.settings.cardLayout = layout ;
      },

      removeQuestion: ()=>{
      },

      insertQuestion: ()=>{

      }

      // setQuestionAnswerPairFromId(questionId: number){ }
      // getQuestionAnswerPairFromId(questionId: number){ }
    }
  }

  let dataClass:any = new DataClass(userData);
  return dataClass;
}
