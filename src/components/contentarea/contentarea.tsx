import React, { Component, useEffect, useState, CSSProperties} from 'react';
import VerticalBar from './verticalBar1';
import Util from '../../js/util';
import {save} from '../../js/storageHandling';
import {Container, Col, Row} from 'react-bootstrap';
import {UserData, Day} from '../../interfaces';
import TextAreas from './textAreas';
import TagInput from './tagInput';



export function ContentArea(props:any){
  const [data, setData] = useState<any>(null);
  const [dailyNotes, setDailyNotes] = useState<any>([]);
  const [verticalBarExtended, setVerticalBarExtended] = useState<string>('<');

  const [activeNote,setActiveNote] = useState<number>(0);

  useEffect( ()=>{
    let _data:UserData = props.data;
    let active: number = Util.lastElement(_data.list);
    setData(_data);
    setActiveNote( active );
  },[])// eslint-disable-line

  return (
    <Container fluid className="">
        <Row className="no-gutter">

          <div className="vh-100 overflow-auto" 
            style={{ width: verticalBarExtended === '<' ? '15%' : '3%'} as CSSProperties}>
            {data && 
            <VerticalBar 
              onClick={(note:number)=> setActiveNote(note)} 
              activeNote={ activeNote }
              />
            }

          </div>

          <TextAreas 
            onExtendVerticalbar={(char:string)=>{ 
              setVerticalBarExtended(char);
            }}
            data={{
              activeNote: activeNote,
              navbarExtended: verticalBarExtended
            }}/>
        </Row>
        <TagInput  activeNote={ activeNote }/>
    </Container>
  );

}
 
export default ContentArea;