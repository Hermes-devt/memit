
import React from 'react';
import Clickers from '../components/clickers';
import {render, cleanup, getByTestId, fireEvent, waitForElement} from '@testing-library/react';
import '@testing-library/jest-dom';


afterEach(cleanup);

it('renders as it should do!', ()=>{
  const {getByTestId} = render(<Clickers />);
  expect(getByTestId('count')).toHaveTextContent('0');
});

it('increments the count', ()=>{
  const {getByTestId} = render(<Clickers />);
  fireEvent.click( getByTestId('up'));
  expect(getByTestId('count')).toHaveTextContent(1);
});

it('decrement the count is delayed', async ()=>{
  const {getByText} = render(<Clickers />);
  fireEvent.click( getByText('Down'));
  // maximum test time of like 4.5seconds because jest have a a max limit 5s.
  const countSpan = await waitForElement( ()=> getByText('-1'));
  expect(countSpan).toHaveTextContent(-1);
});