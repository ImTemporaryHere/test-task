// @ts-ignore
import styles from './styles.module.scss'
import React, {FC} from 'react';
import {iStudent} from "../../../types/Student";
import FilterSelect from "./filterSelect/FilterSelect";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import {styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import TestsResultsTable from "./TestsResutltsTable/TestsResultsTable";




const BootstrapInput = styled(TextField)(() => ({

  '& label': {
    extTransform: 'uppercase',
    color: '#C0C0C0',
    fontWeight: 400,
    fontsize: '12px',
    fontFamily: [
      'Rubik',
    ].join(','),
    top: '-14px',
    left: '2px',
  },

  '& .MuiInputBase-input': {
    padding: '0px',
    textTransform: 'uppercase',
    color: '#C0C0C0',
    fontWeight: 400,
    fontsize: '12px',
    fontFamily: [
      'Rubik',
    ].join(',')
  },
}));


interface IResultsMarkerProps {
  color: string,
  results: string
}

const ResultsMarker: FC<IResultsMarkerProps> = ({color, results}) => {
  return (
    <div style={{color: color}} className={styles['results-markers__marker']}>
      <div
        style={{
          backgroundColor: color,
          borderRadius: '40px',
          width: '12px',
          height: '12px',
          marginRight: '8px'
        }} />
      {results}
    </div>
  )
}






const CollapsedTable: FC<iStudent>  = ({name,id,tests,score,speed}) => {


  const [value, setValue] = React.useState<Date | null>(null);



  return (
    <div className={styles['content-container']}>
      <div className={styles['student-info-heading']}>
        <div className={styles['student-info-heading__data-key']}>
          STUDENT:
        </div>

        <div className={styles['student-info-heading__data-value']}>
          {name}
        </div>


        <div className={styles['student-info-heading__data-key']}>
          id:
        </div>

        <div className={styles['student-info-heading__data-value']}>
          {id}
        </div>
      </div>





      <div className={styles['filters-section']}>


        <div className={styles['filter-container']}>
          <FilterSelect inputLabel={'ALL CONCEPTS'} />
        </div>

        <div className={styles['filter-container']}>
          <FilterSelect inputLabel={'ALL SCORE'} />
        </div>

        <div className={styles['filter-container']}>
          <FilterSelect inputLabel={'ALL SPEED'} />
        </div>

        <div className={styles['filter-container']}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="SELECT PERIOD"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <BootstrapInput {...params} />}
            />
          </LocalizationProvider>
        </div>

      </div>



      <div className={styles['results-markers']}>

        <div className={styles['results-markers__row']}>
          <div className={styles['results-markers__heading']}>
            score
          </div>

          <ResultsMarker results={'90%+ accuracy'} color={'#4285F4'}/>
          <ResultsMarker results={'80 - 89% accuracy'} color={'#0F9D58'}/>
          <ResultsMarker results={'50 - 79% accuracy'} color={'#E2B534'}/>
          <ResultsMarker results={'below 50% accuracy'} color={'#DB4437'}/>
        </div>


        <div className={styles['results-markers__row']}>
          <div className={styles['results-markers__heading']}>
            speed
          </div>

          <ResultsMarker results={'above expected'} color={'#4285F4'}/>
          <ResultsMarker results={'as expected'} color={'#0F9D58'}/>
          <ResultsMarker results={'below expected'} color={'#DB4437'}/>
        </div>


      </div>




      <TestsResultsTable tests={tests}/>


      <div className={styles['average-results']}>
          <h4 className={styles['average-results__heading']}>
            Average
          </h4>

          <div className={styles['average-results__value_excellent']}>
            {score}
          </div>

          <div className={styles['average-results__value_excellent']}>
            {speed}
          </div>
      </div>



    </div>
  );
}

export default CollapsedTable;