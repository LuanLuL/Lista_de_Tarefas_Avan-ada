import * as React from "react";
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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CircularProgress from "@mui/material/CircularProgress";
import NoMeetingRoomIcon from "@mui/icons-material/NoMeetingRoom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { CardOptionsView } from "../../components";
import { useNavigate } from "react-router-dom";
import { useUsuario, useTask } from "../../hooks";
import "./style.css";

export function HomePage() {
  const history = useNavigate();
  const { user } = useUsuario();
  const { tasksCount, emAndamentosCount, concluidasCount, cadastradasCount } =
    useTask();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  console.log("tasksCount:", tasksCount);
  console.log("emAndamentosCount:", emAndamentosCount);
  console.log("concluidasCount:", concluidasCount);
  console.log("cadastradasCount:", cadastradasCount);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  function handleOptionDrawer(directory) {
    history(directory);
  }

  const list = (
    <Box
      sx={{ width: "auto" }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem key={!user ? "profile" : user._id} disablePadding>
          <ListItemButton>
            <AccountCircleIcon
              fontSize="large"
              color="black"
              style={{
                marginRight: 10,
              }}
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
          <ListItemButton onClick={() => handleOptionDrawer("/home")}>
            <DashboardIcon
              color="black"
              style={{
                marginRight: 10,
              }}
            />
            <ListItemText color="black" primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem key={"Explore as Tarefas"} disablePadding>
          <ListItemButton onClick={() => handleOptionDrawer("/tasks")}>
            <ListAltIcon
              color="black"
              style={{
                marginRight: 10,
              }}
            />
            <ListItemText color="black" primary="Explore as Tarefas" />
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
          <ListItemButton>
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
    <section id="homeScreen">
      {!user ? (
        <div>
          <CircularProgress color="black" />
          <p className="loading">Buscando por usuário ...</p>
        </div>
      ) : (
        <div className="homeContent">
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
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              {list}
            </Drawer>
          </header>
          {tasksCount === undefined ||
          !emAndamentosCount === undefined ||
          !concluidasCount === undefined ||
          !cadastradasCount === undefined ? (
            <div>
              <CircularProgress color="black" />
              <p className="loading">Buscando por tarefas ...</p>
            </div>
          ) : (
            <main className="mainHome">
              <CardOptionsView option={1} color="white">
                <div>
                  <p>Ver</p>
                  <p>Todas As</p>
                  <p>Tarefas</p>
                </div>
                <span>{tasksCount}</span>
              </CardOptionsView>
              <CardOptionsView option={2} color="red">
                <div>
                  <p>Ver</p>
                  <p>Tarefas</p>
                  <p>Cadastradas</p>
                </div>
                <span>{cadastradasCount}</span>
              </CardOptionsView>
              <CardOptionsView option={3} color="yellow">
                <div>
                  <p>Ver</p>
                  <p>Tarefas</p>
                  <p>Em andamento</p>
                </div>
                <span>{emAndamentosCount}</span>
              </CardOptionsView>
              <CardOptionsView option={4} color="green">
                <div>
                  <p>Ver</p>
                  <p>Tarefas</p>
                  <p>Concluídas</p>
                </div>
                <span>{concluidasCount}</span>
              </CardOptionsView>
            </main>
          )}
          <footer className="footerHome">
            <p>Desevolvido por Luan Gonçalves Santos</p>
          </footer>
        </div>
      )}
    </section>
  );
}
