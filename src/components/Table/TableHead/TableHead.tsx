import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import {sortStudentsBy, sortStudentsDir, studentsSortingFields} from "../../../types/Student";
import TableSortLabel from "@mui/material/TableSortLabel";
import * as React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";





interface HeadCell {
  slug: string;
  disablePadding: boolean;
  columnName: string;
  width?: string;
  align?: 'right' | 'left'
}

export const headCells: readonly HeadCell[] = [
  {
    slug: studentsSortingFields.name,
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
    slug: studentsSortingFields.class,
    columnName: 'Class',
    disablePadding: false,
  },
  {
    slug: studentsSortingFields.score,
    columnName: 'Av. Score , %',
    disablePadding: false,
  },
  {
    slug: studentsSortingFields.speed,
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
  handleSortingRequest: (sortBy:sortStudentsBy, sortDir: sortStudentsDir) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
  sortBy: sortStudentsBy;
  sortDir: sortStudentsDir;
}









export default function EnhancedTableHead(props: EnhancedTableHeadProps) {
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

            {headCell.slug in studentsSortingFields ? (

                <TableSortLabel
                  active={sortBy===headCell.slug}
                  direction={sortDir===-1 ? 'asc': 'desc'}
                  onClick={()=>{
                    console.log('sorting')
                    handleSortingRequest(headCell.slug as studentsSortingFields ,sortDir===1 ? -1: 1)
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

        <TableCell><KeyboardArrowDownIcon/></TableCell>

      </TableRow>
    </TableHead>
  );
}