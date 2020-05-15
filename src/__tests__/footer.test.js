
import React from 'react';
import {render, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../components/footer/footer';

//jest cleans up the garbage around the test. 
afterEach(cleanup);

it('Header renders as it should be!', ()=>{
  const {asFragment} = render(<Footer />);
  expect( asFragment()).toMatchSnapshot();
});