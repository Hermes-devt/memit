
import React from 'react';
import Scheduler from './scheduler';
import {Container, Row, Col} from 'react-bootstrap';
import {ReactComponent as Clockcss} from '../../IMG/clock1.svg';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {iUserData} from '../../templatesTypes';

import '../../CSS/topbar.scss';

export const Topbar = ()=>{
  const Data: any = useSelector<any>( (state: {data: iUserData })=> state.data );


  if( Data.settings.minimize ){
      // return <div className='noselect' style={{padding: 0, marginLeft: 20, fontStyle: 'italic', fontSize: 25}}>Repeat Learnings</div>
      return <span></span>
  }
  else return( <Container fluid id='topbar'>
      <Row>
        <Col className="d-none d-md-block">
          <div className="clockLeft"> <Clockcss /> </div>
        </Col>

         <Col className="col-xs-12 col-sm-10 col-md-8"> 
          <Link to="/" id="topbarHeadline"><h1>Repeat Learnings</h1></Link>
          <Scheduler />
        </Col>

        <Col className="d-none d-sm-block">
          <div className="clockRight" > <Clockcss /> </div>
        </Col>

      </Row>
    </Container>
  )
}
export default Topbar;