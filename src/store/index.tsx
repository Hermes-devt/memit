
import {combineReducers} from 'redux';
import {dataReducer} from './data/reducer';


export const rootReducer = combineReducers({
  data: dataReducer,
})

export type RootState = ReturnType<typeof rootReducer>

