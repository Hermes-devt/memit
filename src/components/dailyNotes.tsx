import React, {useState, useEffect, createRef, useRef } from 'react';
import clearAwayCommands from '../js/textManipulation/clearAwayCommands';
import {useDispatch, useSelector} from 'react-redux';
import {iUserData} from '../templatesTypes';

import {save} from '../js/storageHandling';
import storage, {} from '../store/data/action'

import '../CSS/dailyNotes.scss';

const gMobileLimit = 700;
export const DailySummary = (props:any)=>{
  // const [twoColumn, setTwoColumn] = useState<boolean>( window.innerWidth < gMobileLimit ? false : true );

  // New data struct
  const [newlyData, setNewlyData ] = useState<string>("");
  const newDataRef = useRef<any>(createRef());

  const [oldData, setOldData] = useState<string>("");
  const oldDataRef = useRef<any>(createRef());


  // Two columns with the data.
  const [newlyDataSplit, setNewlyDataSplit] = useState<string[]>(["", ""]);
  const newlyDataSplitRef = useRef<any>([createRef(), createRef()]);

  const [oldDataSplit, setOldDataSplit] = useState<string[]>(["", ""]);
  const oldDataSplitRef = useRef<any>([createRef(), createRef()]);

  const splitContainer = useRef<any>([createRef(), createRef()]);
  // end

  const Data: any = useSelector<any>( (state: {data: iUserData })=> state.data );
  const [data, setData] = useState<iUserData>( {...Data} );

  const [mobileScreen, setMobileScreen] = useState<boolean>(window.innerWidth < gMobileLimit ? true:false)
  const dispatch = useDispatch();

  const clearOutUserInput = (nData: iUserData): iUserData=>{
    for( let i=0, len= nData.list.length-1; i<len; i++){
      let item = nData.list[i];
      if( item.userInput === undefined || item.userInput === null ) continue;
      nData.list[i].userInput = "";
    }

    return nData;
  }

  
  const diff = (newInfo:string[], oldInfo: string): string[] =>{
    let strsplit = oldInfo.split('\n') || [];
    let newUniqueInformation = [];
    for( let j=0;j<newInfo.length; j++){
      let match = false;

      for( let i=0;i<strsplit.length;i++){
        if( newInfo[j] === strsplit[i]){ 
          match = true; 
          break; 
        }
      }
      if( !match ) newUniqueInformation.push( newInfo[j]);
    }
    return newUniqueInformation;
  }


  const fetchNewInformationFromInputFields = (): string[] =>{
    let arr: string[] = [];
    for( let i=0, len=props.data.list.length-1; i<len; i++){
      let item = props.data.list[i];
      if( item.userInput === undefined || item.userInput === null ) continue;
      let text:string = '';
      let itemText: string = clearAwayCommands( item.userInput )
      text += itemText.trim();
      arr.push( text );
    }
    return arr;
  }

  const getUniqueLinesAndDeleteThose = (userInputs: string[], nData: iUserData)=>{
    let dailyNote = nData.dailyNotes.newData;
    let  dailNoteArr: string[] = dailyNote.split('\n') || [];

    let lines = (userInputs.join('\n') || "").split('\n');
    let diffLines = diff(lines, nData.dailyNotes.oldData );
    lines = [...dailNoteArr, ...diffLines];
    return lines;
  }

  const removeExceseNewLines = (lines: string[]): string[]=>{
    let newlinesAfterEachOther = 0;
    for( let i=lines.length-1; i>=0;i--){
      if( lines[i] === ''){
        if( newlinesAfterEachOther > 2){
          lines.splice(i, 1);
          continue;
        }
        ++newlinesAfterEachOther
      }else{
        newlinesAfterEachOther = 0;
      }
    }
    return lines;
  }


  const setHeight = (): void=>{

    if( oldDataRef.current.current !== null ){
      let height: string = oldDataRef.current.current.scrollHeight;
      let setHeight = Number(height) + 30 + 'px';
      oldDataRef.current.current.style.height = setHeight;
    }

    if( newDataRef.current.current !== null ){
      let height: string = newDataRef.current.current.scrollHeight;
      let setHeight = Number(height) + 30 + 'px';
      newDataRef.current.current.style.height = setHeight;
    }
  }

  const setSplitWindowsHeight = (): void=>{

    if( newlyDataSplitRef.current[0].current  !== null ){
      let height:string = newlyDataSplitRef.current[0].current.scrollHeight;
      let height2:string = newlyDataSplitRef.current[1].current.scrollHeight;
      let setHeight = height > height2 ? height: height2;
      setHeight = Number(setHeight) + 30 + 'px';

      splitContainer.current[0].current.style.height = setHeight;
    }
    
    if( newlyDataSplitRef.current[1].current  !== null ){
      let height:string = oldDataSplitRef.current[0].current.scrollHeight;
      let height2:string = oldDataSplitRef.current[1].current.scrollHeight;
      let setHeight = height > height2 ? height: height2;
      setHeight = Number(setHeight) + 30 + 'px';

      splitContainer.current[1].current.style.height = setHeight;
    }
  }

  // const resizeListener = ()=> { }

  const setDataTabs = (nData:any)=>{
    if( mobileScreen ){
      setNewlyData( nData.dailyNotes.newData.trim() + '\n\n\n\n\n\n');
      setOldData( nData.dailyNotes.oldData.trim() + '\n\n\n\n\n\n');
      setTimeout( ()=>{ setHeight()}, 20);
    }

    if( !mobileScreen ){
      // Split oldInformation into two columns
      let countNewLines = (nData.dailyNotes.oldData.match(/\n/g) || []).length;
      let split = (nData.dailyNotes.oldData.split('\n') || [nData.dailyNotes.oldData]);
      let oldInformationSplit1 = (split.slice(0, Math.floor( countNewLines / 2) || [])).join('\n') || '';
      let oldInformationSplit2 = (split.slice(Math.floor( countNewLines / 2) || [])).join('\n') || '';
      setOldDataSplit( [oldInformationSplit1.trim() + '\n\n\n\n\n\n', oldInformationSplit2.trim() + '\n\n\n\n\n\n'] );

      let countNewLines2 = (nData.dailyNotes.newData.match(/\n/g) || []).length;

      let split2 = (nData.dailyNotes.newData.split('\n') || [nData.dailyNotes.newData]);
      let newInformationSplit1: string = (split2.slice(0, Math.floor( countNewLines2 / 2) || [])).join('\n') || '';
      let newInformationSplit2: string = (split2.slice(Math.floor( countNewLines2 / 2) || [])).join('\n') || '';
      setNewlyDataSplit( [(newInformationSplit1.trim() + '\n\n\n\n\n\n') , newInformationSplit2.trim() + '\n\n\n\n\n\n' ]);

      setTimeout( ()=>{ setSplitWindowsHeight()}, 20);
    }


  }

  useEffect( ()=>{
    if( !Data ){ return; }
    let nData = {...Data}

    // Get new unique data from the userInputs and set it into the newData. 
    let cardUserInputs = fetchNewInformationFromInputFields();
    let dailyInformation = getUniqueLinesAndDeleteThose(cardUserInputs, nData);
    let docRows = removeExceseNewLines( dailyInformation );
    nData.dailyNotes.newData = docRows.join('\n');
    clearOutUserInput( nData );

    setDataTabs(nData)
    dispatch( storage.setData(nData) );
    save( nData );
    setData( nData );
    // window.addEventListener('resize', resizeListener)
  },[]) //eslint-disable-line


  if( !mobileScreen ) return (<div id="dailyNotesComponent">
      {/*  newlyDataSplit  */}
      <div ref={splitContainer.current[0]} >
        <textarea
            value={newlyDataSplit[0]}
            style={{display: 'inline-block', width: '49%', height: '100%'}}
            ref={newlyDataSplitRef.current[0]}
            onChange={ (evt)=>{
              let nNewlyDataSplit = [...newlyDataSplit];
              nNewlyDataSplit[0] = evt.currentTarget.value;
              setNewlyDataSplit( nNewlyDataSplit );


              let str = nNewlyDataSplit[0].trim() + '\n' + nNewlyDataSplit[1].trim() + '\n';
              data.dailyNotes.newData = str;
              dispatch( storage.setData(data) );
              save( data );
            }}
            placeholder="Empty"
          />

          <textarea
            // value={oldData}
            value={newlyDataSplit[1]}
            style={{display: 'inline-block', width: '49%', height: '100%'}}
            ref={newlyDataSplitRef.current[1]}
            // ref={oldDataRef.current}
            onChange={ (evt)=>{
              let nNewlyDataSplit = [...newlyDataSplit];
              nNewlyDataSplit[1] = evt.currentTarget.value;
              setNewlyDataSplit( nNewlyDataSplit );

              // Save it to local storage
              let str = nNewlyDataSplit[0].trim() + '\n' + nNewlyDataSplit[1].trim() + '\n';
              data.dailyNotes.newData = str;
              dispatch( storage.setData(data) );
              save( data );
            }}
            placeholder="Empty"
          />
      </div>


      {/*  oldDataSplit */}
      <div ref={splitContainer.current[1]}>
        <textarea
            value={oldDataSplit[0]}
            style={{display: 'inline-block', width: '49%', height: '100%'}}
            ref={oldDataSplitRef.current[0]}
            onChange={ (evt)=>{
              let nOldDataSplit = [...oldDataSplit];
              nOldDataSplit[0] = evt.currentTarget.value;
              setOldDataSplit( nOldDataSplit );

              let str = nOldDataSplit[0].trim() + '\n' + nOldDataSplit[1].trim() + '\n';

              data.dailyNotes.oldData = str;
              dispatch( storage.setData(data) );
              save( data );
            }}
            placeholder="Empty"
          />

          <textarea
            value={oldDataSplit[1]}
            style={{display: 'inline-block', width: '49%', height: '100%'}}
            ref={oldDataSplitRef.current[1]}
            onChange={ (evt)=>{
              let nOldDataSplit = [...oldDataSplit];
              nOldDataSplit[1] = evt.currentTarget.value;
              setOldDataSplit( nOldDataSplit );

              let str = nOldDataSplit[0].trim() + '\n' + nOldDataSplit[1].trim() + '\n';
              data.dailyNotes.oldData = str;
              dispatch( storage.setData(data) );
              save( data );
            }}
            placeholder="Empty"
          />
      </div>
  </div>)

  else return (<div id="dailyNotesComponent" style={{position: 'relative'}}>
          <textarea
            value={newlyData}
            style={{display: 'block', width: '100%', height: '100%'}}
            ref={newDataRef.current}
            onChange={ (evt)=>{
              let newData = newlyData;
              newData = evt.currentTarget.value;
              setNewlyData( newData );

              data.dailyNotes.newData = newData;
              dispatch( storage.setData(data) );
              save( data );
            }}
            placeholder="Empty"
          />

          <textarea
            value={oldData}
            style={{display: 'block', width: '100%', height: '100%'}}
            ref={oldDataRef.current}
            onChange={ (evt)=>{
              let newOldData = oldData; 
              newOldData = evt.currentTarget.value;
              setOldData( newOldData );

              data.dailyNotes.oldData = newOldData;
              dispatch( storage.setData(data) );
              save( data );
            }}
            placeholder="Empty"
          />
        {/* <div style={{ height: '200px', width: '300px', backgroundColor: 'blue', position: 'fixed', left: 0, bottom: 10, resize: 'both'}}>
          <textarea style={{position: 'fixed', width: '0px', height: '10px', left: -2, backgroundColor: 'black', resize: 'both', top:'60%', overflowY: 'auto', overflowX: 'auto', padding: 5}} />
        </div> */}
  </div>);




}

export default DailySummary;