import React, { useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Footer from './components/footer/footer';
import Navbar from './components/navbar/';
import InterfaceOptions from './components/contentarea/interfaceOptions';
import {init} from './js/init';
import {useState} from 'react';
// import {UserData} from './interfaces';
import VerticalBar from './components/contentarea/verticalBar';
import Util from './js/util';

import {useDispatch} from 'react-redux';
import storage from './store/data/action'

import SettingsBar from './components/settingsBar';
import TagInput from './components/contentarea/tagInput';
import Schedule from './components/schedule';
import Search from './components/contentarea/search';
import Stats from './components/stats';
import LaterLearnings from './components/laterLearnings';
import InsertLaterLearnings from './components/insertLaterLearnings';
// import {save} from './js/storageHandling';
import HorizontalDailyCards from './components/horizontalDailyCards';
import {UserData} from './types';


export function App(){
  const [data, setData] = useState<any>(null);
  const [layout, setLayout] = useState<number>(1);
  const [displayVerticalBar, setDisplayVerticalBar] = useState<boolean>(true);
  const [activeNote, setActiveNote] = useState<number>(0);
  const [forceUpdate, setForceUpdate] = useState<number>(1);
  const [displayWindow, setDisplayWindow] = useState<number>(1)
  const dispatch = useDispatch();

  useEffect( ()=>{
    let data: UserData  = init();
    dispatch( storage.setData(data) );

    let active: number = Util.lastElement(data.list);
    setData(data);
    setActiveNote( active );
    // save(data);
  },[]); //eslint-disable-line

  const onSettingsBarClick = (nr: number): void => setLayout( nr );
  const onMenuClick = ()=> setDisplayVerticalBar( (displayVerticalBar=> !displayVerticalBar));
  const setContentOnFullWidth = (): string=>{ return displayVerticalBar ? 'm-0 p-0 col-sm-10 no-gutters' : 'm-0 p-0 col-sm-12 no-gutters'; }
  const displayContentAreas = ():any=>{ return (displayWindow === 1 ? {display: 'block'} : {display: 'none'}) }

  return(
    <div className="m-0 p-0" style={{display: 'block', width: '120vw'}}>
      {data && <Navbar />}
      <SettingsBar 
        onClick={ onSettingsBarClick } 
        menuClick={ onMenuClick } 
        displayVerticalBar={ displayVerticalBar }
        windowDisplay={ displayWindow }
        onDisplayWindow={ (window:number)=> { setDisplayWindow(window)}}
      />


      {data && displayWindow === 2 && <Schedule /> }
      {data && displayWindow === 3 && <Search /> }
      {data && displayWindow === 4 && <LaterLearnings /> }

      <div style={ displayContentAreas() }>
        { !displayVerticalBar && data && <>

          <HorizontalDailyCards 
            onClick={(note:number)=> { setActiveNote(note) }} 
            activeNote={activeNote}
          />

          <InsertLaterLearnings 
            data={data} 
            setData={ (nData)=>{ 
              dispatch( storage.setData(nData) ); 
              let active: number = Util.lastElement(data.list);
              setActiveNote( active );
              setForceUpdate( forceUpdate => forceUpdate + 1);
          }} />

        </>}

        <Row className='m-0 p-0 no-gutters'>
          { displayVerticalBar && <Col className='m-0 p-0 col-sm-2 overflow-auto'>
              {data && 
                <VerticalBar 
                onClick={(note:number)=> { setActiveNote(note) }} 
                activeNote={ activeNote } /> 
            } </Col> } 

          <Col className={ setContentOnFullWidth()}>
            {data && <TagInput  activeNote={ activeNote }/> }
            {data && forceUpdate && <InterfaceOptions layout={layout} activeNote={activeNote}/> }
          </Col>
        </Row>
      </div>

      <Footer /> 
      {data && <Stats />}
    </div>
  )
}

 
export default App;
