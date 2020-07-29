
import React, {useRef, createRef, useEffect, useState} from 'react';
import {Container} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import '../../CSS/search.scss';


export const Search = ()=> {
  const [tags, setTags] = useState<string>('');
  const [stringFind, setStringFind] = useState<string>('');
  const [showBlocks, setShowBlocks] = useState<{display: string}[]>([]);

  let data:any = useSelector<any>( state=> state.data);

  const questionTextAreas = useRef<any>(data.list.map(() => createRef()));
  const answerTextAreas = useRef<any>(data.list.map(() => createRef()));

  data.list.forEach( (item:any) =>{
    item.answers = item.answers.trim(); 
    item.questions = item.questions.trim();
  });

  useEffect( ()=>{
    let tagsObj : {display: string }[] = [];
    let tagArr: string[] = (tags || "").split(/[,]/);

    const list = data.list

    for(let i=0, len:number= list.length; i<len; i++){
      let tagStr: string = list[i].tags.join(' ');
      let includes: boolean = false;

      let len: number = tagArr.length;
      for(let y=0; y<len; y++){
        if( tagArr[y].length === 0 || tagArr[y] === ' ') continue;

        if( tagStr.trim().toLowerCase().includes(tagArr[y].toLowerCase())){
          includes = true; break; }
      }
      tagsObj.push( includes ? {display: 'block'} : {display: 'none'});
    }

    setShowBlocks( tagsObj );
  }, [tags]) //eslint-disable-line

  useEffect( ()=>{
    if( stringFind.length === 0 || stringFind === ' ') return;

    const strArr = stringFind.split(/,/);
    let tagsObj: {display: string}[] = [];
    const {list} = data;


    for(let i=0, len:number=list.length; i<len; i++){
      let includes: boolean = false;
      for(let y=0, len=strArr.length; y<len; y++){
        if( strArr[y].length === 0 || strArr[y] === ' ') continue;
        if( list[i].questions.includes(strArr[y]) || list[i].answers.includes(strArr[y])){
          includes = true; break; }
      }

      tagsObj.push( includes ? {display: 'block'} : {display: 'none'});

    }
    setShowBlocks( tagsObj);
  }, [stringFind]) //eslint-disable-line


  useEffect( ()=>{
    setShowBlocks( ()=>data.list.map( ()=>{ return{display: 'block'}}) )

    for( let i=0, len=questionTextAreas.current.length; i<len; i++){
      let questionHeight = questionTextAreas.current[i].current.scrollHeight;
      let answerHeight = answerTextAreas.current[i].current.scrollHeight;

      let height = (questionHeight > answerHeight ? questionHeight : answerHeight) + 5 + 'px';
      questionTextAreas.current[i].current.style.height = height;
      answerTextAreas.current[i].current.style.height = height;
    }

  }, []) //eslint-disable-line

  return(
  <Container className='m-0 p-0' fluid>
    <div id="searchComponent">
      <input 
        placeholder="Sort documents based on tags"
        className="tagInput"
        value={ tags }
        onChange={ (evt)=>{ setTags(evt.target.value) }}
      />

      <input 
        placeholder="Sort documents after specific keywords"
        className="documentSortInput"
        value={stringFind}
        onChange={ (evt)=>{ setStringFind(evt.target.value)}}
      />

      {data.list.map( (item:any, index:number)=>{
        return(
          <div key={index} style={{...{verticalAlign: 'top'}, ...showBlocks[index] }}>

            {/* <div style={{fontSize: '18px', fontWeight: 'bold', padding: '3px 0px'}}> */}
            <h3 className="tagStr">
              {typeof item.tags !== 'string' && item.tags.join(', ')}
              {typeof item.tags === 'string' && item.tags}
            </h3>

            <textarea
              readOnly
              style={{width: '50%'}}
              value={item.questions}
              ref={questionTextAreas.current[index]}
            />
            <textarea
              style={{width: '50%', verticalAlign: 'top'}}
              readOnly
              onChange={ ()=>{}}
              ref={answerTextAreas.current[index]}
              value={item.answers}
            />
          </div>
        )
      })}
    </div>
  </Container>)
}

export default Search;