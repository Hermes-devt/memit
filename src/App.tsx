import React, { useEffect} from 'react';
import {Container} from 'react-bootstrap';
import Footer from './components/footer/footer';
import Topbar from './components/navbar/topbar';
import InterfaceOptions from './components/contentarea/interfaceOptions';
import {init} from './js/init';
import {useState} from 'react';
import VerticalBar from './components/contentarea/verticalBar';
import Util from './js/util';
import {save} from './js/storageHandling';

import Note from './components/staging';
import {useDispatch} from 'react-redux';
import storage from './store/data/action'

import SettingsBar from './components/settingsBar';
import TagInput from './components/contentarea/tagInput';
import Schedule from './components/schedule';
import Search from './components/contentarea/search';
import Stats from './components/stats';
import LaterLearnings from './components/laterLearnings';
import HorizontalDailyCards from './components/horizontalDailyCards';
import DailySummary from './components/dailyNotes';
import { Switch, Route, useHistory, useLocation, withRouter} from "react-router-dom";
import {iUserData} from './templatesTypes';
import './CSS/app.scss'


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
    let data: iUserData  = init();
    dispatch( storage.setData(data) );

    let active: number = Util.lastElement(data.list);
    setData(data);
    setActiveNote( active );
    save(data);

    if( data.settings ){
      setLayout( data.settings.cardLayout);
    }

    if( window.innerWidth < 900 ) {
      setLayout(3);
      setMobile(true);
      setDisplayVerticalBar(false);
    }else{
      // setDisplayVerticalBar(true);
    }

  },[]); //eslint-disable-line


  const onSettingsBarClick = (nr: number): void =>{
    setLayout( nr );
    data.settings.cardLayout = nr;
    dispatch( storage.setData(data) );
    save(data);
  }
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
      <div className="backgroundImage"> 
      <div className="backgroundImageCover" />
        {data && <Topbar />}
        <SettingsBar 
          onClick={ onSettingsBarClick } 
          menuClick={ onMenuClick } 
          displayVerticalBar={ displayVerticalBar }
          windowDisplay={ displayWindow }
          onDisplayWindow={ (window:number)=> { setDisplayWindow(window)}}
        />
      </div>

      <Switch>
        <Route exact path="/search"> {data && <Search /> } </Route>
        <Route exact path="/schedule"> {data && <Schedule />} </Route>
        <Route exact path="/note"> {data && <Note />} </Route>
        <Route exact path="/LaterLearnings"> {data && <LaterLearnings />} </Route>
        <Route exact path='/dailynotes'> {data && <DailySummary data={data} /> } </Route>
        <Route path='/'>

          {data && <span style={{position: 'relative'}}>
            <span style={hideVerticalBar()} >
              <VerticalBar onClick={(note:number)=> { setActiveNote(note) }} menuClick={ onMenuClick } activeNote={ activeNote } />
            </span> 

            {!displayVerticalBar && <HorizontalDailyCards onClick={(note:number)=> { setActiveNote(note) }} activeNote={activeNote} mobile={mobile} />}

            {/* when the window shrinks and the verticalMenu is not displaying without this it doesnt show up */}
            {displayVerticalBar && <span className="horizontalDailyCardHidder">
              <HorizontalDailyCards onClick={(note:number)=> { setActiveNote(note) }} activeNote={activeNote} mobile={mobile} />
            </span>}

            {data && <>
              <TagInput forceUpdate={forceUpdate } activeNote={ activeNote } mobile={mobile} />
              <InterfaceOptions forceUpdate={forceUpdate} forceIt={ ()=>{
                setForceUpdate( forceUpdate=> forceUpdate+1); }}
                layout={layout} activeNote={activeNote}/>
            </>}

            {/* {data && <TagInput forceUpdate={forceUpdate } activeNote={ activeNote } mobile={mobile} /> }
            {data && <InterfaceOptions forceUpdate={forceUpdate} forceIt={ ()=>{
              setForceUpdate( forceUpdate=> forceUpdate+1);
            }}
              layout={layout} activeNote={activeNote}/> } */}
          </span>}

        </Route>
      </Switch>

      {/* <div className="backgroundImage"><Footer /></div> */}
      <Footer />
      {data && <Stats />} 
    </Container>
  )
}

 
export default withRouter(App);
