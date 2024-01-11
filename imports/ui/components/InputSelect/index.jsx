import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./style.css";

export function InputSelect(props) {
  return (
    <Box sx={{ minWidth: 277 }}>
      <FormControl color="black" fullWidth className="selectInput">
        <InputLabel id="demo-simple-select-label">{props.text}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.value}
          label={props.text}
          onChange={(e) => props.setValue(e.target.value)}
        >
          {props.children}
        </Select>
      </FormControl>
    </Box>
  );
}
