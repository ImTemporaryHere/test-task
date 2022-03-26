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


export enum studentsSortingFields {
  name = 'name',
  class = 'class',
  score = 'score',
  speed = 'speed',
}

export type sortStudentsBy = studentsSortingFields.name | studentsSortingFields.class | studentsSortingFields.score | studentsSortingFields.speed | null;

type sortDirAsc = -1;
type sortDirDesc = 1;

export type sortStudentsDir = sortDirAsc | sortDirDesc | null;

export interface iGetStudentsRequestParams {
  page: number;
  size: number;
  search?: string;
  sortBy:  sortStudentsBy;
  sortDir: sortStudentsDir;

}


export enum StudentsActionTypes {
  SET_STUDENTS_LOADING = 'SET_STUDENTS_LOADING',

  FETCH_STUDENTS_SUCCESS = 'FETCH_STUDENTS_SUCCESS',

  FETCH_STUDENTS_ERROR = 'FETCH_STUDENTS_ERROR',

  SET_SELECTED_STUDENTS = 'SET_SELECTED_STUDENTS',

  SET_STUDENTS_SEARCH_INPUT_VALUE = 'SET_STUDENTS_SEARCH_INPUT_VALUE',

  SET_SORT_STUDENTS_BY = 'SET_SORT_STUDENTS_BY',
  SET_SORT_STUDENTS_DIR = 'SET_SORT_STUDENTS_DIR',
  SET_CURRENT_STUDENTS_PAGE = 'SET_CURRENT_STUDENTS_PAGE',
  SET_STUDENTS_ROWS_PER_PAGE = 'SET_STUDENTS_ROWS_PER_PAGE',
}


export interface iStudentsState {
  totalPages: number;
  students: iStudent[];
  loading: boolean;
  error: null | string;
  selectedStudents: iStudent['id'][];
  searchValueInput: string;
  sortBy: sortStudentsBy;
  sortDir: sortStudentsDir;
  currentPage: number,
  rowsPerPage: number,
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

interface iSetSelectedStudentsAction {
  type: StudentsActionTypes.SET_SELECTED_STUDENTS;
  payload: iStudent['id'][];
}

interface iSetSearchInputValue {
  type: StudentsActionTypes.SET_STUDENTS_SEARCH_INPUT_VALUE;
  payload: string;
}

interface iSetSortStudentsBy {
  type: StudentsActionTypes.SET_SORT_STUDENTS_BY;
  payload: sortStudentsBy
}

interface iSetSortStudentsDir {
  type: StudentsActionTypes.SET_SORT_STUDENTS_DIR;
  payload: sortStudentsDir;
}

interface iSetCurrentStudentsPage {
  type: StudentsActionTypes.SET_CURRENT_STUDENTS_PAGE;
  payload: number;
}

interface iSetStudentsRowsPerPage {
  type: StudentsActionTypes.SET_STUDENTS_ROWS_PER_PAGE;
  payload: number;
}









export type iStudentsAction = iSetStudentsLoadingAction |
  iFetchStudentsSuccessAction |
  iFetchUsersErrorAction |
  iSetSelectedStudentsAction |
  iSetSearchInputValue |
  iSetSortStudentsBy |
  iSetSortStudentsDir |
  iSetCurrentStudentsPage |
  iSetStudentsRowsPerPage