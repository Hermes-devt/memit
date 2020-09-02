
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import '../CSS/rightMenu.scss';

export function RightMenu(){
  const [displayMenu, setDisplayMenu] = useState<boolean>(false);


  return( <div 
      onMouseEnter={ ()=>{ setDisplayMenu(true)}}
      onMouseLeave={ ()=>{ setDisplayMenu(false)}}
      className="rightMenuContainer mobile">
      <span className="" onClick={ ()=>{ setDisplayMenu( !displayMenu)}}>
        {!displayMenu && <span className="rightMenuOpener">&lt;</span> }
        {displayMenu && <span className="rightMenuOpener rotate">&gt;</span> }
      </span>
        {displayMenu && <span style={{display: 'inline-block', position: 'relative'}}>
          <div className="rightMenuPopup">
            <span onClick={ ()=> setDisplayMenu( false )}>
            <Link to="/" className="rightMenuPopupLink" >Home</Link>
            <Link to="/schedule" className="rightMenuPopupLink" >Schedule</Link>
            <Link to="/search" className="rightMenuPopupLink" >Search</Link>
            <Link to="/dailyNotes" className="rightMenuPopupLink" >Daily notes</Link>
            <Link to="/laterLearnings" className="rightMenuPopupLink" >Later learnings</Link>
            </span>
          </div>
        </span>
        }
    </div>
  )
}


export default RightMenu;