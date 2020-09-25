
import React, {useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import {cardsCounter} from '../js/questionCounter';
import '../CSS/stats.scss';

export function Stats():any{
  const data:any = useSelector<any>( state=>state.data);
  let [dataStringified, setDataStringified] = useState<string>("");
  let [dataSize, setDataSize] = useState<number>(0);
  let [insertedDays, setInsertedDays ] = useState<number>(0);
  let [totalNrQuestions, setTotalNrQuestions] = useState<number>(0);
  let [streak, setStreak] = useState<number>(0);

  let [displayAdditionalData, setDisplayAdditionalData] = useState<boolean>(false);
  useEffect( ()=>{
    setInsertedDays(data.list.length);
    let daysRegistered = data.list[ data.list.length -1].onDay - data.list[0].onDay;
    setStreak( daysRegistered );
    setTotalNrQuestions( cardsCounter(data.list));
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

  const loadData = ()=>{
    let dataStringified = JSON.stringify(data);
    setDataStringified(dataStringified);
    localStorageSpace();
  }

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

      { !displayAdditionalData && <span onClick={ ()=>{ loadData(); setDisplayAdditionalData(true); }} className="item pointer">More data </span>}

      { displayAdditionalData && <span style={{display:'inline-block'}}>
        <span className="item">
          <span className="tSilver">Data size: </span>
          <span> {dataSize} KB</span>
        </span>

        <span className="item">
          <span className="tSilver">Serialized data: </span>
          <textarea className="dataString" onChange={ ()=>{}} name="" id="" cols={10} rows={1} value={dataStringified} /> 
        </span>
      </span> }
    </Container>
  )
}

export default Stats;
