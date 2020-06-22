
import React, {useEffect, useState, CSSProperties} from 'react';
import {Container} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import storage from '../store/data/action'
import {save} from '../js/storageHandling';
import { tLaterType, UserData } from '../types';
import templates from '../templates';

export function LaterLearnings(){
  const data:any = useSelector<any>(state=>state.data);
  const dispatch = useDispatch();

  const [obj, setObj] = useState<tLaterType[]>( 
    [ templates.laterType() ])

  useEffect( ()=>{ setObj( data.laterLearnings.list ); }, []) //eslint-disable-line

  useEffect( ()=>{
    let _data = data;
    _data.laterLearnings.list = obj;
    dispatch( storage.setData(_data));
    save( _data );
  }, [obj]) // eslint-disable-line


  const createNewTextArea = ()=>{
    let _obj: tLaterType[] = [...obj];
    _obj.push( templates.laterType() )
    setObj(_obj);

    let _data: UserData = data;
    _data.laterLearnings.list = obj;
    dispatch( storage.setData(_data));
    save( _data );
  }

  const deleteTextArea = (index:number)=>{
    let _obj: tLaterType[] = [...obj];
    _obj.splice(index, 1);
    if(_obj.length === 0) _obj.push( templates.laterType() );
    setObj(_obj);

    let _data: UserData = data;
    _data.laterLearnings.list = obj;
    dispatch( storage.setData(_data));
    save( _data );
  }

  return(
    <Container fluid style={{paddingBottom: 20}}>
      <div style={{padding: 10}}>
        <span style={{fontSize: 25}}>Create data you want to insert at a later point</span>
        <span 
        style={newInputArea}
        onClick={ ()=>{ createNewTextArea() }}
        >Create new textarea</span>
      </div>

      {obj.map( (item: tLaterType, index:number)=>{
        return(
          <div key={index}
          style={{marginBottom: 30}}
          >
            <div style={{paddingBottom: 10}}>
              <input 
                style={{width: '80%', color:'black', paddingLeft: 10}}
                value={item.name}
                type="text" 
                placeholder={"Headline"}
                onChange={ (evt:any)=>{ 
                  let _obj = [...obj];
                  _obj[index].name = evt.target.value;
                  setObj( _obj );
                }}
              />

              <span style={{marginLeft: 15}}>Daily Fetch: </span>
              <input 
                style={{width: '30px', textAlign: 'center', color:'black'}}
                value={item.questionsFetch}
                type="text" 
                placeholder={"0"}
                onChange={ (evt)=>{ 
                  let str = evt.target.value;
                  if( str.length > 0 && isNaN(Number(str))) return;
                  if( str.length > 2 ) return;
                  let _obj = [...obj];
                  _obj[index].questionsFetch = str;
                  setObj( _obj );
                }}
              />

              <span
                onClick={ ()=>{ deleteTextArea(index)}}
                style={{color: 'red', fontWeight: 'bold', display: 'inline-block', padding: '2px 3px', border: '1px solid black', cursor: 'pointer', marginLeft: 10, borderRadius: 5, backgroundColor: ''}}
              >X</span>
            </div>

            <div style={{verticalAlign: 'top', width: '100%', display: 'inline-block', height: '400px'}}>
              <textarea 
                style={{height: '100%', width: '50%', verticalAlign: 'top'}}
                value={item.questions}
                placeholder={"Questions"}
                onChange={ (evt)=>{ 
                  let _obj = [...obj];
                  _obj[index].questions = evt.target.value;
                  setObj( _obj );
                }}
              />

              <textarea 
                style={{height: '100%', width: '50%', verticalAlign: 'top'}}
                value={item.answers}
                placeholder={"Answers"}
                onChange={ (evt)=>{ 
                  let _obj = [...obj];
                  _obj[index].answers = evt.target.value;
                  setObj( _obj );
                }}
              />

            </div>
          </div>
        )
      })
    }

    </Container>
  )
}

export default LaterLearnings;

const newInputArea = {
  position: 'absolute',
  right: 50,
  display: 'inline-block',
  padding: '2px 10px',
  textAlign: 'center',
  borderRadius: 4,
  border: '1px solid black',
  cursor: 'pointer',
  marginLeft: 30,
} as CSSProperties



