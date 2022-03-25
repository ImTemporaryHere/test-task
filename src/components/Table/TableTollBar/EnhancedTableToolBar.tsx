import Toolbar from "@mui/material/Toolbar";
import SearchSection from "../../SearchSection/SearchSection";
import {IconButton, Tooltip, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import * as React from "react";
// @ts-ignore
import styles from './styles.module.scss';

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
              {numSelected} selected

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

export default EnhancedTableToolbar