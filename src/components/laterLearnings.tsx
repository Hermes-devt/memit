
import React, {useEffect, useState} from 'react';
import {Container} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import storage from '../store/data/action'
import {save} from '../js/storageHandling';
import { iLaterLearningsListItem, tLaterLearningsList, iUserClass, iListItem, iList} from '../templatesTypes';

import '../CSS/laterLearnings.scss';

export function LaterLearnings(){
  const [list, setList] = useState<iLaterLearningsListItem[]>( [] )

  const Data: any = useSelector<any>( (state: {data: iUserClass})=> state.data );
  const [selectedDailyCard, setSelectedDailyCard] = useState<number>(0)
  const dispatch = useDispatch();

  useEffect( ()=>{
    setList( Data.data.laterLearnings.list);
  }, []) // eslint-disable-line


  const createNewTextArea = ()=>{
    let newListItem = tLaterLearningsList("", "", 5);
    let copyOfList = [...list];
    copyOfList.push( newListItem );
    setList( copyOfList );

    Data.data.laterLearnings.list = copyOfList;
    dispatch( storage.setData(Data));
    save( Data );
  }

  const deleteTextArea = (index:number)=>{
    if( !window.confirm("Are you sure you want to delete the data field?") ) return;
    let copyOfList = [...list];
    copyOfList.splice(index, 1);
    saveData( copyOfList );
  }

  const splitOutQuestions = (textString: string, nrOfQuestionsToFetch: string | number):string=>{
    const stringDefaultState:string = textString;
    // let textString = str1;

    // splits the questions from each other
    const toSplit = (textToSplit: string = "", regex2:any):string[] => {
      let splitedText = textToSplit.split('\n') || [];
      let arr: string[] = [""];
      splitedText.forEach( (line=>{
        let regMatch = line.match( regex2 );
        if( regMatch !== null) {
          arr.push( line + '\n');
        } else{
          arr[arr.length - 1] += line + '\n';
        }
      }));
      return arr;
    }


    let questionAnswers = toSplit( textString, /^#/)
    let rest = questionAnswers.slice(Number(nrOfQuestionsToFetch)+1);
    questionAnswers = questionAnswers.slice(1, Number(nrOfQuestionsToFetch)+1);


    let misMatch = false;
    for(let i = 1; i< questionAnswers.length; i++){
      let match1 = ((questionAnswers[i]|| '').match(/^#/) || []).length;
      let match2 =  ((questionAnswers[i]|| '').match(/\n@/) || []).length;
      if( match1 !== 1 || match2 !==1){
        misMatch = true;
      }
    }
  
    // If something is wrong with the inputed user structure
    if( misMatch ){
      alert('Mismatch between the number of # and @. \n# should always be followed by a @' +
      "\n@question\n#answer")
      return stringDefaultState;
    }


    // let intoCard = Data.get.todaysCard();
    let intoCard: iListItem = Data.get.todaysCards()[selectedDailyCard];
    let split: [string, string][]= [];
    textString = '\n' + textString;
    questionAnswers.forEach( (str:string)=>{
      //split answer from question
      let temp = toSplit( str, /^@/)

      // make sure the length is 2
      if( temp.length === 2){
        let answer = temp[1].split("\n\n")[0];
        split.push([temp[0], answer ]);

        // Remove question and answer from the input field.
        textString = textString.replace( '\n' + temp[0], '');
        textString = textString.replace( answer, '');
      }
    });
    if( split.length === 0) 
      return stringDefaultState;

    // If all questions / answers are empty remove all empty questions
    let counter = 0;
    intoCard.questionAnswerPair.forEach( (item:any)=>{
      if( item.question.text.trim() === '' && item.answer.text.trim() === ''){
        counter++;
      }
    });
    intoCard.questionAnswerPair.splice(0, counter);

    // Insert new questions into the active card
    split.forEach( (pair: [string, string] )=>{ intoCard.questionAnswerPair.push({
        questionID: 5,
        question: {text: pair[0].length > 0 ? pair[0].substring(1) : "" },
        answer: {text: pair[1].length > 0 ? pair[1].substring(1) : "" },
    })});


    dispatch( storage.setData({...Data}));
    save( Data );
    return rest.join('');
  }


  const saveData = (newList: iLaterLearningsListItem[]):void=>{
    setList( newList );
    Data.data.laterLearnings.list = newList;
    dispatch( storage.setData(Data));
    save( Data );
  }

  return(
    <Container fluid id="laterLearningsContainer">
      <div id="createDeleteDatablockContainer">
        <span id="">Create new data block:</span>
        <span id="createNewDatablockButton" onClick={ ()=>{ createNewTextArea() }} >Create</span>


        { Data.get.todaysCards().length > 1 && <div id="cardSelector">
          <span className="header">To daily card:</span>
          { Data.get.todaysCards().map( (item:iListItem, index:number)=>{
            return(
            <div 
              onClick={ ()=> setSelectedDailyCard(index)}
              key={index} 
              className={ (selectedDailyCard === index ? "item active" : "item") }>
              {item.tags ? (index+1 + ". " + item.tags) :  (index+1 + ". No tags set") }
            </div>)
          })}
        </div>}
      </div>

      

      {list.map( (item: iLaterLearningsListItem, index:number)=>{
        return(<div key={index} className="deckContainer">
          <div className="settingsContainer">
            <input className="inputDeckName" type="text" placeholder="Headline"
              value={item.name}
              onChange={ (evt:any)=>{ 
                let newList = [...list];
                newList[index].name = evt.target.value;
                setList( newList );
                saveData( newList );
            }} />

            <span className="fetchSettings">
              <span id="fetch"
                onClick={ ()=>{
                  let leftOverQuestions: string = splitOutQuestions(list[index].questionsAnswers, list[index].questionsToFetch );
                  let newList = [...list];
                  newList[index].questionsAnswers = leftOverQuestions;
                  saveData(newList);
                }}
              >Fetch Questions</span>

              <input id="inputNumberOfQuestionsToFetch" type="text" placeholder="0"
                value={item.questionsToFetch}
                onChange={ (evt)=>{ 
                  let newList = [...list];
                  if( isNaN( Number(evt.target.value)) && evt.target.value !== "") return;
                  newList[index].questionsToFetch = Number( evt.target.value);
                  saveData(newList);
                }}
              />
              <span id="deleteDatablockButton"
              onClick={ ()=>{ deleteTextArea(index)}}>X</span>
              </span>
          </div>

          <textarea className="questionsAnswers" placeholder="Questions"
            value={item.questionsAnswers}
            onChange={ (evt)=>{ 
              let newList = [...list];
              newList[index].questionsAnswers = evt.target.value;
              saveData( newList );
            }}
          />
        </div>) })
      }

    </Container>
  )
}

export default LaterLearnings;




