import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useUsuario } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { ConfirmModal } from "../../components";

export function InputOptions(props) {
  const { user } = useUsuario();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useNavigate();
  const [openConfirmM, setOpenConfirmM] = useState(false);
  const [titleConfirmM, setTitleConfirmM] = useState("");
  const [textConfirmM, setTextConfirmM] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const removeTaks = () => {
    console.log("Removendo");
    Meteor.call("tasks.remove", props.task._id, function (error) {
      if (error) {
        props.setTitleM(error.error);
        props.setTextM(error.reason);
        props.setOpenM(true);
      }
    });
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
      {openConfirmM && (
        <ConfirmModal
          openConfirmModal={openConfirmM}
          setOpenConfirmModal={(controlModal) => setOpenConfirmM(controlModal)}
          titleConfirmModal={titleConfirmM}
          textConfirmModal={textConfirmM}
          functionConfirm={removeTaks}
        />
      )}
    </div>
  );

  function handleEditTask() {
    if (props.task.user.userId !== user._id) {
      props.setTitleM("Usuario inválido!");
      props.setTextM(
        "Você não tem permissão para editar tarefas de outros usuários."
      );
      props.setOpenM(true);
      handleClose();
      return;
    }
    handleClose();
    history(
      `/edit/${encodeURIComponent(
        JSON.stringify({ ...props.task, function: true })
      )}`
    );
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

    setTitleConfirmM("Deseja remover a tarefa?");
    setTextConfirmM(
      "Você está prestes a excluir uma tarefa. Por favor, confirme sua decisão."
    );
    setOpenConfirmM(true);
    handleClose();
  }
}
