import Toolbar from "@mui/material/Toolbar";
import SearchSection from "../../SearchSection/SearchSection";
import {IconButton, Tooltip, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import * as React from "react";

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

export default EnhancedTableToolbar