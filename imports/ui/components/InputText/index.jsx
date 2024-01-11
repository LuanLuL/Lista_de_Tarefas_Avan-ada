import * as React from "react";
import TextField from "@mui/material/TextField";
import "./style.css";

export function InputText(props) {
  return (
    <TextField
      className="inputText"
      label={props.text}
      variant="outlined"
      color="black"
      value={props.value}
      onChange={(e) => props.setValue(e.target.value)}
    />
  );
}
