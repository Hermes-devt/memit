
import React, {useState, useEffect, CSSProperties} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
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
      <Container fluid>
          {/* <div style={{position: 'relative', fontSize: 17, top: '-3px', left: '-20px', textAlign: 'center', padding: '4px 0px 0px 0px', width: '16%', display: 'inline-block', color: 'white', backgroundColor: '#242424'}}>Tags:</div> */}
          <Row className="no-gutters">
            <Col className='m-0 p-0 col-sm-2'>
              <div style={styling.t1}>Tags</div>
            </Col>
            <Col className="m-0 p-0 col-sm-10">
              <input 
                style={styling.t2}
                type="text" 
                value={tags}
                onBlur={ saveToStorage }
                placeholder="Set some basic tags for this day for to find later on."
                onChange={( (evt)=>{ 
                  let data = {...Data}
                  data.list[props.activeNote].tags = evt.target.value;
                  dispatch( setData(data));
                })}
              />
            </Col>

          </Row>
    </Container>)
}

const styling = {
  t1: {
    position: 'relative', 
    fontSize: 18,
    fontWeight: 'bold',
    top: '4px',
    height: '100%',
    textAlign: 'center',
    color: 'white',
    backgroundColor: '#242424',
    // borderTop: '1px solid silver',
    boxShadow: '-2px -2px 10px black',
  } as CSSProperties,

  t2: {
    display: 'inline-block',
    fontSize: 14,
    padding: '4px 30px',
    width: '100%',
    color: 'black',
  }
}
export default TagInput;