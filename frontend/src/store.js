import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer, profileReducer,forgotPasswordReducer,resetPasswordReducer } from "./reducers/userReducer";
import { moviesReducer } from "./reducers/movieReducer";
const reducer = combineReducers({
  user: userReducer,
  movies: moviesReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
});

let initialState = {};

const middleWare = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;