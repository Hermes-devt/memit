import React, {} from 'react';
// import {Container} from 'react-bootstrap';
// import TagInput from './tagInput';
import TextAreas from './textAreas1';
import TextAreas2 from './textAreas2';
import TextAreas3 from './textAreas3';
import TextAreas4 from './textAreas4';


interface Props {
  layout: number,
  activeNote: number,
}

export function ContentArea(props:Props){
  return (
    <div>
        {props.layout === 1 && <TextAreas data={{ activeNote: props.activeNote}}/> }
        {props.layout === 2 && <TextAreas2 data={{ activeNote: props.activeNote }}/> }
        {props.layout === 3 && <TextAreas3 data={{ activeNote: props.activeNote}}/> }
        {props.layout === 4 && <TextAreas4 data={{ activeNote: props.activeNote }}/> }
    </div>
  );

}
 
export default ContentArea;