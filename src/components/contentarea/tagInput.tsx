
import React, {useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import {setData} from '../../store/data/action';
import {save} from '../../js/storageHandling';
import '../../CSS/tagInput.scss'
import { iUserClass } from '../../templatesTypes';


interface Props {
  activeNote: number;
  forceUpdate?: any;
}

export function TagInput({activeNote, forceUpdate=""}: Props):any{
  const Data = useSelector((state:any)=> state.data);
  const dispatch = useDispatch();
  const [tags, setTags] = useState('');

  
  useEffect( ()=>{
    let _tags: string = Data.get.list()[activeNote].tags;
    setTags( _tags );
  },[activeNote, forceUpdate, Data]) //eslint-disable-line

  const saveToStorage = (evt:any)=>{
    let data: iUserClass = {...Data};
    data.data.list[activeNote].tags = evt.target.value;
    save( data );
  };

  return(
      <Container fluid id="tagInput" className="m-0 p-0">
          <Row className="">
            <Col className="m-0 p-0 col-sm-12">
              <input 
                className="input3"
                type="text" 
                value={tags}
                onBlur={ saveToStorage }
                placeholder="Card Tags"
                onChange={( (evt)=>{ 
                  let data = {...Data}
                  data.data.list[activeNote].tags = evt.target.value;
                  setTags(evt.target.value);
                  dispatch( setData(data));
                })}
              />
            </Col>
          </Row>
    </Container>)
}

export default TagInput;