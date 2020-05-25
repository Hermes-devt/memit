
import React, {useState, useEffect} from 'react';
import {Container} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import {setData} from '../../store/data/action';
import {save} from '../../js/storageHandling';


export function TagInput(props:any):any{
  const Data = useSelector((state:any)=> state.data);
  const dispatch = useDispatch();
  const [tags, setTags] = useState('');

  
  useEffect( ()=>{
    let tags2 =  Data.list[props.activeNote].tags;
    if( typeof tags2 === 'string') setTags( tags2 );
    if( typeof tags2 === 'object') setTags( tags2.join(','));
  },[Data.list[props.activeNote].tags]); //eslint-disable-line

  const saveToStorage = (evt:any)=>{
    let data = {...Data};
    let _tags = evt.target.value;
    let arr = _tags.split(',');
    data.list[props.activeNote].tags = arr;
    save( data );
  };

  return(
      <Container fluid className='m-0 p-0'>
          <div style={{position: 'relative', fontSize: 21, top: '0px', left: '-20px', textAlign: 'center', padding: '4px 0px 0px 0px', height: 40, width: '16%', display: 'inline-block', color: 'white', backgroundColor: '#242424'}}>Tags:</div>

          <input 
            style={{fontSize: 20, padding: '4px 30px', display: 'inline-block', marginLeft: -20, width: '80%'}} 
            type="text" 
            value={tags}
            onChange={( (evt)=>{ 
              let data = {...Data}
              data.list[props.activeNote].tags = evt.target.value;
              dispatch( setData(data));
            })}

            onBlur={ saveToStorage }
            placeholder="Set some basic tags for this day for to find later on."
            />
    </Container>)
}

export default TagInput;