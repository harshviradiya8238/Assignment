import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { UserListReducer } from "../reducer/UserListReducer";

const reducer = combineReducers({
  userList: UserListReducer,
});

let initialState = {};
const middleware = [thunk];
const Store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default Store;
