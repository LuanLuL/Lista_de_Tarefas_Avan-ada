import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import "./style.css";

const style = {
  position: "absolute",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function PaperComponent(props) {
  return <Paper {...props} />;
}

export function ConfirmModal(props) {
  const handleClose = () => {
    props.setOpenConfirmModal(!props.openConfirmModal);
  };

  const handleConfirm = () => {
    props.functionConfirm();
    handleClose();
  };

  return (
    <Dialog
      open={props.openConfirmModal}
      onClose={handleClose}
      PaperComponent={(props) => (
        <PaperComponent id="modalConfirmScreen" {...props} style={style} />
      )}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle
        style={{
          paddingBottom: 0,
        }}
        id="draggable-dialog-title"
        className="titleConfirmModal"
      >
        <AnnouncementIcon color="warning" fontSize="large" />
        {props.titleConfirmModal}
      </DialogTitle>
      <DialogContent className="textConfirmModal">
        <DialogContentText>{props.textConfirmModal}</DialogContentText>
      </DialogContent>
      <DialogActions
        className="buttonContent"
        style={{ paddingBottom: "16px" }}
      >
        <Button
          autoFocus
          onClick={handleClose}
          variant="contained"
          color="error"
        >
          Cancelar
        </Button>
        <Button onClick={handleConfirm} variant="contained" color="success">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
