
import React, {useState, useEffect, useRef, createRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {iUserData} from '../templatesTypes';
import {save} from '../js/storageHandling';
import storage from '../store/data/action';
import breakOutQuestionAnswersFromNote from '../js/textManipulation/execute/breakoutQuestionsAnswersFromNote'
import adjustNumbers from '../js/textManipulation/adjustNumbers'
import '../CSS/staging.scss';

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
    if( Data.settings.activeNote > -1)
      setActiveDocument( Data.settings.activeNote)
  }, []) //eslint-disable-line

  const isActive = (index: number): string => index === activeDocument ? "menuItem menuItemActive" : "menuItem";

  const saveData = (nDocuments:any)=>{
      let nData = {...Data};
      nData.note.list = [...nDocuments];
      nData.settings.activeNote = activeDocument;
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
              const newActiveDocument = activeDocument + 1;
              nDocuments.splice(newActiveDocument, 0, {headline: "New doc", text: ""});
              Data.settings.activeNote = newActiveDocument;
              setDocuments( nDocuments );
              setActiveDocument(newActiveDocument);
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
                  Data.settings.activeNote = active;
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
            Data.settings.activeNote = index;
            dispatch( storage.setData(Data) );
            save(Data);
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

      // onKeyDown={ (evt)=>{ console.log('here'): }}
      onKeyDown={ (evt)=>{
        let re = /\nsend\n|\nnsend\n/

        let nValue = textareaRef.current.value;
        nValue += evt.key.length === 1 ? evt.key : '';

        let reMatch = textareaRef.current.value.match(re);
        if( evt.key === 'Enter' && reMatch){
        // if( evt.key === 'Enter' && (textareaRef.current.value).match(re)){
          let spacingBetweeNewAndOldQuestions: boolean = reMatch[0].charAt(1) === 'n' ? true: false;

          let sub = nValue.substring( 0, reMatch.index);
          let questionAnswerObj = breakOutQuestionAnswersFromNote( sub );
          let numberOfCharToDeleteToRemoveCommand: number = spacingBetweeNewAndOldQuestions ? 6 : 5;
          nValue = nValue.substring( reMatch.index + numberOfCharToDeleteToRemoveCommand);

          let Todays = Data.list[ Data.list.length -1 ];

          Todays.questions = Todays.questions.trim() + (spacingBetweeNewAndOldQuestions ? '\n':'');
          Todays.answers = Todays.answers.trim() + (spacingBetweeNewAndOldQuestions ? '\n':'');
          Todays.questions += '\n' + questionAnswerObj.questions;
          Todays.answers += '\n' + questionAnswerObj.answers;
          Todays.questions = Todays.questions.trim()
          Todays.answers = Todays.answers.trim() 

          Data.list[ Data.list.length -1 ] = adjustNumbers( Data.list[ Data.list.length -1 ] );
          dispatch( storage.setData(Data) );
          save( Data );

          let nDocuments = [...documents];
          nDocuments[activeDocument].text = nValue;
          setDocuments( nDocuments );
          saveData( nDocuments );
          setTimeout( ()=>{ 
            textareaRef.current.selectionEnd = 0; 
            textareaRef.current.scrollTo(0, 0)
          },5);
        }
      }}

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