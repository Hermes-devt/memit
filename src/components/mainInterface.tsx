import React, {useState, useEffect} from 'react';
import TagInput from './contentarea/tagInput';
import InterfaceDesktop from './contentarea/interfaceDesktop';
import InterfaceMobile from './contentarea/interfaceMobile';

interface Props{
  activeNote: number;
  forceUpdate: any;
  mobile: boolean;
  layout: number;
  // forceIt(): void;
}

export const MainInterface = (props: Props)=>{
  const [forceUpdate, setForceUpdate] = useState<number>(1);

  return(
    <div>
      <TagInput forceUpdate={props.forceUpdate } activeNote={ props.activeNote } mobile={props.mobile} />

      {(props.layout !== 0) && <InterfaceDesktop 
        forceUpdate={props.forceUpdate} 
        // forceIt={ props.forceIt }
        forceIt={ ()=> setForceUpdate( forceUpdate=> forceUpdate+1)}
        layout={props.layout} activeNote={props.activeNote}/>}

      {(props.layout === 0) && <InterfaceMobile 
        forceUpdate={props.forceUpdate} 
        // forceIt={ props.forceIt }
        forceIt={ ()=> setForceUpdate( forceUpdate=> forceUpdate+1)}
        layout={props.layout} activeNote={props.activeNote} /> }
    </div>
  )
}

export default MainInterface;