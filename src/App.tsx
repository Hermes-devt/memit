import React, { useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Footer from './components/footer/footer';
import Navbar from './components/navbar/';
import InterfaceOptions from './components/contentarea/interfaceOptions';
import {init} from './js/init';
import {useState} from 'react';
import {UserData} from './interfaces';
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


export function App(){
  const [data, setData]: [UserData | null, any] = useState(null);
  const [layout, setLayout] = useState<number>(2);
  const [displayVerticalBar, setDisplayVerticalBar] = useState<boolean>(true);
  const [activeNote, setActiveNote] = useState<number>(0);
  // const [showSchedule, setShowSchedule] = useState<boolean>(false);

  const [displayWindow, setDisplayWindow] = useState<number>(1)
  // const Data = useSelector((state:any)=> state.data);
  const dispatch = useDispatch();

  useEffect( ()=>{
    let data = init();
    dispatch( storage.setData(data) );

    let active: number = Util.lastElement(data.list);
    setData(data);
    setActiveNote( active );
  },[]); //eslint-disable-line
  
  const onSettingsBarClick = (nr: number): void => setLayout( nr );
  const onMenuClick = ()=> setDisplayVerticalBar( (displayVerticalBar=> !displayVerticalBar));


  const setContentOnFullWidth = (): string=>{ return displayVerticalBar ? 'm-0 p-0 col-sm-10' : 'm-0 p-0 col-sm-12'; }
  const displayContentAreas = ():any=>{ return (displayWindow === 1 ? {display: 'block'} : {display: 'none'}) }

  return(
    <Container fluid className='m-0 p-0'>
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
      {/* {data && displayWindow === 4 && <LaterLearnings /> } */}

      <div style={ displayContentAreas() }>

        <Row className='no-gutters m-0 p-0 position-relative'>
          { displayVerticalBar && <Col className='m-0 p-0 col-sm-2 overflow-auto'>
              {data && <VerticalBar onClick={(note:number)=> setActiveNote(note)} activeNote={ activeNote } /> }
          </Col> }
            
          <Col className={ setContentOnFullWidth()}>
            {data && <TagInput  activeNote={ activeNote }/> }
            {data && <InterfaceOptions layout={layout} activeNote={activeNote}/> }
          </Col>
        </Row>
      </div>

      <Footer /> 
      {data && <Stats />}
    </Container>
  )
}

 
export default App;
