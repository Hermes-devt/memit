import React, { useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Footer from './components/footer/footer';
import Navbar from './components/navbar/navbar';
import InterfaceOptions from './components/contentarea/interfaceOptions';
import {init} from './js/init';
import {useState} from 'react';
import VerticalBar from './components/contentarea/verticalBar';
import Util from './js/util';
import {save} from './js/storageHandling';

import {useDispatch} from 'react-redux';
import storage from './store/data/action'
//    dispatch( storage.setData(data) );

import SettingsBar from './components/settingsBar';
import TagInput from './components/contentarea/tagInput';
import Schedule from './components/schedule';
import Search from './components/contentarea/search';
import Stats from './components/stats';
import LaterLearnings from './components/laterLearnings';
// import InsertLaterLearnings from './components/insertLaterLearnings';
import HorizontalDailyCards from './components/horizontalDailyCards';

// import TextMani from './components/textMani';

import {UserData} from './types';
import DailySummary from './components/dailyNotes';


import { Switch, Route, useHistory, useLocation, withRouter} from "react-router-dom";


export function App(){
  const history = useHistory();
  let location = useLocation();

  const [data, setData] = useState<any>(null);
  const [layout, setLayout] = useState<number>(1);
  const [displayVerticalBar, setDisplayVerticalBar] = useState<boolean>(true);
  const [activeNote, setActiveNote] = useState<number>(0);
  const [forceUpdate, setForceUpdate] = useState<number>(1);
  const [displayWindow, setDisplayWindow] = useState<number>(1);
  const [mobile, setMobile] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect( ()=>{
    let data: UserData  = init();
    dispatch( storage.setData(data) );

    let active: number = Util.lastElement(data.list);
    setData(data);
    setActiveNote( active );
    // save(data);
    if( window.innerWidth < 900 ) {
      setLayout(3);
      setMobile(true);
      setDisplayVerticalBar(false);
    }else{
      // setDisplayVerticalBar(true);
    }
  },[]); //eslint-disable-line

  // useEffect( ()=>{
  //   console.log('herer', );
  // }, [data.list[active].userInput])

  const onSettingsBarClick = (nr: number): void => setLayout( nr );
  const onMenuClick = ()=> { 
    if( mobile){
      if( location.pathname === '/') setDisplayVerticalBar( displayVerticalBar=> !displayVerticalBar); 
      else                           history.push('/');
    }else{
      setDisplayVerticalBar( displayVerticalBar=> !displayVerticalBar); 
    }
  }

  const hideVerticalBar = (): object => displayVerticalBar ? {display: 'block'} : {display: 'none'};

  return(
    <Container fluid className="m-0 p-0 overflow-hidden" >
      {data && <Navbar />}
      <SettingsBar 
        onClick={ onSettingsBarClick } 
        menuClick={ onMenuClick } 
        displayVerticalBar={ displayVerticalBar }
        windowDisplay={ displayWindow }
        onDisplayWindow={ (window:number)=> { setDisplayWindow(window)}}
      />

      <Switch>
        <Route exact path="/search"> {data && <Search /> } </Route>
        <Route exact path="/schedule"> {data && <Schedule />} </Route>
        <Route exact path="/LaterLearnings"> {data && <LaterLearnings />} </Route>
        <Route exact path='/dailynotes'> {data && <DailySummary data={data} /> } </Route>
        <Route path='/'>

          {data && <span style={{position: 'relative'}}>
            <span style={hideVerticalBar()} >
              <div className='gBlackCoverAbsolute gMobileMin' onClick={ ()=> setDisplayVerticalBar(false)} />
              <VerticalBar onClick={(note:number)=> { setActiveNote(note) }} menuClick={ onMenuClick } activeNote={ activeNote } />
            </span> 

            {/* <InsertLaterLearnings data={data} setData={ (nData)=>{ dispatch( storage.setData(nData) ); let active: number = Util.lastElement(data.list); setActiveNote( active ); setForceUpdate( forceUpdate => forceUpdate + 1); }} />  */}
            {!displayVerticalBar && <HorizontalDailyCards onClick={(note:number)=> { setActiveNote(note) }} activeNote={activeNote} mobile={mobile} />}
            {/* <HorizontalDailyCards onClick={(note:number)=> { setActiveNote(note) }} activeNote={activeNote} mobile={mobile} /> */}
          <span>
            {data && <TagInput forceUpdate={forceUpdate } activeNote={ activeNote } mobile={mobile} /> }
            {/* {forceUpdate && data && <InterfaceOptions layout={layout} activeNote={activeNote}/> } */}
            {/* {forceUpdate && data && <InterfaceOptions forceUpdate={forceUpdate} layout={layout} activeNote={activeNote}/> } */}
            {data && <InterfaceOptions forceUpdate={forceUpdate} forceIt={ ()=>{
              setForceUpdate( forceUpdate=> forceUpdate+1);
            }}
              layout={layout} activeNote={activeNote}/> }
          </span>
            
          </span>}
        </Route>
      </Switch>

      <Footer> {data && <Stats />} </Footer>
    </Container>
  )
}

 
export default withRouter(App);
