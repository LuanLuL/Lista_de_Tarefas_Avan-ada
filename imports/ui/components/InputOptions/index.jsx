import React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useUsuario } from "../../hooks";

export function InputOptions(props) {
  const { user } = useUsuario();
  const [anchorEl, setAnchorEl] = React.useState(null);

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
  }

  function handleRemoveTask() {
    if (props.userId !== user._id) {
      props.setTitleM("Usuario inválido!");
      props.setTextM(
        "Você não tem permissão para remover tarefas de outros usuários."
      );
      props.setOpenM(true);
      handleClose();
      return;
    }
    Meteor.call("tasks.remove", props.id, function (error) {
      if (error) {
        props.setTitleM(error.error);
        props.setTextM(error.reason);
        props.setOpenM(true);
      }
    });
    handleClose();
  }
}
