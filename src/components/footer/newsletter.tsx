
import React, {} from 'react';
import socialIcons from '../../IMG/social_icons.png';

export function NewsLetter(){
    return ( 
    <span id="newsLetter"> 
        <h2 className="footerHeadlines">Newsletter</h2>
        <div>
          <input tabIndex={-1} className="signupInput" type="text" placeholder="Your email address" />
          <span className="signup">Signup</span>
          <img src={socialIcons} alt="social icons" className="img-fluid socialIcons"/>
        </div>
    </span>);
}
export default NewsLetter;