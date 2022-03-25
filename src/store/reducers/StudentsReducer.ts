import {iStudentsAction, iStudentsState, StudentsActionTypes} from "../../types/Student";

const initialState: iStudentsState = {
  totalPages: 1,
  students: [],
  loading: false,
  error: null,
  selectedStudents: [],
  searchValueInput: ''
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

      case StudentsActionTypes.SET_SELECTED_STUDENTS: {
        return {
          ...state,
          selectedStudents: action.payload,
        }
      }

      case StudentsActionTypes.SET_SEARCH_INPUT_VALUE: {
        return {
          ...state,
          searchValueInput: action.payload,
        }
      }


      default : return state;


    }
}