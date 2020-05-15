
import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import NewsLetter from './newsletter';
import Contact from './contact';
import About from './about';

export function Footer(){
  return (
    <Container fluid style={styles.footer}>
      <div style={styles.footer}>
        <Row className="flex" style={{backgroundColor: '',}}>
          <Col className="d-none d-md-block col-sm-4 ">
            <About />
          </Col>
          <Col className="d-none d-md-block col-sm-4">
            <Contact />
          </Col>
          <Col className="d-none d-md-block col-sm-4">
            <NewsLetter />
          </Col>

          <div className="px-5 d-md-none margin-auto">
            <About />
            <Contact />
            <NewsLetter />
          </div>
        </Row>
      </div>
    </Container>
  );
}
 
const styles = {
  footer: {
    color: 'white', 
    backgroundColor: '#242424',
    paddingBottom: 20,
  },
}
export default Footer;