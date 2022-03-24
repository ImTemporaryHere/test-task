import {Dispatch} from "redux";
import {
  iGetStudentsRequestParams, iStudent,
  iStudentsAction,
  iStudentsApiResponse, sortBy, sortDir,
  StudentsActionTypes
} from "../../types/Student";
import axios, {AxiosPromise, AxiosResponse} from "axios";

const usersApi = 'https://test-task-j.herokuapp.com/data'


interface iFetchStudentsProps {
  page: iGetStudentsRequestParams['page'];
  size: iGetStudentsRequestParams['size'];
}

type FetchStudents = (
  page: iGetStudentsRequestParams['page'],
  size: iGetStudentsRequestParams['size'],
  sortBy: sortBy,
  sortDir: sortDir,
)=>(dispatch: Dispatch<iStudentsAction>)=>void

export const fetchStudents: FetchStudents = (page, size,sortBy,sortDir) => {
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
          sortDir
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