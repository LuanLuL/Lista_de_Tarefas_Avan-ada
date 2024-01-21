import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import "./style.css";

export function InputTipo(props) {
  return (
    <div className="formTipo">
      <FormControl disabled={!props.desabilitado ? false : props.desabilitado}>
        <FormLabel
          style={{ margin: 0 }}
          id="demo-row-radio-buttons-group-label"
          color="black"
          className="formTipo"
        >
          Categoria
        </FormLabel>
        <RadioGroup
          color="black"
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={props.value}
          onChange={(e) => props.setValue(e.target.value)}
        >
          <FormControlLabel
            color="black"
            value="Normal"
            control={<Radio color="black" />}
            label="Normal"
          />
          <FormControlLabel
            value="Pessoal"
            control={<Radio color="black" />}
            label="Pessoal"
            color="black"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
