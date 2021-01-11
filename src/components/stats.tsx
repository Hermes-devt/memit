
import React, {useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import {cardQuestionCounter} from '../js/questionCounter';
import { iList, iUserClass } from '../templatesTypes';
import '../CSS/stats.scss';

interface Props{
  data: iUserClass;
}

export function Stats(props: Props):any{
  let [dataSize, setDataSize] = useState<number>(0);
  let [insertedDays, setInsertedDays ] = useState<number>(0);
  let [totalNrQuestions, setTotalNrQuestions] = useState<number>(0);
  let [streak, setStreak] = useState<number>(0);
  let [displayAdditionalData, setDisplayAdditionalData] = useState<boolean>(false);

  useEffect( ()=>{

    let list: iList = props.data.get.list();
    setInsertedDays( list.length );
    let daysRegistered = list[ list.length -1].created - list[0].created;
    setStreak( daysRegistered );
    setTotalNrQuestions( cardQuestionCounter(list));

  },[]); //eslint-disable-line

  const localStorageSpace = ()=>{
    let dataAsString= '';
    for(let key in window.localStorage){
        if(window.localStorage.hasOwnProperty(key)){
          dataAsString += window.localStorage[key];
        }
    }
    // Get data in total KB
    let storageSize = dataAsString ? 3 + ((dataAsString.length*16)/(8*1024)) : 0;
    setDataSize(Math.ceil( Number(storageSize)) );
  };

  return(
    <Container fluid id="stats">
      <span className="item" >Stats</span>

      <span className="item">
        <span className='tSilver'>Cards: </span>
        <span>{insertedDays}</span>
      </span>

      <span className="item">
        <span className="tSilver">Questions: </span>
        <span>{totalNrQuestions}</span>
      </span>

      <span className="item">
        <span className="tSilver">Streak:</span>
        <span> {streak} days</span>
      </span>

      { !displayAdditionalData && <span onClick={ ()=>{ localStorageSpace(); setDisplayAdditionalData(true); }} className="item pointer">More data </span>}

      { displayAdditionalData && <span style={{display:'inline-block'}}>
        <span className="item">
          <span className="tSilver">Data size: </span>
          <span> {dataSize} KB</span>
        </span>

      </span> }
    </Container>
  )
}

export default Stats;
