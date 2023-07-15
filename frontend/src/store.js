import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer } from "./reducers/userReducer";
import { moviesReducer } from "./reducers/movieReducer";
const reducer = combineReducers({
  user: userReducer,
  movies:moviesReducer,
});

const middleWare = [thunk];
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;