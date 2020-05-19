import React, { useEffect} from 'react';
import Footer from './components/footer/footer';
import Navbar from './components/navbar/';
import ContentArea from './components/contentarea/contentarea';
import {init} from './js/init';
import {useState} from 'react';
import {UserData} from './interfaces';

import {useSelector, useDispatch} from 'react-redux';
import storage from './store/data/action'
import HelloWorld from './components/header';

export function App(){
  const [data, setData]: [UserData | null, any] = useState(null);
  const Data = useSelector((state:any)=> state.data);
  const dispatch = useDispatch();

  useEffect( ()=>{
    let data = init();
    // localStorage.setItem('memBackup', JSON.stringify(data));
    // let data:any = JSON.parse( localStorage.getItem('memBackup') || "");
    setData(data);
    dispatch( storage.setData(data) );
  },[]); //eslint-disable-line
  
  return(
    <div>
      {/* <Helloworld>Hello word</HelloWorld> */}
      {Data && <Navbar /> }
      {data && <ContentArea data={data} /> }
      <Footer /> 
    </div>
  )
}

 
export default App;
