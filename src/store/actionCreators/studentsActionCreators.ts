import {Dispatch} from "redux";
import {
  iGetStudentsRequestParams,
  iStudent,
  iStudentsAction,
  iStudentsApiResponse,
  sortStudentsBy,
  sortStudentsDir,
  StudentsActionTypes
} from "../../types/Student";
import axios from "axios";

const usersApi = 'https://test-task-j.herokuapp.com/data'


type FetchStudents = (
  page: iGetStudentsRequestParams['page'],
  size: iGetStudentsRequestParams['size'],
  sortBy: sortStudentsBy,
  sortDir: sortStudentsDir,
  search: string | null
)=>(dispatch: Dispatch<iStudentsAction>)=>void

export const fetchStudents: FetchStudents = (
  page, size,sortBy,sortDir,search
) => {

  console.log('fetching')

  return async (dispatch: Dispatch<iStudentsAction>)=>{
    try {
      dispatch({
        type: StudentsActionTypes.SET_STUDENTS_LOADING,
        payload: true
      })

      const response = await axios.get<iStudentsApiResponse>(usersApi,{
        params: {
          page,
          size,
          sortBy,
          sortDir,
          search
        }
      })

      dispatch({
        type: StudentsActionTypes.FETCH_STUDENTS_SUCCESS,
        payload: response.data
      })

      dispatch({
        type: StudentsActionTypes.SET_STUDENTS_LOADING,
        payload: false
      })

    }

    catch (e) {
      dispatch({
        type: StudentsActionTypes.SET_STUDENTS_LOADING,
        payload: false
      });
      dispatch({
        type: StudentsActionTypes.FETCH_STUDENTS_ERROR,
        payload: `An error ${(e as Error).message } happened during students loading `
      })
    }
  }
}

export const setSelectedStudents = (payload: iStudent['id'][])=>{
  return (dispatch: Dispatch<iStudentsAction>) => {
    dispatch({
      type: StudentsActionTypes.SET_SELECTED_STUDENTS,
      payload
    })
  }
}

export const setSearchInputValue = (payload: string)=>{
  return (dispatch: Dispatch<iStudentsAction>) => {
    dispatch({
      type: StudentsActionTypes.SET_STUDENTS_SEARCH_INPUT_VALUE,
      payload
    })
  }
}

export const setSortStudentsBy = (payload: sortStudentsBy)=>{
    return (dispatch: Dispatch<iStudentsAction>) => {
      dispatch({
        type: StudentsActionTypes.SET_SORT_STUDENTS_BY,
        payload
      })
    }
}


export const setSortStudentsDir = (payload: sortStudentsDir)=>{
  return (dispatch: Dispatch<iStudentsAction>) => {
    dispatch({
      type: StudentsActionTypes.SET_SORT_STUDENTS_DIR,
      payload
    })
  }
}

export const setStudentsCurrentPage = (payload: number)=>{
  return (dispatch: Dispatch<iStudentsAction>) => {
    dispatch({
      type: StudentsActionTypes.SET_CURRENT_STUDENTS_PAGE,
      payload
    })
  }
}


export const setStudentsRowsPerPage = (payload: number)=>{
  return (dispatch: Dispatch<iStudentsAction>) => {
    dispatch({
      type: StudentsActionTypes.SET_STUDENTS_ROWS_PER_PAGE,
      payload
    })
  }
}