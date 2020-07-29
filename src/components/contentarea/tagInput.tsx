
import React, {useState, useEffect, CSSProperties} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import {setData} from '../../store/data/action';
import {save} from '../../js/storageHandling';
import {UserData} from '../../types';


interface Props {
  activeNote: number;
  mobile: boolean;
}
export function TagInput({activeNote, mobile}: {activeNote: number, mobile:boolean}):any{
// export function TagInput({activeNote}: {activeNote: number}):any{
  const Data = useSelector((state:any)=> state.data);
  const dispatch = useDispatch();
  const [tags, setTags] = useState('');

  
  useEffect( ()=>{
    let _tags: string[] =  Data.list[activeNote].tags;
    setTags( _tags.join(','));
  },[activeNote]) //eslint-disable-line

  const saveToStorage = (evt:any)=>{
    let data: UserData = {...Data};
    let _tags: string = evt.target.value;
    let arr: string[] = _tags.split(',');
    data.list[activeNote].tags = arr;
    save( data );
  };


  const mobileInterface = ()=>{
    return(
        <Container fluid>
            <Row className="">
              <Col className="m-0 p-0 col-sm-12">
                <input 
                  style={styling.t2}
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
            </Row>
      </Container>)
  }

  const desktopInterface = ()=>{
  return(
      <Container fluid>
          <Row className="">
            <Col className="m-0 p-0 col-sm-10">
              <input 
                style={styling.t2}
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
            <Col className='d-none d-md-block m-0 p-0 col-sm-2'> <div style={styling.t1}>Tags</div> </Col>
          </Row>
    </Container>)
  }

  return mobile ? mobileInterface() : desktopInterface();
}

const styling = {
  t1: {
    position: 'relative', 
    fontSize: 18,
    fontWeight: 'bold',
    height: '100%',
    textAlign: 'center',
    color: 'white',
    backgroundColor: '#242424',
    paddingTop: 3,
    boxShadow: '-3px 0px 10px black', 
  } as CSSProperties,

  t2: {
    display: 'inline-block',
    fontSize: 14,
    padding: '4px 15px',
    width: '100%',
    color: 'black',
  }
}
export default TagInput;