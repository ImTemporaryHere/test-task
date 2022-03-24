import * as React from 'react';
// @ts-ignore
import styles from './styles.module.scss';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
// @ts-ignore
import DeleteIcon from '@mui/icons-material/Delete';
// @ts-ignore
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import Toolbar from '@mui/material/Toolbar';
import {Typography,Tooltip, IconButton} from "@mui/material";
import {iStudent, sortBy, sortDir, sortingFields} from "../../types/Student";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {useAction} from "../../hooks/useAction";
import {useEffect} from "react";
import SearchSection from "../SearchSection/SearchSection";



const students: iStudent[] = [
  {
    "name": "Adam Filler",
    "id": 421136,
    "class": "1C",
    "score": "45%",
    "speed": "Below Expected",
    "parents": [
      "Antony Filler",
      "Janelle Filler"
    ],
    "tests": [
      {
        "label": "Average 1-100",
        "score": 95,
        "speed": "1h 12m 00s",
        "total": 100,
        "expSpeed": "1h 00m 00s",
        "concept": "Multiplication",
        "date": "APR 30 2021",
        "abcent": false
      },
      {
        "label": "Average 1-10",
        "score": null,
        "speed": null,
        "total": 10,
        "expSpeed": "0h 30m 00s",
        "concept": "Multiplication",
        "date": "APR 30 2021",
        "absent": true
      }
    ]
  },
];



interface HeadCell {
  slug: string;
  disablePadding: boolean;
  columnName: string;
  width?: string;
  align?: 'right' | 'left'
}

const headCells: readonly HeadCell[] = [
  {
    slug: sortingFields.name,
    columnName: 'Name',
    disablePadding: false,
    width: '300px',
    align: 'left'
  },
  {
    slug: 'id',
    columnName: 'ID',
    disablePadding: false,
    width: '96px'
  },
  {
    slug: sortingFields.class,
    columnName: 'Class',
    disablePadding: false,
  },
  {
    slug: sortingFields.score,
    columnName: 'Av. Score , %',
    disablePadding: false,
  },
  {
    slug: sortingFields.speed,
    columnName: 'Av. speed',
    disablePadding: false,
  },
  {
    slug: 'parents',
    columnName: 'Parents',
    disablePadding: false,
    width: '530px'
  },

];

interface EnhancedTableHeadProps {
  numSelected: number;
  handleSortingRequest: (sortBy:sortBy,sortDir: sortDir) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
  sortBy: sortBy;
  sortDir: sortDir;
}



interface EnhancedTableToolbarProps {
  numSelected: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected } = props;


  if(numSelected > 0){

  }

  return (
    <Toolbar
      style={{minHeight: '54px'}}
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: numSelected > 0 ? '#C0C0C0': 'white'
        }),
      }}
    >
      {
        numSelected <= 0 ? (
          <SearchSection/>
        )
          :
          (
            <>
              <Typography
                sx={{ flex: '1 1 100%' }}
                color="inherit"
                variant="subtitle1"
                component="div"
              >
                {numSelected} selected
              </Typography>
              <Tooltip title="Delete">
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </>


          )

      }

    </Toolbar>
  );
};











function EnhancedTableHead(props: EnhancedTableHeadProps) {
  const { onSelectAllClick,  numSelected, rowCount,handleSortingRequest,sortBy,sortDir } = props;


  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>

        {headCells.map((headCell,i) => (
          <TableCell
            style={{width: headCell.width || 'auto'}}
            key={headCell.columnName}
            align={headCell.align || 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={sortDir===1 ? 'asc': 'desc'}
          >

            {headCell.slug in sortingFields ? (

              <TableSortLabel
                active={sortBy===headCell.slug}
                direction={sortDir===-1 ? 'asc': 'desc'}
                onClick={()=>{
                  console.log('sorting')
                  handleSortingRequest(headCell.slug as sortingFields ,sortDir===1 ? -1: 1)
                }}
              >
                {headCell.columnName}
              </TableSortLabel>

            )
              :

              headCell.columnName


            }

          </TableCell>
        ))}

      </TableRow>
    </TableHead>
  );
}



export default function EnhancedTable() {
  const {students, error, loading, totalPages,selectedStudents} = useTypedSelector(state=>state.students)
  const {fetchStudents,setSelectedStudents} = useAction()



  const [sortDir, setSortDir] = React.useState<sortDir>(1);
  const [sortBy, setSortBy] = React.useState<sortBy>(null);
  const [currentPage, setCurrentPage] = React.useState(1);

  const [sizeRowsOfPage, setSizeRowsOfPage] = React.useState(2);

  const handleRequestSort = (
    sortBy:sortBy,sortDir:sortDir
  ) => {
    setSortBy(sortBy);
    setSortDir(sortDir);
    fetchStudents(currentPage,sizeRowsOfPage,sortBy,sortDir);
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
    setCurrentPage(newPage+1);
    fetchStudents(newPage+1,sizeRowsOfPage,sortBy,sortDir);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {

    const size = parseInt(event.target.value, 10)

    setSizeRowsOfPage(size);
    setCurrentPage(1);
    fetchStudents(1,size,sortBy,sortDir);

  };



  const isSelected = (id: number) => selectedStudents.indexOf(id) !== -1;




  useEffect(()=>{
    fetchStudents(currentPage,sizeRowsOfPage,null,null)
  },[])

  if(loading) {
    return <div>please wait</div>
  }

  if (error) return <h1>Ошибка {error}</h1>

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

              {students
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      className={styles['table-row']}
                      hover
                      onClick={(event) => {
                        if((event.target as HTMLElement).getAttribute('type') === 'checkbox') {
                          return
                        }
                        console.log('row clicked')
                      }}
                      id={row.name}
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
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
            count={totalPages*sizeRowsOfPage}
            rowsPerPage={sizeRowsOfPage}
            page={currentPage-1}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </Paper>
    </Box>
  );
}
