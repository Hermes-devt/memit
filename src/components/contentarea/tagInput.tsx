
import React, {useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import {setData} from '../../store/data/action';
import {save} from '../../js/storageHandling';
import {UserData} from '../../types';
import '../../CSS/tagInput.scss'


interface Props {
  activeNote: number;
  mobile: boolean;
  forceUpdate?: any;
}

// export function TagInput({activeNote, mobile}: {activeNote: number, mobile:boolean}):any{
export function TagInput({activeNote, mobile, forceUpdate=""}: Props):any{
// export function TagInput({activeNote}: {activeNote: number}):any{
  const Data = useSelector((state:any)=> state.data);
  const dispatch = useDispatch();
  const [tags, setTags] = useState('');

  
  useEffect( ()=>{
    let _tags: string[] =  Data.list[activeNote].tags;
    setTags( _tags.join(','));
  },[activeNote, forceUpdate]) //eslint-disable-line

  const saveToStorage = (evt:any)=>{
    let data: UserData = {...Data};
    let _tags: string = evt.target.value;
    let arr: string[] = _tags.split(',');
    data.list[activeNote].tags = arr;
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
                  data.list[activeNote].tags = evt.target.value;
                  setTags(evt.target.value);
                  dispatch( setData(data));
                })}
              />
            </Col>
            {/* <Col className='d-none d-md-block m-0 p-0 col-sm-2'> <div style={styling.t1}>Tags</div> </Col> */}
          </Row>
    </Container>)
}

export default TagInput;