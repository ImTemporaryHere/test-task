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
import {Collapse, LinearProgress, styled} from "@mui/material";
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
// @ts-ignore
import pencilIcon from '../../assets/pencil-icon.svg'
// @ts-ignore
import statisticsIcon from '../../assets/statistics-icon.svg'
// @ts-ignore
import checkBoxIcon from "../../assets/checkbox.svg";
// @ts-ignore
import checkBoxIconActive from "../../assets/checkbox-active.svg";




const StyledTableCell = styled(TableCell)(()=>({
  '&': {
    border: 'none',
    fontFamily: 'Rubik',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '140%',
    color: '#828282',
    paddingRight: '12px',
    paddingLeft: '12px',
  }
}))

const StyledTableCellArchived = styled(StyledTableCell)(()=>({
  '&': {
    color: '#C0C0C0',
  }
}))

const Icon = () => {
  return <img src={checkBoxIcon} width={12} height={12} alt="" />
}

const IconActive = () => {
  return <img src={checkBoxIconActive} width={12} height={12} alt="" />
}




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
    setStudentsCurrentPage(1)
    fetchStudents(1,rowsPerPage,sortBy,sortDir,searchValueInput);
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


  const handleRowClick = (event: React.MouseEvent<HTMLTableRowElement>, studentRowId: iStudent['id']):void => {
    if((event.target as HTMLElement).getAttribute('type') === 'checkbox') {
      return
    }


    if(collapsedRowsId.includes(studentRowId)) {
      setCollapsedRowsId(collapsedRowsId.filter((rowId)=>rowId!==studentRowId))
    }
    else  {
      setCollapsedRowsId([...collapsedRowsId,studentRowId])
    }



  }


  const getColor = (score: string) : string =>{
    let color: string;


    if (parseInt(score) < 50) {
      color = '#DB4437'
    }
    else if (parseInt(score) >= 80) {
      color = '#0F9D58'
    }
    else if( parseInt(score) >= 90  ) {
      color = '#4285F4'
    }
    else {
      color = '#DB4437'
    }

    return color
  }






  useEffect(()=>{

    fetchStudents(currentPage,rowsPerPage,sortBy,sortDir,searchValueInput);

  },[])










  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2}} style={{position: 'relative'}}>


        <EnhancedTableToolbar numSelected={selectedStudents.length} />




        <TableContainer style={{padding: '0px 40px'}}>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size='small'
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

              <TableRow

                tabIndex={-1}
              >
                <StyledTableCell
                  component="th"
                  padding='none'
                  colSpan={8}
                  style={{height: '10px'}}
                >
                  {
                    loading && (
                      <LinearProgress />
                    )
                  }

                  {error && (
                    <h2>Error {error}</h2>
                  )}
                </StyledTableCell>


              </TableRow>


              {students
                .map((studentRow, index) => {
                  const isItemSelected = isSelected(studentRow.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const isOddNumber = index % 2 !== 0





                  return (

                    <React.Fragment key={studentRow.id}>

                      <TableRow
                        className={classNames({
                          [styles['table-row']]: true,
                          [styles['table-row__odd']]: isOddNumber,
                          [styles['table-row__selected']]: isItemSelected
                        })}
                        hover
                        onClick={(e)=>{
                          handleRowClick(e,studentRow.id)
                        }}
                        id={studentRow.id.toString()}
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                      >
                        <StyledTableCell padding="checkbox">
                          <Checkbox
                            onChange={(event)=>{

                              handleSelectCheckbox(event,studentRow.id)
                            }}
                            icon={<Icon />}
                            checkedIcon={<IconActive />}
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          id={labelId}
                          scope="row"
                        >
                          {studentRow.name}
                        </StyledTableCell>
                        <StyledTableCell>{studentRow.id}</StyledTableCell>
                        <StyledTableCell>{studentRow.class}</StyledTableCell>
                        <StyledTableCell style={{color: getColor(studentRow.score)}}>{studentRow.score}</StyledTableCell>
                        <StyledTableCell style={{color: getColor(studentRow.score)}} >{studentRow.speed}</StyledTableCell>
                        <StyledTableCell>{studentRow.parents.map(parent=><span key={parent}>{parent}</span>)}</StyledTableCell>
                        <StyledTableCell>


                          {
                            selectedStudents.includes(studentRow.id) ? (

                                <div className={styles['select-actions']}>

                                  <button className={styles['select-actions__icon-button']}>
                                    <img width={12} height={12} src={pencilIcon} alt="icon"/>
                                  </button>

                                  <button className={styles['select-actions__icon-button']}>
                                    <img width={12} height={12} src={statisticsIcon} alt="icon"/>
                                  </button>


                                  {
                                    collapsedRowsId.includes(studentRow.id) ?

                                      <KeyboardArrowUpIcon />
                                      :
                                      <KeyboardArrowDownIcon />
                                  }

                                </div>

                              )


                              :


                              (
                                <div className={styles['select-actions']}>
                                  {
                                    collapsedRowsId.includes(studentRow.id) ?

                                      <KeyboardArrowUpIcon style={{marginLeft: 'auto'}}/>
                                      :
                                      <KeyboardArrowDownIcon style={{marginLeft: 'auto'}}/>
                                  }
                                </div>
                              )
                          }

                        </StyledTableCell>

                      </TableRow>


                      <TableRow style={{ margin: 0,padding: 0 }}>
                        <StyledTableCell padding={'none'}  style={{padding: 0}} colSpan={8}>
                          <Collapse
                            in={collapsedRowsId.includes(studentRow.id)}
                            easing={'easy-in-out'}
                            timeout={{
                              appear: 500,
                              enter: 500,
                              exit: 500,
                            }}
                            appear={true}
                            exit={true}
                          >
                            <CollapsedTable {...studentRow}/>
                          </Collapse>
                        </StyledTableCell>
                      </TableRow>
                    </React.Fragment>


                  );
                })}












              <TableRow>
                <StyledTableCell padding={'none'} colSpan={8}>
                  <h3 className={styles['archived-heading']}>archived</h3>
                </StyledTableCell>
              </TableRow>









              {
                students.slice(0,2).map((student)=>{return {...student,id: student.id-0.01}})
                  .map((studentRow, index) => {
                    const isItemSelected = isSelected(studentRow.id);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    const isOddNumber = index % 2 === 0


                    return (

                      <React.Fragment key={studentRow.id}>


                        <TableRow
                          className={classNames(styles['table-row__archived'],styles['table-row'])}
                          hover
                          onClick={(e)=>{
                            handleRowClick(e,studentRow.id)
                          }}
                          id={studentRow.id.toString()}
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          selected={isItemSelected}
                        >
                          <StyledTableCellArchived padding="checkbox">
                            <Checkbox
                              icon={<Icon />}
                              checkedIcon={<IconActive />}
                              onChange={(event)=>{

                                handleSelectCheckbox(event,studentRow.id)
                              }}
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                'aria-labelledby': labelId,
                              }}
                            />
                          </StyledTableCellArchived>
                          <StyledTableCellArchived
                            component="th"
                            id={labelId}
                            scope="row"
                          >
                            {studentRow.name}
                          </StyledTableCellArchived>
                          <StyledTableCellArchived>{studentRow.id}</StyledTableCellArchived>
                          <StyledTableCellArchived>{studentRow.class}</StyledTableCellArchived>
                          <StyledTableCellArchived>{studentRow.score}</StyledTableCellArchived>
                          <StyledTableCellArchived>{studentRow.speed}</StyledTableCellArchived>
                          <StyledTableCellArchived>{studentRow.parents.map(parent=><span key={parent}>{parent}</span>)}</StyledTableCellArchived>
                          <StyledTableCellArchived>

                            {
                              selectedStudents.includes(studentRow.id) ? (

                                  <div className={styles['select-actions']}>

                                    <button className={styles['select-actions__icon-button']}>
                                      <img width={12} height={12} src={pencilIcon} alt="icon"/>
                                    </button>

                                    <button className={styles['select-actions__icon-button']}>
                                      <img width={12} height={12} src={statisticsIcon} alt="icon"/>
                                    </button>


                                    {
                                      collapsedRowsId.includes(studentRow.id) ?

                                        <KeyboardArrowUpIcon />
                                        :
                                        <KeyboardArrowDownIcon />
                                    }

                                  </div>

                                )


                                :


                                (
                                  <div className={styles['select-actions']}>
                                    {
                                      collapsedRowsId.includes(studentRow.id) ?

                                        <KeyboardArrowUpIcon style={{marginLeft: 'auto'}}/>
                                        :
                                        <KeyboardArrowDownIcon style={{marginLeft: 'auto'}}/>
                                    }
                                  </div>
                                )
                            }

                          </StyledTableCellArchived>

                        </TableRow>



                        <TableRow style={{ margin: 0,padding: 0 }}>
                          <StyledTableCell padding={'none'}  colSpan={8}>
                            <Collapse
                              in={collapsedRowsId.includes(studentRow.id)}
                              easing={'easy-in-out'}
                              timeout={{
                                appear: 500,
                                enter: 500,
                                exit: 500,
                              }}
                              appear={true}
                              exit={true}
                            >
                              <CollapsedTable {...studentRow}/>
                            </Collapse>
                          </StyledTableCell>
                        </TableRow>
                      </React.Fragment>



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
