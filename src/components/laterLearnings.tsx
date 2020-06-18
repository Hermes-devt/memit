
import React, {} from 'react';
import {Container} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';

export function LaterLearnings(){
  const data:any = useSelector<any>(state=>state.data);
  // const dispatch = useDispatch();

  console.log('dataaaa', data)
  return(
    <Container fluid>
      {data.laterLearnings.list.map( (item:any, index:number)=>{
        console.log(item)
        return(
          <div key={index}>
            <div>
              <input 
                style={{width: '100%', color:'black', paddingLeft: 10}}
                onChange={ ()=>{ 
                  console.log('here')
                }}
                type="text" value={item.name}
              />

            </div>
            <textarea 
              style={{width: '50%', height: '400px', verticalAlign: 'top'}}
              value={item.questions}
              onChange={(evt)=>{
                ;
              }}
            />
            <textarea 
              style={{width: '50%', height: '400px', verticalAlign: 'top'}}
              value={item.answers}
              onChange={(evt)=>{
                ;
              }}
            />
          </div>
        )
      })
    }
    </Container>
  )
}

export default LaterLearnings;





