import * as React from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./style.css";

export function InputPassword(props) {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div style={{ width: "277px", padding: 0 }}>
      <FormControl
        sx={{ m: 0, width: "100%" }}
        variant="outlined"
        className="content"
      >
        <InputLabel color="black" htmlFor="outlined-adornment-password">
          {props.text}
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          value={props.value}
          onChange={(e) => props.setValue(e.target.value)}
          className="showPassword"
          endAdornment={
            <InputAdornment className="showPassword" position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label={props.text}
          color="black"
        />
      </FormControl>
    </div>
  );
}
