import {iTest} from "./Test";

export interface iStudent {
  name: string;
  id: number;
  class: string;
  score: string;
  speed: string;
  parents: string[];
  tests: iTest[];
}


enum sortingFields {
  name = 'name',
  class = 'class',
  score = 'score',
  speed = 'speed',
}

type sortBy = sortingFields.name | sortingFields.class | sortingFields.score | sortingFields.speed;

type sortDirAsc = -1;
type sortDirDesc = 1;

export interface iGetStudentsRequestParams {
  page: number;
  size: number;
  search?: string;
  sortBy?:  sortBy;
  sortDir?: sortDirAsc | sortDirDesc;

}


export enum StudentsActionTypes {
  SET_STUDENTS_LOADING = 'SET_STUDENTS_LOADING',
  FETCH_STUDENTS_SUCCESS = 'FETCH_STUDENTS_SUCCESS',
  FETCH_STUDENTS_ERROR = 'FETCH_STUDENTS_ERROR',
}


export interface iStudentsState {
  totalPages: number | null;
  currentPage: number;
  currentSize: number;
  students: iStudent[];
  loading: boolean;
  error: null | string;
}

interface iSetStudentsLoadingAction {
 type: StudentsActionTypes.SET_STUDENTS_LOADING;
 payload: boolean;
}

export interface iStudentsApiResponse {
  totalPages: number,
  data: iStudent[],
}

interface iFetchStudentsSuccessAction {
  type: StudentsActionTypes.FETCH_STUDENTS_SUCCESS;
  payload: iStudentsApiResponse;
}

interface iFetchUsersErrorAction {
  type: StudentsActionTypes.FETCH_STUDENTS_ERROR;
  payload: string;
}

export type iStudentsAction = iSetStudentsLoadingAction | iFetchStudentsSuccessAction | iFetchUsersErrorAction