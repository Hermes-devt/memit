
import {SETDATA, SETSCHEDULE, DataActionTypes} from './types'

export function dataReducer(state: any = 0, action: DataActionTypes): any{
  switch( action.type ){
    case SETDATA:
      return (action.payload)
    case SETSCHEDULE:
        return (state.schedule = action.payload);
    default:
      return state;
  }
}

export default dataReducer;
