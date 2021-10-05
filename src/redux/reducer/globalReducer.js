import ActionType from './globalActionType';
import {combineReducers} from 'redux'

const initTOKEN = null;

const TOKEN = (state = initTOKEN, action) => {
  switch(action.type){
    case ActionType.TOKEN_REDUCER : {
      return {
        ...state,
        initTOKEN : action.value
      }
    }
    default : 
      return state
  }
}

const initUSER = {}

const USER = (state = initUSER, action) => {
  switch(action.type){
    case ActionType.USER_REDUCER : {
      return {
        ...state,
        initUSER : action.value
      }
    }
    default : 
      return state
  }
}


const rootReducer = combineReducers({
  TOKEN,
  USER
})



export default rootReducer;