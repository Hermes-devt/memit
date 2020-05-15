
import React from 'react';
import {render, cleanup} from '@testing-library/react';
import '@testing-library/jest-dom';
import About from '../components/footer/about';

afterEach(cleanup);

it('expects it to render!', ()=>{
  const {asFragment} = render(<About/>);
  expect( asFragment() ).toMatchSnapshot();
})
