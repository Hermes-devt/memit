
import React, {useEffect, useState} from 'react';
import {Container} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import storage from '../store/data/action'
import {save} from '../js/storageHandling';
import adjustNumbersFromQuestionAndAnswers from '../js/textManipulation/adjustNumbers';
import { iLaterLearningsList, tLaterLearningsList, iDay, iUserData } from '../templatesTypes';

import '../CSS/laterLearnings.scss';

export function LaterLearnings(){
  const [list, setList] = useState<iLaterLearningsList[]>( [] )

  const Data: any = useSelector<any>( (state: {data: iUserData })=> state.data );
  const dispatch = useDispatch();

  useEffect( ()=>{
    let data: iUserData = Data;
    setList( data.laterLearnings.list);
  }, []) // eslint-disable-line


  const createNewTextArea = ()=>{
    let newListItem = tLaterLearningsList("", "", 5);
    let copyOfList = [...list];
    copyOfList.push( newListItem );
    setList( copyOfList );

    Data.laterLearnings.list = copyOfList;
    dispatch( storage.setData(Data));
    save( Data );
  }

  const deleteTextArea = (index:number)=>{
    if( !window.confirm("Are you sure you want to delete the data field?") ) return;
    let copyOfList = [...list];
    copyOfList.splice(index, 1);
    saveData( copyOfList );
  }

  const splitOutQuestions = (str1: string, nrOfQuestionsToFetch: string | number):string=>{
    let newInput = str1;

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

    // Split out the questions from each other.
    let questionAnswers = toSplit( newInput, /^#/)
    let split: Array<string[]> = [];

    questionAnswers.forEach( (questionAnswer:string)=>{
      //split the answer from the question
      let questionSeperatedFromTheAnswer = toSplit( questionAnswer, /^@/)
      if( questionSeperatedFromTheAnswer.length === 2){
        // Split the answer from the rest of the text below the question
        let answer = questionSeperatedFromTheAnswer[1].split("\n\n")[0];
        split.push([questionSeperatedFromTheAnswer[0], answer ]);
        // Remove question and answer from the input field.
        newInput = newInput.replace( '\n' + questionSeperatedFromTheAnswer[0], '');
        newInput = newInput.replace( answer, '');
      }
    });

    // questionStringToTodaysCard
    let questionStringToTodaysCard:string = ''; 
    let answerStringToTodaysCard: string = ''

    newInput = '\n' + str1;
    let maximumFetch = nrOfQuestionsToFetch > split.length ? split.length : nrOfQuestionsToFetch;
    let unFetchedQuestionsAnswers:string = ""

    for( let questionIndex:number=0; questionIndex < split.length; questionIndex++){
      if( questionIndex < maximumFetch ){
        questionStringToTodaysCard += questionIndex +1 + ". " +  split[questionIndex][0].substring(1);
        answerStringToTodaysCard += questionIndex+1 + ". " +   split[questionIndex][1].substring(1).trim() + '\n';
      }else{
        unFetchedQuestionsAnswers += split[questionIndex][0] + split[questionIndex][1].trim() + '\n';
      }
    }

    let todaysNote: iDay = {...Data.list[ Data.list.length - 1]};
    todaysNote.questions = todaysNote.questions.trim() + (todaysNote.questions.includes("\n") ? '\n' : '') + questionStringToTodaysCard;
    todaysNote.answers = todaysNote.answers.trim() + (todaysNote.answers.includes("\n") ? '\n' : '') + answerStringToTodaysCard;
    todaysNote = adjustNumbersFromQuestionAndAnswers( todaysNote )

    Data.list[Data.list.length -1] = todaysNote;
    dispatch( storage.setData({...Data}));
    // save( Data );

    return unFetchedQuestionsAnswers;
  }


  const saveData = (newList:any):void=>{
    setList( newList );
    Data.laterLearnings.list = newList;
    dispatch( storage.setData(Data));
    save( Data );
  }

  return(
    <Container fluid id="laterLearningsContainer">
      <div id="createDeleteDatablockContainer">
        <span id="">Create new data block:</span>
        <span id="createNewDatablockButton" onClick={ ()=>{ createNewTextArea() }} >Create</span>
      </div>

      {list.map( (item: iLaterLearningsList, index:number)=>{
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
                  newList[index].questionsToFetch = evt.target.value;
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




