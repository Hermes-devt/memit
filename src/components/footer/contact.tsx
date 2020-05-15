
import React, { Component } from 'react';


// class Contact extends Component {
export function Contact(){
  return (
    <div>
      <div>
        <h2 style={{color: 'orange'}}>Contact</h2>
        <div style={styles.col1}>Email: </div>
        <div style={styles.col2}>kim@repetedScheduling.com</div>
        <br/>
        <div style={styles.col1}>Skype: </div>
        <div style={styles.col2}>+46703861152</div>

        <br/>
        <div style={styles.col1}>Slack:</div>
        <div style={styles.col2}>rk.westberg@gmail.com</div>
      </div>
    </div>
  );
}

const styles = {
  col1:{
    width: 65,
    display: 'inline-block',
    color: 'orange',
  },
  col2:{
    display: 'inline-block', 
    color: 'white',
  }

}
 
export default Contact;