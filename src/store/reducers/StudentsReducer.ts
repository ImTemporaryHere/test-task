import {iStudentsAction, iStudentsState, StudentsActionTypes} from "../../types/Student";

const initialState: iStudentsState = {
  totalPages: 1,
  students: [],
  loading: false,
  error: null,
  selectedStudents: [],
  searchValueInput: '',
  sortBy: null,
  sortDir: 1,
  currentPage: 1,
  rowsPerPage: 5
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

      case StudentsActionTypes.SET_STUDENTS_SEARCH_INPUT_VALUE: {
        return {
          ...state,
          searchValueInput: action.payload,
        }
      }



      case StudentsActionTypes.SET_SORT_STUDENTS_BY: {
        return {
          ...state,
          sortBy: action.payload,
        }
      }

      case StudentsActionTypes.SET_SORT_STUDENTS_DIR: {
        return {
          ...state,
          sortDir: action.payload,
        }
      }



      case StudentsActionTypes.SET_CURRENT_STUDENTS_PAGE: {
        return {
          ...state,
          currentPage: action.payload,
        }
      }

      case StudentsActionTypes.SET_STUDENTS_ROWS_PER_PAGE: {
        return {
          ...state,
          rowsPerPage: action.payload,
        }
      }


      default : return state;


    }
}