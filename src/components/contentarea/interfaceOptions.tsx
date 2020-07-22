import React from 'react';
import TextAreas1 from './textAreas1';
import TextAreas2 from './textAreas2';
import TextAreas3 from './textAreas3';
import TextAreas4 from './textAreas4';


interface Props {
  layout: number,
  activeNote: number,
}

export function InterfaceOptions({layout, activeNote}: Props){
  return ( <span style={{fontSize: '0.8em', color: 'blue'}}>
    {layout === 1 && <TextAreas1 activeNote={activeNote} /> }
    {layout === 2 && <TextAreas2 activeNote={activeNote} /> }
    {layout === 3 && <TextAreas3 activeNote={activeNote} /> }
    {layout === 4 && <TextAreas4 activeNote={activeNote} /> }
  </span>);

}
 
export default InterfaceOptions;