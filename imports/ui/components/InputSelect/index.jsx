import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Meteor } from "meteor/meteor";
import { useUsuario } from "../../hooks";
import "./style.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const options = ["Cadastrada", "Em andamento", "Concluída"];

export function InputSelect(props) {
  const { user } = useUsuario();
  const [taskStatus, setTaskStatus] = React.useState(props.status || "");

  function handleChangeStatus(event) {
    if (props.userId !== user._id) {
      props.setTitleM("Usuario inválido!");
      props.setTextM(
        "Você não tem permissão para modificar informações relacionadas a tarefas de outros usuários."
      );
      props.setOpenM(true);
      return;
    }
    setTaskStatus(event.target.value);
    Meteor.call(
      "tasks.setStatus",
      props.id,
      event.target.value,
      function (error) {
        if (error) {
          props.setTitleM(error.error);
          props.setTextM(error.reason);
          props.setOpenM(true);
        }
      }
    );
  }

  return (
    <div>
      <Select
        className="selectInput"
        displayEmpty
        color="white"
        value={taskStatus}
        onChange={(e) => handleChangeStatus(e)}
        input={<OutlinedInput />}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <em>{taskStatus}</em>;
          }
          return selected;
        }}
        MenuProps={MenuProps}
        inputProps={{ "aria-label": "Without label" }}
      >
        {options.map((name, index) => (
          <MenuItem key={index} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}
