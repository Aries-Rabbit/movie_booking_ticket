import { combineReducers } from "redux";
import { BookingReducer } from "./BookingReducer";
import { CommentReducer } from "./CommentReducer";
import { LoadingReducer } from "./LoadingReducer";
import UserReducer from "./UserReducer";

export const rootReducer = combineReducers({
  UserReducer,
  LoadingReducer,
  CommentReducer,
  BookingReducer,
});
