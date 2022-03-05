import { combineReducers } from "redux";
import prodReducer from "./prodReducer";
import catReducer from "./catReducer";

const rootReducer = combineReducers({
  catReducer,
  prodReducer,
});

export default rootReducer;
