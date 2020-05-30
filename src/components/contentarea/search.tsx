
import React, {useRef, createRef, useEffect, useState} from 'react';
import {Container} from 'react-bootstrap';
import {useSelector} from 'react-redux';


export const Search = ()=> {
  const [tags, setTags] = useState<string>('');
  const [stringFind, setStringFind] = useState<string>('');
  const [showBlocks, setShowBlocks] = useState<any>([]);

  const inputRef = useRef<any>();
  const inputRef2 = useRef<any>();
  let data:any = useSelector( state=> state);

  const elementsRef = useRef<any>(data.data.list.map(() => createRef()));
  const elementsRef2 = useRef<any>(data.data.list.map(() => createRef()));

  data.data.list.forEach( (item:any) =>{
    item.answers = item.answers.trim(); item.questions = item.questions.trim();
  });

  useEffect( ()=>{
    let tagsObj = [];
    for(let i=0, len:number=data.data.list.length; i<len; i++){
      let tagStr = "";
      if(typeof data.data.list[i].tags === 'object') tagStr = data.data.list[i].tags.join(' ');
      else                                           tagStr = data.data.list[i].tags;

      const obj = tagStr.includes(tags) ? {display: 'block'} : {display: 'none'};
      tagsObj.push(obj)
    }
    setShowBlocks( tagsObj );
  }, [tags]) //eslint-disable-line

  useEffect( ()=>{
    let tagsObj = [];
    for(let i=0, len:number=data.data.list.length; i<len; i++){
      const obj = 
        data.data.list[i].questions.includes(stringFind) || 
        data.data.list[i].answers.includes(stringFind) ? 
        {display: 'block'} : {display: 'none'};
      tagsObj.push(obj)
    }
    setShowBlocks( tagsObj);

  }, [stringFind]) //eslint-disable-line


  useEffect( ()=>{
    setShowBlocks( ()=>data.data.list.map( ()=>{ return{display: 'block'}}) )

    for( let i=0, len=elementsRef.current.length; i<len; i++){
      let questionHeight = elementsRef.current[i].current.scrollHeight;
      let answerHeight = elementsRef2.current[i].current.scrollHeight;

      let height = (questionHeight > answerHeight ? questionHeight : answerHeight) + 5 + 'px';
      elementsRef.current[i].current.style.height = height;
      elementsRef2.current[i].current.style.height = height;
    }
  }, []) //eslint-disable-line

  return(
  <Container fluid style={{padding: 30}}>
    <div>
      <input 
        placeholder="Sort documents based on tags"
        style={{width: '100%'}}
        ref={inputRef}

        value={ tags }
        onChange={ (evt)=>{ setTags(evt.target.value) }}
      />

      <input 
        placeholder="Sort documents after specific keywords"
        style={{width: '100%', marginTop: 20}}
        ref={inputRef2}
        value={stringFind}
        onChange={ (evt)=>{ setStringFind(evt.target.value)}}
      />


      {data.data.list.map( (item:any, index:number)=>{
        // let questionRows = ((item.questions || "").match( /\r\n|\r|\n/g) || []).length;
        // let answerRows = ((item.answers|| "").match( /\r\n|\r|\n/g) || []).length;
        return(
          <div key={index} style={{...{verticalAlign: 'top'}, ...showBlocks[index] }}>

            <div style={{fontSize: '18px', fontWeight: 'bold', padding: '3px 0px'}}>
              {typeof item.tags !== 'string' && item.tags.join(', ')}
              {typeof item.tags === 'string' && item.tags}
            </div>
            <textarea
              readOnly
              style={{width: '50%'}}
              value={item.questions}
              ref={elementsRef.current[index]}
            />
            <textarea
              style={{width: '50%', verticalAlign: 'top'}}
              readOnly
              onChange={ ()=>{}}
              ref={elementsRef2.current[index]}
              value={item.answers}
            />
          </div>
        )
      })}
    </div>
  </Container>)
}

export default Search;