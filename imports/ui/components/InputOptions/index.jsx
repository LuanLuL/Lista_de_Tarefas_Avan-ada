import React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useUsuario } from "../../hooks";
import { useNavigate } from "react-router-dom";

export function InputOptions(props) {
  const { user } = useUsuario();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useNavigate();
  const objetoSerializado = encodeURIComponent(
    JSON.stringify({ ...props.task, function: true })
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        color="white"
        aria-label="options"
        aria-controls="options-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="options-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleEditTask()}>Editar</MenuItem>
        <MenuItem onClick={() => handleRemoveTask()}>Remover</MenuItem>
      </Menu>
    </div>
  );

  function handleEditTask() {
    handleClose();
    history(`/edit/${objetoSerializado}`);
  }

  function handleRemoveTask() {
    if (props.task.user.userId !== user._id) {
      props.setTitleM("Usuario inválido!");
      props.setTextM(
        "Você não tem permissão para remover tarefas de outros usuários."
      );
      props.setOpenM(true);
      handleClose();
      return;
    }
    Meteor.call("tasks.remove", props.task.id, function (error) {
      if (error) {
        props.setTitleM(error.error);
        props.setTextM(error.reason);
        props.setOpenM(true);
      }
    });
    handleClose();
  }
}
