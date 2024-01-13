import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import WarningIcon from "@mui/icons-material/Warning";
import "./style.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export function WarnModal(props) {
  const handleClose = () => {
    props.setValue(false);
  };

  return (
    <React.Fragment>
      <Modal
        open={props.value}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }}>
          <section id="modalWarnScreen">
            <div className="titleWarnModal">
              <WarningIcon color="error" fontSize="large" />
              <h2 id="child-modal-title">{props.title}</h2>
            </div>
            <p id="child-modal-description">{props.text}</p>
            <div className="buttonContent">
              <Button color="error" onClick={handleClose} variant="contained">
                Fechar
              </Button>
            </div>
          </section>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
