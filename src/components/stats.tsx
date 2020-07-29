
import React, {useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import {cardsCounter} from '../js/questionCounter';

export function Stats():any{
  const data:any = useSelector<any>( state=>state.data);
  let [dataStringified, setDataStringified] = useState<string>("");
  let [dataSize, setDataSize] = useState<number>(0);
  let [insertedDays, setInsertedDays ] = useState<number>(0);
  let [totalNrQuestions, setTotalNrQuestions] = useState<number>(0);

  let [displayAdditionalData, setDisplayAdditionalData] = useState<boolean>(false);
  useEffect( ()=>{
    setInsertedDays(data.list.length);
    setTotalNrQuestions( cardsCounter(data.list));
  },[]); //eslint-disable-line

  const loadData = ()=>{
    let dataStringified = JSON.stringify(data);
    setDataStringified(dataStringified);

    let dataSize:number = Number( dataStringified.length * 8 / 1000000);


    setDataSize( Number( dataSize.toFixed(1)) );
    // setDataSize( dataStringified.length  * 8 / 1000);
  }

  return(
    <Container fluid id="stats">
      <span className="stats" >Stats</span>

      <span className="days">
        <span className='tSilver'>Cards: </span>
        <span>{insertedDays}</span>
      </span>

      <span className="nrOfQuestions">
        <span className="tSilver">Questions: </span>
        <span>{totalNrQuestions}</span>
      </span>

      { !displayAdditionalData && <span onClick={ ()=>{ loadData(); setDisplayAdditionalData(true); }} className="loadMore" >More data </span>}

      { displayAdditionalData && <>
        <span className="dataSize">
          <span className="tSilver">Data size: </span>
          <span> {dataSize} / 5 MB</span>
        </span>

        <span className="serializeData">
          <span className="tSilver">Serialized data: </span>
          <textarea className="dataString" onChange={ ()=>{}} name="" id="" cols={10} rows={1} value={dataStringified} /> 
        </span>
      </>}
    </Container>
  )
}

export default Stats;
