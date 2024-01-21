import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListAltIcon from "@mui/icons-material/ListAlt";
import IconButton from "@mui/material/IconButton";
import NoMeetingRoomIcon from "@mui/icons-material/NoMeetingRoom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { WarnModal } from "../../components";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { useUsuario } from "../../hooks";
import "./style.css";

export function DrawerHeader() {
  const { user, handleSignOut } = useUsuario();
  const history = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [textModal, setTextModal] = useState("");

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const list = (
    <Box
      sx={{ width: "auto" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem key={!user ? "profile" : user._id} disablePadding>
          <ListItemButton onClick={() => history("/user")}>
            <Avatar
              color="white"
              sx={{
                width: "35px",
                height: "35px",
                backgroundColor: "#000",
                marginRight: 1.5,
              }}
              src={user.profile.foto}
              alt="User Photo"
            />
            <ListItemText
              color="black"
              primary={!user ? "Carregando ..." : user.username}
              secondary={!user ? "Carregando ..." : user.emails[0].address}
            />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider
        color="black"
        style={{
          marginRight: 16,
          marginLeft: 16,
        }}
      />
      <List>
        <ListItem key={"Dashboard"} disablePadding>
          <ListItemButton onClick={() => history("/home")}>
            <DashboardIcon
              color="black"
              style={{
                marginRight: 10,
              }}
            />
            <ListItemText color="black" primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem key={"Explore suas tarefas"} disablePadding>
          <ListItemButton onClick={() => history("/tasks/suas")}>
            <ListAltIcon
              color="black"
              style={{
                marginRight: 10,
              }}
            />
            <ListItemText color="black" primary="Explore suas tarefas" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider
        color="black"
        style={{
          marginRight: 16,
          marginLeft: 16,
        }}
      />
      <List>
        <ListItem key={"Sair"} disablePadding>
          <ListItemButton onClick={() => handleLogout()}>
            <NoMeetingRoomIcon
              color="black"
              style={{
                marginRight: 10,
              }}
            />
            <ListItemText color="black" primary="Sair" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <header className="drawer">
      <IconButton
        color="white"
        aria-label="open drawer"
        onClick={toggleDrawer(true)}
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <h1>Lista de Tarefas</h1>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {list}
      </Drawer>
      {openModal && (
        <WarnModal
          value={openModal}
          setValue={(controlModal) => setOpenModal(controlModal)}
          title={titleModal}
          text={textModal}
        />
      )}
    </header>
  );

  function handleLogout() {
    handleSignOut()
      .then(() => {
        history("/");
      })
      .catch((error) => {
        console.log(
          `./LoginPage::handleSing => <Error> \n\n${error.reason}\n\n</Error>`
        );
        setTitleModal("Erro ao sair");
        setTextModal(
          "Ops! Encontramos um problema ao tentar realizar o logout. Por favor, tente novamentemais tarde."
        );
        setOpenModal(true);
      });
  }
}
