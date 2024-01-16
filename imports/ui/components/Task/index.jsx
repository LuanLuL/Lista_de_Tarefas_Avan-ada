import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import { InputOptions, InputSelect } from "../../components";
import "./style.css";

export function Task({ task, setOpenM, setTitleM, setTextM }) {
  return (
    <ListItem
      className="colorTask taskCard"
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
            id={task._id}
            userId={task.user.userId}
            setOpenM={setOpenM}
            setTitleM={setTitleM}
            setTextM={setTextM}
          />
        </div>
      }
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
        secondary={<span className="colorTask">{task.user.userName}</span>}
      />
    </ListItem>
  );
}
