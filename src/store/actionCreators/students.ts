import {Dispatch} from "redux";
import {
  iGetStudentsRequestParams,
  iStudentsAction,
  iStudentsApiResponse,
  StudentsActionTypes
} from "../../types/Student";
import axios from "axios";

const usersApi = 'https://test-task-j.herokuapp.com/data'

export const fetchStudents = (page: iGetStudentsRequestParams['page'], size: iGetStudentsRequestParams['size']) => {
  return async (dispatch: Dispatch<iStudentsAction>)=>{
    try {
      dispatch({
        type: StudentsActionTypes.SET_STUDENTS_LOADING,
        payload: true
      })

      const response = await axios.get<iStudentsApiResponse>(usersApi,{
        params: {
          page,
          size
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