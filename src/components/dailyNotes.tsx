import React, {useState, useEffect, createRef, useRef } from 'react';
// import clearAwayCommands from '../js/textManipulation/execute/clearAwayCommands';
import {useDispatch, useSelector} from 'react-redux';
import {iUserClass} from '../templatesTypes';
import {save} from '../js/storageHandling';
import storage, {} from '../store/data/action'
import '../CSS/dailyNotes.scss';

const gMobileLimit = 700;


export const DailySummary = (props: any)=>{
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

  const Data: any = useSelector<any>( (state: {data: iUserClass})=> state.data);

  const [mobileScreen, setMobileScreen] = useState<boolean>(window.innerWidth < gMobileLimit ? true:false)
  const dispatch = useDispatch();


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
      let setHeight: string = height > height2 ? height: height2;
      setHeight = Number(setHeight) + 30 + 'px';

      splitContainer.current[0].current.style.height = setHeight;
    }
    
    if( newlyDataSplitRef.current[1].current  !== null ){
      let height:string = oldDataSplitRef.current[0].current.scrollHeight;
      let height2:string = oldDataSplitRef.current[1].current.scrollHeight;
      let setHeight: string = height > height2 ? height: height2;
      setHeight = Number(setHeight) + 30 + 'px';

      splitContainer.current[1].current.style.height = setHeight;
    }
  }

  const setDataTabs = (nData:any)=>{

    if( mobileScreen ){
      setNewlyData( nData.dailyNotes.newData.trim() + '\n\n\n\n\n\n');
      setOldData( nData.dailyNotes.oldData.trim() + '\n\n\n\n\n\n');
      setTimeout( ()=>{ setHeight()}, 20);
    }

    if( !mobileScreen ){
      // Split oldInformation into two columns
      let countNewLines:number = (nData.dailyNotes.oldData.match(/\n/g) || []).length;


      if( countNewLines < 50){
        setOldDataSplit([ nData.dailyNotes.oldData, '']);
      }else{
        let split = (nData.dailyNotes.oldData.split('\n') || [nData.dailyNotes.oldData]);
        let oldInformationSplit1 = (split.slice(0, Math.floor( countNewLines / 2) || [])).join('\n') || '';
        let oldInformationSplit2 = (split.slice(Math.floor( countNewLines / 2) || [])).join('\n') || '';
        setOldDataSplit( [oldInformationSplit1.trim() + '\n\n\n\n\n\n', oldInformationSplit2.trim() + '\n\n\n\n\n\n'] );

      }


      let countNewLines2 = (nData.dailyNotes.newData.match(/\n/g) || []).length;
      if( countNewLines2 < 50 ){
        setNewlyDataSplit([nData.dailyNotes.newData, ""]);
      }else{
        let split2 = (nData.dailyNotes.newData.split('\n') || [nData.dailyNotes.newData]);
        let newInformationSplit1: string = (split2.slice(0, Math.floor( countNewLines2 / 2) || [])).join('\n') || '';
        let newInformationSplit2: string = (split2.slice(Math.floor( countNewLines2 / 2) || [])).join('\n') || '';
        setNewlyDataSplit( [(newInformationSplit1.trim() + '\n\n\n\n\n\n') , newInformationSplit2.trim() + '\n\n\n\n\n\n' ]);
      }

      setTimeout( ()=>{ setSplitWindowsHeight()}, 20);
    }


  }

  useEffect( ()=>{
    if( !Data ){ return; }
    setDataTabs(Data.data)
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
              Data.data.dailyNotes.newData = str;
              dispatch( storage.setData(Data) );
              save( Data );
            }}
            placeholder="Empty"
          />

          <textarea
            value={newlyDataSplit[1]}
            style={{display: 'inline-block', width: '49%', height: '100%'}}
            ref={newlyDataSplitRef.current[1]}
            onChange={ (evt)=>{
              let nNewlyDataSplit = [...newlyDataSplit];
              nNewlyDataSplit[1] = evt.currentTarget.value;
              setNewlyDataSplit( nNewlyDataSplit );

              // // Save it to local storage
              let str = nNewlyDataSplit[0].trim() + '\n' + nNewlyDataSplit[1].trim() + '\n';
              Data.data.dailyNotes.newData = str;
              dispatch( storage.setData(Data));
              save( Data );
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

              Data.data.dailyNotes.oldData = str;
              dispatch( storage.setData(Data));
              save( Data );
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
              Data.data.dailyNotes.oldData = str;
              dispatch( storage.setData(Data));
              save( Data );
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
              let newData = evt.currentTarget.value;
              setNewlyData( newData );

              Data.data.dailyNotes.newData = newData;
              dispatch( storage.setData(Data) );
              save( Data );
            }}
            placeholder="Empty"
          />

          <textarea
            value={oldData}
            style={{display: 'block', width: '100%', height: '100%'}}
            ref={oldDataRef.current}
            onChange={ (evt)=>{
              let newOldData = evt.currentTarget.value;
              setOldData( newOldData );

              Data.data.dailyNotes.oldData = newOldData;
              dispatch( storage.setData(Data) );
              save( Data );
            }}
            placeholder="Empty"
          />
  </div>);




}

export default DailySummary;