
// import React from 'react';
import {SETDATA, DataActionTypes, SETSCHEDULE } from './types';

// export const setData= (data: dataType): DataActionTypes =>{
export const setData= (data:any): DataActionTypes =>{
  return({
    type: SETDATA,
    payload: data
  })
}

export const setSchedule = (data: any) =>{
  return({
    type: SETSCHEDULE,
    payload: data
  })
}
export default { setData, setSchedule };
