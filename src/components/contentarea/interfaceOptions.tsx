import React from 'react';
import TextAreas1 from './textAreas1';
import TextAreas2 from './textAreas2';
import TextAreas3 from './textAreas3';
import TextAreas4 from './textAreas4';
import TextAreas5 from './textAreas5';
import '../../CSS/textareas.scss';

interface Props {
  layout: number,
  activeNote: number,
  forceUpdate?: any;
  forceIt?: any,
  // forceUpdate?: any,
}

// export function InterfaceOptions({layout, activeNote}: Props){
export function InterfaceOptions(props: Props){
  const {activeNote, layout} = props;
  console.log( layout );

  return ( <span id="interfaceContainer">
    {layout === 1 && <TextAreas1 forceUpdate={props.forceIt} activeNote={activeNote} /> }
    {layout === 2 && <TextAreas2 forceUpdate={props.forceIt} activeNote={activeNote} /> }
    {layout === 3 && <TextAreas3 activeNote={activeNote} /> }
    {layout === 4 && <TextAreas4 activeNote={activeNote} /> }
    {layout === 5 && <TextAreas5 activeNote={activeNote} /> }
  </span>);

}
 
export default InterfaceOptions;