
import React, {CSSProperties } from 'react';
import socialIcons from '../../IMG/social_icons.png';

export function NewsLetter(){
    return ( <span style={{display: 'inline-block', marginBottom: 30}}>
        <h2 style={{color: 'orange'}}>Newsletter</h2>
        <div>
          <input style={styles.signupInput} type="text" placeholder="Your email address" />
          <span style={styles.signup}>Signup</span>
          <img style={{display: 'inline-block', width: 160}} src={socialIcons} alt="social icons" className="img-fluid"/>
        </div>
    </span>);
}
 
const styles = {
  signupInput: {
    fontSize: 17,
    fontFamily: 'bold',
    padding: '3px 3px',
    paddingLeft: '10px',
    marginRight: 10,
    marginBottom: 8,
    color: 'black',
  } as CSSProperties,

  signup: {
    color: 'white',
    backgroundColor: 'brown',
    display: 'inline-block',
    padding: '5px 20px',
    borderRadius: 5,
    cursor: 'pointer',
  } as CSSProperties,

}
export default NewsLetter;