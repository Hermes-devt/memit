
import React, { useState, useEffect, CSSProperties } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import { iUserClass, iList, tQuestionAnswerPair } from '../templatesTypes';
import storage from '../store/data/action'
import {save} from '../js/storageHandling';

import '../CSS/cardCommands.scss'
import { setDailyCards } from '../js/storageHandling';
import dateHandling, { getDaysAfter1970 } from '../js/dateHandling';

interface Props{
  activeNote: number;
  setActiveNote(note:number): void;
}

type stringNumber = string | number;

export const CardCommands = (props: Props)=>{
  const Data = useSelector((state: {data: iUserClass})=> state.data);
  const [displaySchedule, setDisplaySchedule] = useState<boolean>(false);
  const [pauseCard, setPauseCard] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect( ()=>{
    setDisplaySchedule( false );
    const active = Data.get.list()[props.activeNote]
    'cardSetting' in active && 'pause' in active.cardSetting ? setPauseCard( true) : setPauseCard(false);
  }, [props.activeNote])


  const deleteCard = ()=>{
    const deleteIt = (list: iList )=>{
      let confirm = window.confirm("Are you sure you want to delete this card?");
      if( !confirm ) 
        return;

      list.splice( props.activeNote, 1);
      props.setActiveNote( list.length-1 );
      setDailyCards(Data);
      dispatch(storage.setData( {...Data} ))
      save( Data );
    }

    let list: iList = Data.get.list();
    let createdToday:number = getDaysAfter1970()

    if( list[props.activeNote].created === createdToday ){
      let count = 0;
      // Make sure there are still one card created today
      for( let index=list.length-1; index>=0; index--){
        if( list[index].created !== createdToday )
          break;
        ++count;
      }

      if( count > 1)
        deleteIt(list);
      else{
        let confirm = window.confirm("Are you sure you want to delete this card?");
        if( !confirm ) 
          return;

        list[props.activeNote].tags = '';
        list[props.activeNote].userInput = '';
        list[props.activeNote].questionAnswerPair = [tQuestionAnswerPair()]
        delete list[props.activeNote].cardSetting
        setPauseCard(false);

        Data.set.list(list);
        dispatch(storage.setData( {...Data} ))
        props.setActiveNote(props.activeNote)
        save( Data );
      }

    }else{
      deleteIt(list);
    }
  }

  const pauseCurrentCard = ()=>{
    setPauseCard( (pauseCard:boolean)=> !pauseCard)
    let list = Data.get.list();
    if( !('cardSetting' in list[props.activeNote] )){
      list[props.activeNote].cardSetting = {pause: dateHandling.getDaysAfter1970() }
    }else{
      if( 'pause' in list[props.activeNote].cardSetting ){
        delete list[props.activeNote].cardSetting.pause;
      }
      else{
        list[props.activeNote].cardSetting = {...list[props.activeNote].cardSetting, ...{pause: dateHandling.getDaysAfter1970()} }
      }
    }
    Data.set.list(list);
    dispatch(storage.setData( {...Data} ))
    save( Data );
  }

  const pauseCardStyle = ()=>{
    return pauseCard ? {backgroundColor: 'red'} as CSSProperties : {} as CSSProperties;
  }

  return(
    <Container fluid id="cardCommands" className="m-0 p-0">
        <Row className="">
          <Col className="m-0 p-0 col-sm-12">

            <div style={{display: 'flex', justifyContent: 'center', borderTop: '1px solid silver'}}>
              <span title="Delete card" className="commandButton" onClick={ deleteCard }>X</span>
              
              <span className="commandButton" 
                style={ pauseCardStyle() } 
                onClick={ ()=>{
                  pauseCurrentCard();
                  // setPauseCard( (pauseCard:boolean)=> !pauseCard)
                }}
              >Pause</span>

              <span className="commandButton">Reset</span>

              <span className="commandButton" 
                onClick={ ()=> setDisplaySchedule( (displaySchedule:boolean)=> !displaySchedule )}
                >Custom repeats</span>
            </div>

            {displaySchedule && <div id="schedule">
              <span>Repeat days from now</span>
              <input placeholder={"1, 3, 5, 10"} />
              <span className="saveIt">Save</span>
            </div>}
          </Col>
        </Row>
    </Container>
  )
}

export default CardCommands;