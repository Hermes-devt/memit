
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import '../CSS/rightMenu.scss';

export function RightMenu(){
  const [displayMenu, setDisplayMenu] = useState<boolean>(false);

  return( <div 
      // onMouseEnter={ ()=>{ setDisplayMenu(true)}}
      // onClick={ ()=> setDisplayMenu(true)}
      // onMouseLeave={ ()=>{ setDisplayMenu(false)}}
      className="rightMenuContainer mobile">
      <span className="" onClick={ ()=>{ setDisplayMenu( !displayMenu)}}>
        {!displayMenu && <span className="rightMenuOpener">&lt;</span> }
        {displayMenu && <span className="rightMenuOpener rotate">&gt;</span> }
      </span>
        {displayMenu && <div className="mobile blackCover" onClick={ ()=> setDisplayMenu(false)}></div>}
        {displayMenu && <span className="popup">
          <div className="">
            <span onClick={ ()=> setDisplayMenu( false )}>
            <Link to="/" className="item" >Home</Link>
            <Link to="/schedule" className="item" >Schedule</Link>
            <Link to="/search" className="item" >Search</Link>
            <Link to="/dailyNotes" className="item" >Daily notes</Link>
            <Link to="/note" className="item" >Note</Link>
            <Link to="/laterLearnings" className="item" >Later learnings</Link>
            </span>
          </div>
        </span>
        }
    </div>
  )
}


export default RightMenu;