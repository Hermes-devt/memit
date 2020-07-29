
import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import NewsLetter from './newsletter';
import Contact from './contact';
import About from './about';
import '../../CSS/footer.scss';

export function Footer(props: any){
  return (
    <Container fluid id="footer">
      <div>
        <Row>
          <Col className="d-none d-sm-block col-sm-4 p-2"><About /> </Col>
          <Col className="d-none d-sm-block col-sm-4 p-2"> <Contact /> </Col>
          <Col className="d-none d-sm-block col-sm-4 p-2"> <NewsLetter /> </Col>

          <div className="px-4 m-0 d-sm-none margin-auto">
            <About />
            <Contact />
            <NewsLetter />
          </div>
        </Row>
      </div>
      {props.children}
    </Container>
  );
}
export default Footer;