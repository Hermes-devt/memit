
import React, {CSSProperties } from 'react';
import socialIcons from '../../IMG/social_icons.png';

export function NewsLetter(){
    return ( <>
        <h2 style={{color: 'orange'}}>Newsletter</h2>
        <div>
          <input style={styles.signupInput} type="text" placeholder="Your email address" />
          <span style={styles.signup}>Signup</span>
        </div>
        <img style={{width: 160, marginTop:10}} src={socialIcons} alt="social icons" className="m-3 img-fluid"/>
    </>);
}
 
const styles = {
  signupInput: {
    fontSize: 17,
    fontFamily: 'bold',
    padding: '3px 3px',
    paddingLeft: '10px',
    marginBottom: 8,
    color: 'black',
  } as CSSProperties,

  signup: {
    color: 'white',
    backgroundColor: 'brown',
    display: 'inline-block',
    padding: '5px 20px',
    borderRadius: 5,
    marginLeft: 10,
    cursor: 'pointer',
  } as CSSProperties,

}
export default NewsLetter;