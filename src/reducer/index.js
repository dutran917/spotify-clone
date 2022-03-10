import listTrackReducer from "./list";
import { combineReducers } from "redux";
const rootReducer = combineReducers({
    listTrack: listTrackReducer
})
export default rootReducer