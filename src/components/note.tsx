
import React, {useState, useEffect, useRef, createRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {iListItem, iNote, iUserClass} from '../templatesTypes';
import {save} from '../js/storageHandling';
import storage from '../store/data/action';
import splitOutQuestionsFromText from '../js/splitOutQuestionsFromText';
// import ReactMarkdown from 'react-markdown'
import '../CSS/note.scss';

export const Note = ()=>{
  const Data: any = useSelector<any>( (state: {data: iUserClass})=> state.data );
  const [documents, setDocuments] = useState<iNote>(Data.data.note)
  const [activeDocument, setActiveDocument] = useState<number>(0);
  const [markDown, setMarkDown] = useState<boolean>(false);

  const [hideMenu, setHideMenu] = useState<boolean>(false);
  const dispatch = useDispatch();
  const textareaRef= useRef<any>(createRef());
  const containerRef = useRef<any>(createRef());

  // Let the textarea expand to its mininum non-scroll height
  useEffect( ()=>{
    if( Data.data.settings.activeNote > -1)
      setActiveDocument( Data.data.settings.activeNote)
  }, []) //eslint-disable-line

  const isActive = (index: number): string => index === activeDocument ? "menuItem menuItemActive" : "menuItem";

  const saveData = (nDocuments: iNote)=>{
      Data.data.note = nDocuments;
      Data.data.settings.activeNote = activeDocument;
      dispatch( storage.setData(Data));
      save( Data );
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
              let nDocuments = {...documents};
              const newActiveDocument = activeDocument + 1;
              nDocuments.list.splice(newActiveDocument, 0, {headline: "New doc", text: ""});
              Data.data.settings.activeNote = newActiveDocument;
              setDocuments( nDocuments );
              setActiveDocument(newActiveDocument);
              saveData( nDocuments );
            }}
            >+</span>

            <span className="button"
              onClick={ ()=>{
                let nDocuments = {...documents};
                if( nDocuments.list.length === 1){
                  nDocuments.list[activeDocument] = {headline: 'New doc', text: ""}
                }else{
                  nDocuments.list.splice(activeDocument, 1);
                  let active = nDocuments.list.length - 1 < activeDocument ? activeDocument - 1 : activeDocument;
                  Data.data.settings.activeNote = active;
                  setActiveDocument(active);
                }
                setDocuments( nDocuments );
                saveData( nDocuments );
              }}
              >-</span>

          </span>

      </div>


      {documents.list.map( (doc: {headline: string}, index:number)=>
        <input
          key={index}
          className={ isActive(index)}
          onClick={ (evt: any)=>{
            evt.currentTarget.blur();
            setActiveDocument( index );
            Data.data.settings.activeNote = index;
            dispatch( storage.setData(Data) );
            save(Data);
          }}
          onDoubleClick={ (evt)=>{ evt.currentTarget.focus(); }}

          onChange={ (evt: React.ChangeEvent<HTMLInputElement>)=>{
            let nValue = evt.currentTarget.value;
            let nDocuments = {...documents};
            nDocuments.list[activeDocument].headline = nValue;
            setDocuments( nDocuments );
            saveData( nDocuments );
          }}
          value={doc.headline} />
      )}
    </span>
  }

    {documents.list.length > 0 && <span style={{display: 'inline-block', width: '100%'}}>
      {/* {markDown && <span
        style={{height: '100%', width: '100%', margin: '10px', padding: '10px', fontSize: '12px'}}
        onClick={ ()=> setMarkDown(false) }
      > <ReactMarkdown >{ ("#"+ documents.list[activeDocument].text)}</ReactMarkdown></span>} */}

      {!markDown && <textarea 
      value={ documents.list[activeDocument].text}
      id="textArea"
      style={{height: '100%', width: "100%", display: 'inline-block'}}
      ref={ textareaRef }

      onKeyDown={ (evt)=>{
        let re = /\nsend\n/

        let nValue: string = textareaRef.current.value;
        nValue += evt.key.length === 1 ? evt.key : '';

        let reMatch = textareaRef.current.value.match(re);
        if( evt.key === 'Enter' && reMatch){
          let sub: string = nValue.substring( 0, reMatch.index);
          let todays: iListItem = Data.get.todaysCard();
          
          let success = splitOutQuestionsFromText( sub, todays);
          if( !success){
            return;
          }

          console.log( 'success', success );
          let rest: string = nValue.substring( reMatch.index + 5);

          let nDocuments = {...documents};
          nDocuments.list[activeDocument].text = rest;
          setDocuments( nDocuments );
          saveData( nDocuments );

          dispatch( storage.setData(Data) );
          save( Data );
          setTimeout( ()=>{ 
            textareaRef.current.selectionEnd = 0; 
            textareaRef.current.scrollTo(0, 0)
          },5);
        }
      }}

      onChange={ (evt:any )=>{
        let nValue = evt.currentTarget.value;
        let nDocuments = {...documents};
        nDocuments.list[activeDocument].text = nValue;
        setDocuments( nDocuments );
        saveData( nDocuments );
      }}
    />}

    </span>}
  </span>)
}

export default Note;