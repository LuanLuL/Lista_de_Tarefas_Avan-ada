import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import List from "@mui/material/List";
import { useUsuario, useTask } from "../../hooks";
import { Task } from "../../components";
import "./style.css";

export function HomePage() {
  const { user } = useUsuario();
  const { tasks } = useTask();

  return (
    <section id="homeScreen">
      {!user ? (
        <div>
          <CircularProgress color="black" />
          <p className="loading">Buscando por usuário ...</p>
        </div>
      ) : (
        <List className="taskList">
          {!tasks ? (
            <div>
              <CircularProgress color="black" />
              <p className="loading">Buscando pelas tarefas ...</p>
            </div>
          ) : (
            tasks.map((task) => <Task key={task._id} task={task} />)
          )}
        </List>
      )}
    </section>
  );
}
