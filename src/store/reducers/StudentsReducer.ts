import {iStudentsAction, iStudentsState, StudentsActionTypes} from "../../types/Student";

const initialState: iStudentsState = {
  totalPages: null,
  currentPage: 1,
  currentSize: 5,
  students: [],
  loading: false,
  error: null
}


export const studentsReducer = (state = initialState, action: iStudentsAction): iStudentsState => {
    switch (action.type) {

      case StudentsActionTypes.SET_STUDENTS_LOADING: {
        return {...state,loading: action.payload}
      }

      case StudentsActionTypes.FETCH_STUDENTS_SUCCESS: {
        return {
          ...state,
          students: action.payload.data,
          totalPages: action.payload.totalPages,
        }
      }


      case StudentsActionTypes.FETCH_STUDENTS_ERROR: {
        return {
          ...state,
          error: action.payload,
        }
      }


      default : return state;


    }
}