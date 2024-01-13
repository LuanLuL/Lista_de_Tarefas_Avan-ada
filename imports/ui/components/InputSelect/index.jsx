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

{
  /* <InputSelect
  text="Idade"
  value={userIdade === 0 ? "" : userIdade}
  setValue={(textInputSelect) => setUserIdade(textInputSelect)}
>
  {Array.from({ length: 88 }, (_, index) => index + 12).map(
    (item) => (
      <MenuItem key={item} value={item}>
        {item}
      </MenuItem>
    )
  )}
</InputSelect> */
}
