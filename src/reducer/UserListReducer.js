import {
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,

  } from '../constant/Constant'
  
  const initialstate = {
    data: null,
    error: null,
  };
  const successful = (state, action) => {


    return {
      data: action.data,
    };
  };
  
  const fail = (state, action) => {
    return {
      error: action.error,
    };
  };

  export const UserListReducer = (state=initialstate , action) => {
   
    switch (action.type) {
    case USER_LIST_SUCCESS:
      return successful(state, action);
    case USER_LIST_FAIL:
      return fail(state, action);

    default:
      return state;
  }
  }




  