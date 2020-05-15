

import React from 'react';
import {render, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../components/header';

//jest cleans up the garbage around the test. 
afterEach(cleanup);

it('Header renders as it should be!', ()=>{
  const {asFragment} = render(<Header />);
  expect( asFragment()).toMatchSnapshot();
});


it( "inserts text in h1", ()=>{
  // jest-dom.
  const {getByTestId, getByText } = render(<Header />)
  expect(getByTestId('h1tag')).toHaveTextContent('temp');
  expect(getByText('temp')).toHaveClass('bla');
})