// @ts-ignore
import styles from './styles.module.scss'

import React from 'react';
import {styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {setRef} from "@mui/material";




const BootstrapInput = styled(InputBase)(() => ({

  '& .MuiInputBase-input': {
    textTransform: 'uppercase',
    color: '#5B5B5B',
    fontWeight: 700,
    fontsize: '14px',
    fontFamily: [
      'Rubik',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

const BootstrapFormControl = styled(FormControl)(() => ({

  'label': {
    top: '-8px',
    left: '2px',
    textTransform: 'uppercase',
    color: '#5B5B5B',
    fontWeight: 700,
    fontSize: '14px',
    fontFamily: [
      'Rubik',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));













 interface IfilterSelect {
  inputLabel: string
}

function FilterSelect({inputLabel}: IfilterSelect) {


  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };



  return (
    <BootstrapFormControl>
      <InputLabel id="demo-simple-select-label">{inputLabel}</InputLabel>
      <Select
        className={styles['filter-select']}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={age}
        label="Ageaaaaaaaaaa"
        onChange={handleChange}
        input={<BootstrapInput/>}
        style={{background: 'white', width: '154px'}}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </BootstrapFormControl>
  );
}

export default FilterSelect;