import React, {CSSProperties} from 'react';

export function InsertLaterLearningsPopup(props:any){

  console.log('props', props)
  return(
    <div style={container}>
      <textarea 
        readOnly
        style={textarea}
        value={props.answers}
      />

      <textarea 
        readOnly
        style={textarea}
        value={props.questions}
      />

      <div style={insert}>INSERT</div>
    </div>
  )
}

export default InsertLaterLearningsPopup;
const insert = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  padding: '20px 20px',
  marginLeft: -45,
  marginTop: -40,
  color: 'black',
  border: '1px solid black',
  fontSize: 15,
  borderRadius: 5,
  backgroundColor: 'lightblue',
  textAlign: 'center',
  cursor: 'pointer', 
  opacity: 0.8,
} as CSSProperties

const textarea = {
  display: 'inline-block',
  width: '50%',
  height: '100%',
  verticalAlign: 'top',
}

const container = {
  color: 'black',
  zIndex: 999,
  fontSize: 8,
  position: 'fixed',
  left: '50%',
  top: '50%',
  boxSizing: 'border-box',
  marginLeft: '-25vw',
  marginTop: '-25vh',
  width: '50vw',
  height: '50vh',
  backgroundColor: 'white',
  border: '1px solid black',
} as CSSProperties
