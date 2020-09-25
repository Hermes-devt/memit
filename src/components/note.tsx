
import React, {useState, useEffect, useRef, createRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {iUserData} from '../templatesTypes';
import {save} from '../js/storageHandling';
import storage from '../store/data/action';
import '../CSS/note.scss';

export const Note = ()=>{
  const Data: any = useSelector<any>( (state: {data: iUserData })=> state.data );
  const [documents, setDocuments] = useState<any>(Data.note.list )
  const [activeDocument, setActiveDocument] = useState<any>(0);

  const [hideMenu, setHideMenu] = useState<boolean>(false);
  const dispatch = useDispatch();
  const textareaRef= useRef<any>(createRef());
  const containerRef = useRef<any>(createRef());

  // Let the textarea expand to its mininum non-scroll height
  useEffect( ()=>{
    // textareaRef.current.style.height = '600px';
    // // containerRef.current.style.height = '500px';
    // let height = textareaRef.current.scrollHeight;
    // let cssHeight = textareaRef.current.style.height.match(/\d+/)[0];
    // if( Math.abs( height-Number(cssHeight)) < 20 ){ return; }

    // textareaRef.current.style.height = height + 20 + "px";
    // containerRef.current.style.height = height + 20 + 'px';
  }, [activeDocument]) //eslint-disable-line

  const isActive = (index: number): string => index === activeDocument ? "menuItem menuItemActive" : "menuItem";
  const saveData = (nDocuments:any)=>{
      let nData = {...Data};
      nData.note.list = [...nDocuments];
      dispatch( storage.setData(nData) );
      save( nData );
  }

  return(<span id="noteComponent" ref={containerRef}>
    {hideMenu && <div className="hideDisplayVerticalButton verticalButtonOpen" onClick={ ()=> setHideMenu( false )} >Open menu</div>}
    {!hideMenu && <span id="verticalBar3">
      <div className="hideDisplayVerticalButton verticalButtonClose" onClick={ ()=> setHideMenu( true )} >&lt;</div>
      <div id="headline" >
          <span>Notes</span>
          <span id="addDeleteDocumentsContainer">
          <span className="button"
            onClick={ ()=>{
              let nDocuments = [...documents];
              nDocuments.splice(activeDocument + 1, 0, {headline: "New doc", text: ""});
              setDocuments( nDocuments );
              setActiveDocument(activeDocument + 1);
              saveData( nDocuments );
            }}
            >+</span>

            <span className="button"
              onClick={ ()=>{
                let nDocuments = [...documents];
                if( nDocuments.length === 1){
                  nDocuments[activeDocument] = {headline: 'New doc', text: ""}
                }else{
                  nDocuments.splice(activeDocument, 1);
                  let active = nDocuments.length - 1 < activeDocument ? activeDocument - 1 : activeDocument;
                  setActiveDocument(active);
                }
                setDocuments( nDocuments );
                saveData( nDocuments );
              }}
              >-</span>

          </span>

      </div>


      {documents.map( (doc: {headline: string}, index:number)=>
        <input
          key={index}
          className={ isActive(index)}
          onClick={ (evt)=>{
            evt.currentTarget.blur();
            setActiveDocument( index );
          }}
          onDoubleClick={ (evt)=>{ evt.currentTarget.focus(); }}

          onChange={ (evt)=>{
            let nValue = evt.currentTarget.value;
            let nDocuments = [...documents];
            nDocuments[activeDocument].headline = nValue;
            setDocuments( nDocuments );
            saveData( nDocuments );
          }}
          value={doc.headline} />
      )}
    </span>
  }

    {documents.length > 0 && <textarea 
      value={ documents[activeDocument].text}
      id="textArea"
      style={{height: '100%'}}
      ref={ textareaRef }
      onChange={ (evt)=>{
        let nValue = evt.currentTarget.value;
        let nDocuments = [...documents];
        nDocuments[activeDocument].text = nValue;
        setDocuments( nDocuments );
        saveData( nDocuments );
      }}
    />}
  </span>)
}

export default Note;