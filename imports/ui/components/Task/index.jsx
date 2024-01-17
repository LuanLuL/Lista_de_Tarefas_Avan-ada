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
      style={{ alignItems: window.innerWidth <= 540 ? "start" : "" }}
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
        primary={
          task.name.length >= 40 && window.innerWidth > 768
            ? task.name.substring(0, 40) + " ..."
            : task.name.length >= 19 &&
              window.innerWidth <= 768 &&
              window.innerWidth > 340
            ? task.name.substring(0, 19) + " ..."
            : task.name.length > 15 && window.innerWidth <= 340
            ? task.name.substring(0, 15) + " ..."
            : task.name
        }
        secondary={
          <span className="colorTask">
            {task.user.userName.length >= 50 && window.innerWidth > 768
              ? task.user.userName.substring(0, 50) + " ..."
              : task.user.userName.length >= 21 &&
                window.innerWidth <= 768 &&
                window.innerWidth > 340
              ? task.user.userName.substring(0, 21) + " ..."
              : task.user.userName.length >= 15 && window.innerWidth <= 340
              ? task.user.userName.substring(0, 15) + " ..."
              : task.user.userName}
          </span>
        }
      />
    </ListItem>
  );
}
