// @ts-ignore
import styles from './styles.module.scss'

import React from 'react';
import Table from "@mui/material/Table";
import {Checkbox, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {iTest} from "../../../../types/Test";
import {styled} from "@mui/material/styles";
import classNames from "classnames";


interface HeadCell {
  slug: string;
  disablePadding: boolean;
  columnName: string;
  width?: string;
  align?: 'right' | 'left'
}


const headCells: readonly HeadCell[] = [
  {
    slug: 'number',
    columnName: '#',
    disablePadding: true,
    align: 'left'
  },
  {
    slug: 'label',
    columnName: 'Test Label',
    disablePadding: true,
    align: 'left'
  },
  {
    slug: 'score',
    columnName: 'Score',
    disablePadding: true,
    align: 'left'
  },
  {
    slug: 'speed',
    columnName: 'Speed',
    disablePadding: true,
    align: 'left'
  },
  {
    slug: 'total',
    columnName: 'Total Q-ns',
    disablePadding: true,
    align: 'left'
  },
  {
    slug: 'expected',
    columnName: 'Exp. Speed',
    disablePadding: true,
    align: 'left'
  },
  {
    slug: 'concept',
    columnName: 'Concept',
    disablePadding: true,
    align: 'left'
  },

  {
    slug: 'date',
    columnName: 'Date',
    disablePadding: true,
    align: 'left'
  },
  {
    slug: 'absent',
    columnName: 'Absent',
    disablePadding: true,
    align: 'left'
  },

];



const StyledTableCell = styled(TableCell)(() => ({

  '&': {
    border: 'none',
    fontFamily: [
      'Rubik',
    ].join(','),

  },
}));



interface ITestsResultsTableProps {
  tests : iTest[]
}


const TestsResultsTable: React.FC<ITestsResultsTableProps> = ({tests}) => {




  return (
    <Table size={'small'}>
      <TableHead>
        <TableRow>
          {headCells.map((headCell)=>{
            return (
              <TableCell key={headCell.columnName} className={styles['cell-text']}>
                {headCell.columnName}
              </TableCell>
            )
          })}
        </TableRow>
      </TableHead>

      <TableBody>
        {tests.map((testDataRow,i)=>{

          const isAbsent = testDataRow.hasOwnProperty('abcent') ? testDataRow.abcent : testDataRow.absent;

          return (
            <TableRow key={testDataRow.label} >
              <StyledTableCell
                className={
                  classNames({
                    [styles['cell-text']]: true,
                    [styles['absent']]: isAbsent
                   })
                }
              >
                {i+1}.
              </StyledTableCell>

              <StyledTableCell className={
                classNames({
                  [styles['cell-text']]: true,
                  [styles['absent']]: isAbsent
                })
              } >
                {testDataRow.label}
              </StyledTableCell>


              <StyledTableCell className={
                classNames({
                  [styles['cell-text']]: true,
                  [styles['absent']]: isAbsent,
                  [styles['excellent-result']]: true,
                })
              } >
                {testDataRow.score}
              </StyledTableCell>

              <StyledTableCell className={
                classNames({
                  [styles['cell-text']]: true,
                  [styles['absent']]: isAbsent,
                  [styles['excellent-result']]: true,
                })
              } >
                {testDataRow.speed}
              </StyledTableCell>

              <StyledTableCell className={
                classNames({
                  [styles['cell-text']]: true,
                  [styles['absent']]: isAbsent
                })
              } >
                {testDataRow.total}
              </StyledTableCell>

              <StyledTableCell className={
                classNames({
                  [styles['cell-text']]: true,
                  [styles['absent']]: isAbsent
                })
              } >
                {testDataRow.expSpeed}
              </StyledTableCell>


              <StyledTableCell className={
                classNames({
                  [styles['cell-text']]: true,
                  [styles['absent']]: isAbsent
                })
              } >
                {testDataRow.concept}
              </StyledTableCell>

              <StyledTableCell className={
                classNames({
                  [styles['cell-text']]: true,
                  [styles['absent']]: isAbsent
                })
              } >
                {testDataRow.date}
              </StyledTableCell>


              <StyledTableCell className={
                classNames({
                  [styles['cell-text']]: true,
                  [styles['absent']]: isAbsent
                })
              } >
                <Checkbox  checked={isAbsent} color="default" />
              </StyledTableCell>


            </TableRow>
          )
        })}
      </TableBody>

    </Table>
  );
}

export default TestsResultsTable;