import * as React from 'react';
// @ts-ignore
import styles from './styles.module.scss';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
// @ts-ignore
import DeleteIcon from '@mui/icons-material/Delete';
// @ts-ignore
import FilterListIcon from '@mui/icons-material/FilterList';
import {Collapse, LinearProgress} from "@mui/material";
import {iStudent, sortStudentsBy, sortStudentsDir} from "../../types/Student";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useAction} from "../../hooks/useAction";
import {useEffect, useState} from "react";
import EnhancedTableHead from "./TableHead/TableHead";
import EnhancedTableToolbar from "./TableTollBar/EnhancedTableToolBar";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// @ts-ignore
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CollapsedTable from "./CollapsedTable/CollapsedTable";
import classNames from "classnames";











export default function EnhancedTable() {
  const {
    students,
    error,
    loading,
    totalPages,
    selectedStudents,
    searchValueInput,
    sortBy,
    sortDir,
    currentPage,
    rowsPerPage
  } = useTypedSelector(state=>state.students)


  const {
    fetchStudents,
    setSelectedStudents,
    setSortStudentsBy,
    setSortStudentsDir,
    setStudentsCurrentPage,
    setStudentsRowsPerPage
  } = useAction()



  const [collapsedRowsId,setCollapsedRowsId] = useState<iStudent['id'][]>([])





  const handleRequestSort = (
    sortBy:sortStudentsBy, sortDir:sortStudentsDir
  ) => {
    setSortStudentsBy(sortBy);
    setSortStudentsDir(sortDir);
    fetchStudents(currentPage,rowsPerPage,sortBy,sortDir,searchValueInput);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = students.map((n) => n.id);
      setSelectedStudents(newSelecteds);
      return;
    }
    setSelectedStudents([]);
  };

  const handleSelectCheckbox = (event: React.ChangeEvent, id: number) => {
    const selectedIndex = selectedStudents.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedStudents, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedStudents.slice(1));
    } else if (selectedIndex === selectedStudents.length - 1) {
      newSelected = newSelected.concat(selectedStudents.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedStudents.slice(0, selectedIndex),
        selectedStudents.slice(selectedIndex + 1),
      );
    }

    setSelectedStudents(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setStudentsCurrentPage(newPage+1);
    fetchStudents(newPage+1,rowsPerPage,sortBy,sortDir,searchValueInput);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {

    const size = parseInt(event.target.value, 10)

    setStudentsRowsPerPage(size);
    setStudentsCurrentPage(1);
    fetchStudents(1,size,sortBy,sortDir, searchValueInput);

  };



  const isSelected = (id: number) => selectedStudents.indexOf(id) !== -1;




  useEffect(()=>{

    fetchStudents(currentPage,rowsPerPage,sortBy,sortDir,searchValueInput);

  },[])










  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2}} style={{position: 'relative'}}>


        <EnhancedTableToolbar numSelected={selectedStudents.length} />




        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size='medium'
          >
            <EnhancedTableHead
              numSelected={selectedStudents.length}
              sortBy={sortBy}
              sortDir={sortDir}
              onSelectAllClick={handleSelectAllClick}
              handleSortingRequest={handleRequestSort}
              rowCount={students.length}
            />

            <TableBody>

              {(loading || error) && (
                <TableRow

                  tabIndex={-1}
                >
                  <TableCell
                    component="th"
                    padding='none'
                    colSpan={8}
                  >
                    {
                      loading && (
                        <LinearProgress />
                      )
                    }

                    {error && (
                      <h2>Error {error}</h2>
                    )}
                  </TableCell>



                </TableRow>
              )}


              {students
                .map((studentRow, index) => {
                  const isItemSelected = isSelected(studentRow.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const isOddNumber = index % 2 === 0

                  return (

                    <React.Fragment key={studentRow.id+Math.random().toString()}>

                      <TableRow
                        className={classNames({
                          [styles['table-row']]: true,
                          [styles['table-row__odd']]: isOddNumber
                        })}
                        hover
                        onClick={(event) => {
                          if((event.target as HTMLElement).getAttribute('type') === 'checkbox') {
                            return
                          }


                          if(collapsedRowsId.includes(studentRow.id)){
                            setCollapsedRowsId(collapsedRowsId.filter((rowId)=>rowId!==studentRow.id))
                          }
                          else  {
                            setCollapsedRowsId([...collapsedRowsId,studentRow.id])
                          }



                        }}
                        id={studentRow.id.toString()}
                        aria-checked={isItemSelected}
                        tabIndex={-1}

                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            onChange={(event)=>{

                              handleSelectCheckbox(event,studentRow.id)
                            }}
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                        >
                          {studentRow.name}
                        </TableCell>
                        <TableCell>{studentRow.id}</TableCell>
                        <TableCell>{studentRow.class}</TableCell>
                        <TableCell>{studentRow.score}</TableCell>
                        <TableCell>{studentRow.speed}</TableCell>
                        <TableCell>{studentRow.parents.map(parent=><span key={parent}>{parent}</span>)}</TableCell>
                        <TableCell>
                          {
                            collapsedRowsId.includes(studentRow.id) ?
                              <KeyboardArrowUpIcon/>
                              :
                              <KeyboardArrowDownIcon/>
                          }
                        </TableCell>

                      </TableRow>


                      <TableRow style={{ margin: 0,padding: 0 }}>
                        <TableCell padding={'none'}  colSpan={8}>
                          <Collapse in={collapsedRowsId.includes(studentRow.id)} timeout="auto" unmountOnExit>
                            <CollapsedTable {...studentRow}/>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>


                  );
                })}












              <TableRow>
                <TableCell padding={'none'} colSpan={8}>
                  <h3 className={styles['archived-heading']}>archived</h3>
                </TableCell>
              </TableRow>









              {
                students.slice(0,2)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        className={styles['table-row-archived']}
                        hover
                        onClick={(event) => {
                          if((event.target as HTMLElement).getAttribute('type') === 'checkbox') {
                            return
                          }
                          console.log('row clicked')
                        }}
                        id={row.id.toString()}
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id+Math.random().toString()}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            onChange={(event)=>{

                              handleSelectCheckbox(event,row.id)
                            }}
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                        >
                          {row.name}
                        </TableCell>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.class}</TableCell>
                        <TableCell>{row.score}</TableCell>
                        <TableCell>{row.speed}</TableCell>
                        <TableCell>{row.parents.map(parent=><span key={parent}>{parent}</span>)}</TableCell>
                        <TableCell><KeyboardArrowDownIcon/></TableCell>

                      </TableRow>
                    );
                  })}


            </TableBody>
          </Table>
        </TableContainer>


        <div style={{display: 'flex',justifyContent: 'center'}}>
          <TablePagination
            rowsPerPageOptions={[2, 5, 10]}
            component="div"
            count={totalPages*rowsPerPage}
            rowsPerPage={rowsPerPage}
            page={currentPage-1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </Paper>
    </Box>
  );
}
