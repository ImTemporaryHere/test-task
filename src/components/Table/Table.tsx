import * as React from 'react';
import { alpha } from '@mui/material/styles';
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
import {iStudent} from "../../types/Student";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {useAction} from "../../hooks/useAction";
import {useEffect} from "react";



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
  disablePadding: boolean;
  columnName: string;
  width?: string;
  align?: 'right' | 'left'
}

const headCells: readonly HeadCell[] = [
  {
    columnName: 'Name',
    disablePadding: false,
    width: '300px',
    align: 'left'
  },
  {
    columnName: 'ID',
    disablePadding: false,
    width: '96px'
  },
  {
    columnName: 'Class',
    disablePadding: false,
  },
  {
    columnName: 'Av. Score , %',
    disablePadding: false,
  },
  {
    columnName: 'Av. speed',
    disablePadding: false,
  },
  {
    columnName: 'Parents',
    disablePadding: false,
    width: '530px'
  },

];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}



interface EnhancedTableToolbarProps {
  numSelected: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected } = props;

  return (
    <Toolbar
      style={{minHeight: '54px', position: 'absolute',zIndex: 1,top: '-54px', width: '100%'}}
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor:  '#C0C0C0'
        }),
      }}
    >
      {numSelected > 0 && (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      )}
      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )
      }
    </Toolbar>
  );
};











function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick,  numSelected, rowCount } = props;


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

        {headCells.map((headCell) => (
          <TableCell
            style={{width: headCell.width || 'auto'}}
            key={headCell.columnName}
            align={headCell.align || 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            /*sortDirection={orderBy === headCell.columnName ? order : false}*/
          >
            <TableSortLabel
              /*active={orderBy === headCell.columnName}
              direction={orderBy === headCell.columnName ? order : 'asc'}*/
              onClick={()=>{
                console.log('sorting')
              }}
            >
              {headCell.columnName}
              {'name' === headCell.columnName ? (
                <Box component="span" sx={visuallyHidden}>
                  {'desc' === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}

      </TableRow>
    </TableHead>
  );
}



export default function EnhancedTable() {
  const {students, error, loading, totalPages, currentPage , currentSize,selectedStudents} = useTypedSelector(state=>state.students)
  const {fetchStudents,setSelectedStudents} = useAction()



  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string,
  ) => {
    console.log('sorting request')
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
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



  const isSelected = (id: number) => selectedStudents.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty students.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - students.length) : 0;


  useEffect(()=>{
    fetchStudents(1,5)
  },[])

  if(loading) {
    return <div>please wait</div>
  }

  if (error) return <h1>Ошибка {error}</h1>

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }} style={{position: 'relative'}}>


        {
          selectedStudents.length > 0 && (
            <EnhancedTableToolbar numSelected={selectedStudents.length} />
          )
        }



        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size='medium'
          >
            <EnhancedTableHead
              numSelected={selectedStudents.length}
              /*orderBy={orderBy}*/
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={students.length}
            />
            <TableBody>

              {students
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
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
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={students.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
