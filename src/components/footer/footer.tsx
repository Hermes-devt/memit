
import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import NewsLetter from './newsletter';
import Contact from './contact';
// import img from '../../IMG/topbarBG.svg';
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
    paddingTop: 15,
    // backgroundImage: "url(" + img + ")",
    // backgroundSize: 'cover',
    // backgroundRepeat: 'no-repeat',
    color: 'white', 
    backgroundColor: '#242424',
    paddingBottom: 20,
  },
}
export default Footer;