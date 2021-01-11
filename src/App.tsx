import React, { useEffect} from 'react';
import {Container} from 'react-bootstrap';
import Footer from './components/footer/footer';
import Topbar from './components/navbar/topbar';
import {init} from './js/init';
import {useState} from 'react';
import {save} from './js/storageHandling';
import MainInterface from './components/mainInterface';
import Note from './components/note';
import {useDispatch} from 'react-redux';
import storage from './store/data/action'
import SettingsBar from './components/settingsBar';
import Schedule from './components/schedule';
import Search from './components/contentarea/search';
import Stats from './components/stats';
import LaterLearnings from './components/laterLearnings';
import DailySummary from './components/dailyNotes';
import { Switch, Route, useHistory, useLocation, withRouter} from "react-router-dom";
import CardMenu from './components/cardMenu';
import './CSS/app.scss'
import { iUserClass } from './templatesTypes';




export function App(){
  const history = useHistory();
  let location = useLocation();

  const [data, setData] = useState<any>(undefined);
  const [layout, setLayout] = useState<number>(1);
  const [displayVerticalBar, setDisplayVerticalBar] = useState<boolean>(true);
  const [activeNote, setActiveNote] = useState<number>(0);
  const [forceUpdate, setForceUpdate] = useState<number>(1);
  const mobile= false;

  const dispatch = useDispatch();


  useEffect( ()=>{
    let data: iUserClass = init();
    dispatch( storage.setData(data) );
    setData( data );
    let indexPos = data.get.list().length-1;
    setActiveNote( indexPos );

    if( window.innerWidth < 620 ){
      setLayout( 0 );
    }
  },[]); //eslint-disable-line


  const onSettingsBarClick = (nr: number): void =>{
    setLayout( nr );
    data.set.layout( nr );
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

  return(
    <Container fluid className="m-0 p-0 overflow-hidden" id="body">
        {data && <Topbar data={data} />}
        <SettingsBar 
          onClick={ onSettingsBarClick } 
          menuClick={ onMenuClick } 
          displayVerticalBar={ displayVerticalBar }
        />

      <Switch>
        <Route exact path="/search"> {data && <Search /> } </Route>
        <Route exact path="/schedule"> {data && <Schedule />} </Route>
        <Route exact path="/note"> {data && <Note />} </Route>
        <Route exact path="/LaterLearnings"> {data && <LaterLearnings />} </Route>
        <Route exact path='/dailynotes'> {data && <DailySummary /> } </Route>
        <Route path='/'>

          <CardMenu 
            displayVerticalBar={displayVerticalBar}
            activeNote={activeNote}
            data={data}
            mobile={mobile}
            setActiveNote={ setActiveNote}
          />

          {data && <span style={{position: 'relative'}}>
            <MainInterface 
              activeNote={activeNote}
              forceUpdate={forceUpdate}
              mobile={mobile}
              layout={layout}
              setActiveNote={ setActiveNote}
            />
          </span>}

        </Route>
      </Switch>
      <Footer />
      {data && <Stats data={data} />} 
    </Container>
  )
}

 
export default withRouter(App);
