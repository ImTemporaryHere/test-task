import {combineReducers} from "redux";
import {studentsReducer} from "./StudentsReducer";

export const rootReducer = combineReducers({
  students: studentsReducer,
})

export type RootState = ReturnType<typeof rootReducer>