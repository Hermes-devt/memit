
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
    // let dataStringified = JSON.stringify(data);
    // setDataStringified(dataStringified);
    // setDataSize( dataStringified.length  * 8 / 1000 );
    setInsertedDays(data.list.length);
    setTotalNrQuestions( cardsCounter(data.list));
  },[]);

  const loadData = ()=>{
    let dataStringified = JSON.stringify(data);
    setDataStringified(dataStringified);
    setDataSize( dataStringified.length  * 8 / 1000 );
    // setInsertedDays(data.list.length);
    // setTotalNrQuestions( cardsCounter(data.list));
  }
  return(
    <Container fluid style={container}>
      <span style={{display: 'inline-block', width: 50, color: 'silver', cursor: 'pointer', borderRight: ''}}
      >Stats |</span>

      <span style={{display: 'inline-block', width: 105, marginLeft: 10, borderRight: '1px solid silver'}}>
        <span style={{color: 'silver'}}>Cards: </span>
        <span>{insertedDays}</span>
      </span>

      <span style={{display: 'inline-block', width: 200, marginLeft: 10, borderRight: '1px solid silver'}}>
        <span style={{color: 'silver'}}>Number of questions: </span>
        <span>{totalNrQuestions}</span>
      </span>

      { !displayAdditionalData && <span 
        onClick={ (evt)=>{ loadData(); setDisplayAdditionalData(true); }}
        style={{marginLeft: 10, width: 150, display: 'inline-block', border: '1px solid silver', textAlign: 'center', cursor: 'pointer', borderTop: 'none', borderBottom: 'none', borderRadius: 4,}}
        > Load additional data
      </span>}

      { displayAdditionalData && <>
        <span style={{display: 'inline-block', width: 175, marginLeft: 10, borderRight: '1px solid silver'}}>
          <span style={{color: 'silver'}}>Data size: </span>
          <span> {dataSize} kb</span>
        </span>

        <span style={{display: 'inline-block', width: 270, marginLeft: 10}}>
          <span style={{color: 'silver'}}>Serialized data: </span>
          <textarea 
            style={{verticalAlign: 'bottom', color: 'orange', overflow: 'hidden', backgroundColor: '#242424', marginLeft: 20}}
          onChange={ ()=>{}} name="" id="" cols={10} rows={1} value={dataStringified} /> 
        </span>
      </>}
    </Container>
  )
}

export default Stats;

const container = {
  backgroundColor: '#242424',
  color: 'orange',
  paddingBottom: 20,
}