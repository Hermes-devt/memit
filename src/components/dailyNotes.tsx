import React, {useState, useEffect} from 'react';
import clearAwayCommands from '../js/textManipulation/clearAwayCommands';
import {useDispatch, useSelector} from 'react-redux';
import {UserData} from '../types';
import '../CSS/dailyNotes.scss';

export const DailySummary = (props:any)=>{
  const [textArr, setTextArr] = useState<string[]>([]);
  // const [data, setData] = useSelector<any>( state=> state.data);
  const Data: any = useSelector<any>( (state: {data: UserData })=> state.data );
  const dispatch = useDispatch();

  // const questionTextAreas = useRef<any>(data.list.map(() => createRef()));

  useEffect( ()=>{
    // console.log( 'd', Data);

    let arr: string[] = [];
    for( let i=0, len=props.data.list.length -1; i<len; i++){
      let item = props.data.list[i];
      let text:string = '';

      if( item.userInput === undefined || item.userInput === null ) continue;

      let itemText: string = clearAwayCommands( item.userInput )
      text += itemText.trim();
      arr.push( text );
    }

    console.log('here');
    let twoSplitTextArea: string[] = ['', ''];
    let half: number = ( Math.floor( (Number(arr.length) / 2)));
    for( let i=0; i< arr.length; i++){
      if( i <= half) twoSplitTextArea[0] += arr[i];
      else           twoSplitTextArea[1] += arr[i];
    }
    setTextArr( twoSplitTextArea );
  },[]) //eslint-disable-line



  return(
    // <div style={{padding: 20}}>
    <div id="dailyNotesComponent">
      {textArr.map( (text:string, index:number)=>
        <textarea
          key={index}
          // style={textStyling}
          value={text}
          placeholder="Empty"
          onChange={ (evt)=>{
            textArr[index] = evt.currentTarget.value;
            let arr = [...textArr];
            arr[index] = evt.currentTarget.value;
            setTextArr( arr );
          }}
        / >
      )}
    </div>)
}

export default DailySummary;