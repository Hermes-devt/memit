import React, {useState} from 'react';
import TagInput from './contentarea/tagInput';
import InterfaceDesktop from './contentarea/interfaceDesktop';
import InterfaceMobile from './contentarea/interfaceMobile';
import CardCommands from './cardCommands';

interface Props{
  activeNote: number;
  forceUpdate: any;
  mobile: boolean;
  layout: number;
  setActiveNote(note:number): void;
}

export const MainInterface = (props: Props)=>{
  const [forceUpdate, setForceUpdate] = useState<number>(1);

  return(
    <div>
      <TagInput 
        forceUpdate={props.forceUpdate } 
        activeNote={ props.activeNote } 
      />


      {(props.layout !== 0) && 
      <span>
        <InterfaceDesktop 
          forceUpdate={ ()=> setForceUpdate( forceUpdate=> forceUpdate+1)}
          layout={props.layout} activeNote={props.activeNote}/>

      <CardCommands 
        activeNote={props.activeNote}
        setActiveNote={ props.setActiveNote }
      />
      </span>}

      {(props.layout === 0) && <InterfaceMobile 
        // forceUpdate={ ()=> setForceUpdate( forceUpdate=> forceUpdate+1)}
        layout={props.layout} activeNote={props.activeNote} /> }

    </div>
  )
}

export default MainInterface;