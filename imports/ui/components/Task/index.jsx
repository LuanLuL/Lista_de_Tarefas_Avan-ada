import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import { InputOptions, InputSelect } from "../../components";
import { useScreen } from "../../hooks/";
import { useNavigate } from "react-router-dom";
import "./style.css";

export function Task({ task, setOpenM, setTitleM, setTextM }) {
  const history = useNavigate();
  const { windowWidth } = useScreen();
  return (
    <ListItem
      className="colorTask taskCard"
      style={{ alignItems: windowWidth <= 540 ? "start" : "" }}
      secondaryAction={
        <div className="optionsTaks">
          <InputSelect
            id={task._id}
            status={task.status}
            userId={task.user.userId}
            setOpenM={setOpenM}
            setTitleM={setTitleM}
            setTextM={setTextM}
          />
          <InputOptions
            task={task}
            setOpenM={setOpenM}
            setTitleM={setTitleM}
            setTextM={setTextM}
          />
        </div>
      }
    >
      <Button
        color="white"
        style={{ textTransform: "none", textAlign: "left" }}
        onClick={handleViewtTask}
      >
        <ListItemAvatar>
          <TurnedInIcon
            fontSize="large"
            color={
              task.status === "Cadastrada"
                ? "error"
                : task.status === "Em andamento"
                ? "yellow"
                : "green"
            }
          />
        </ListItemAvatar>
        <ListItemText
          color="white"
          primary={task.name}
          primaryTypographyProps={{
            width: {
              xs: 140,
              sm: 230,
              md: 180,
              lg: 400,
              xl: 400,
            },
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          secondaryTypographyProps={{
            width: {
              xs: 140,
              sm: 230,
              md: 180,
              lg: 400,
              xl: 400,
            },
            color: "white",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          secondary={<span className="colorTask">{task.user.userName}</span>}
        />
      </Button>
    </ListItem>
  );

  function handleViewtTask() {
    history(
      `/edit/${encodeURIComponent(
        JSON.stringify({ ...task, function: false })
      )}`
    );
  }
}
