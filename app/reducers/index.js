import { combineReducers } from "redux";
import AuthReducer from "./auth";
import ServiceReducer from "./service";
import OptionReducer from "./option";
import OriginReducer from "./origin";


export default combineReducers({
  auth: AuthReducer,
  plan:ServiceReducer,
  option: OptionReducer,
  origin: OriginReducer
});
