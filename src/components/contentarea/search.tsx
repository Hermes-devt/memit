
import React, {useRef, createRef, useEffect, useState} from 'react';
import {Container} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import '../../CSS/search.scss';
import {iList, iListItem, iQuestionAnswer, iQuestionAnswerPair } from '../../templatesTypes';


export const Search = ()=> {
  const [tags, setTags] = useState<string>('');
  const [stringFind, setStringFind] = useState<string>('');

  // const [showBlocks, setShowBlocks] = useState<{display: string}[]>([]);

  const [listToShow, setList] = useState<any>([])
  let data:any = useSelector<any>( state=> state.data);

  const questionTextAreas = useRef<any>(data.get.list().map(() => createRef()));
  const answerTextAreas = useRef<any>(data.get.list().map(() => createRef()));


  // Finds all the cards the matches the corresponding tags.
  const tagFind = ()=>{
    let tagsObj : {display: string }[] = [];
    let tagArr: string[] = (tags || "").split(/[,]/);

    const list: iList = data.get.list();

    let tempList: iList = [];
    for(let i=0, len:number= list.length; i<len; i++){
      let tagStr: string = list[i].tags;
      let includes: boolean = false;

      let len: number = tagArr.length;
      for(let y=0; y<len; y++){
        if( tagArr[y].length === 0 || tagArr[y] === ' ') continue;

        if( tagStr.trim().toLowerCase().includes(tagArr[y].toLowerCase())){
          includes = true; break; }
      }
      if( includes ){
        tempList.push( list[i] );
      }
      tagsObj.push( includes ? {display: 'block'} : {display: 'none'});
    }

    // setShowBlocks( tagsObj );
    setList( tempList );
  }

  // Find all cards matching the corresponding string
  const findString = ()=>{
    if( stringFind.trim() === '') return;

    const strArr = stringFind.split(/, /);
    // let tagsObj: {display: string}[] = [];
    const list: iList = data.get.list();

    let tempList: iList = [];
    for(let i=0, len:number=list.length; i<len; i++){
      let includes: boolean = false;

      let listText = getText( list[i], 'question') +' ' + getText( list[i], 'answer');

      for(let y=0, len=strArr.length; y<len; y++){
        if( strArr[y].length === 0 || strArr[y] === ' ') continue;
        if( listText.includes(strArr[y])){
          includes = true;
          break;
        }
      }
      if( includes ){
        tempList.push( list[i])
      }
      // tagsObj.push( includes ? {display: 'block'} : {display: 'none'});
    }
    setList( tempList );
    // setShowBlocks( tagsObj);

  }

  
  // Automatically expands the text areas so no scolling is required
  useEffect( ()=>{
    // setShowBlocks( ()=>data.get.list().map( ()=>{ return{display: 'block'}}) )

    for( let i=0, len=questionTextAreas.current.length; i<len; i++){

      if( !questionTextAreas.current[i].current) continue;
      let questionHeight = questionTextAreas.current[i].current.scrollHeight;
      let answerHeight = answerTextAreas.current[i].current.scrollHeight;

      let height = (questionHeight > answerHeight ? questionHeight : answerHeight) + 5 + 'px';
      questionTextAreas.current[i].current.style.height = height;
      answerTextAreas.current[i].current.style.height = height;
    }

  }, [listToShow]) //eslint-disable-line

  const getText = (field: iListItem, key:string): string=>{
    let text = '';

    field.questionAnswerPair.forEach( (item: iQuestionAnswerPair, index:number)=>{
      let obj: iQuestionAnswer|number = item[key as keyof iQuestionAnswerPair];
      if( typeof obj !== 'number' )
        text += index + 1 + '. ' + obj.text + '\n';
    })
    return text.trim();
  }

  return(
  <Container className='m-0 p-0' fluid>
    <div id="searchComponent">
      <input 
        placeholder="Sort documents based on tags"
        className="tagInput"
        value={ tags }
        onChange={ (evt)=>{ 
          setTags(evt.target.value) 
          if( evt.target.value === '')
            setList([])
        }}
        onKeyDown={ (evt:any)=>{
          if( evt.key !== 'Enter') return;
          tagFind();
        }}
      />

      <input 
        placeholder="Sort documents after specific keywords"
        className="documentSortInput"
        value={stringFind}
        onChange={ (evt)=>{ 
          setStringFind(evt.target.value)
          if( evt.target.value === '')
            setList([])
        }}
        onKeyDown={ (evt:any)=>{
          if( evt.key !== 'Enter') return;
          findString();
        }}
      />

      {listToShow.map( (item:any, index:number)=>{
        return(
          <div key={index} 
          style={{verticalAlign: 'top'}}>
          {/* <div key={index} style={{...{verticalAlign: 'top'}, ...showBlocks[index] }}> */}

            <h3 className="tagStr"> {item.tags} </h3>

            <textarea
              readOnly
              style={{width: '50%', padding: 10}}
              value={ getText(item, 'question') }
              ref={questionTextAreas.current[index]}
            />
            <textarea
              style={{width: '50%', verticalAlign: 'top', padding: 10}}
              readOnly
              onChange={ ()=>{}}
              ref={answerTextAreas.current[index]}
              value={ getText(item, 'answer') }
            />
          </div>
        )
      })}
    </div>
  </Container>)
}

export default Search;