
import React from 'react';
import Scheduler from './scheduler';
import {Container, Row, Col} from 'react-bootstrap';
import {ReactComponent as Clockcss} from '../../IMG/clock1.svg';
import {Link} from 'react-router-dom';
import '../../CSS/topbar.scss';

export const Topbar = ()=>{
  return(
    <Container fluid id='topbar'>
        <div id="topbarCover"></div>
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