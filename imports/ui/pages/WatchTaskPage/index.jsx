import React, { useState, useEffect } from "react";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";
import { useUsuario } from "../../hooks";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useNavigate } from "react-router-dom";
import {
  WarnModal,
  DrawerHeader,
  InputText,
  InputTipo,
} from "../../components";
import { Button } from "@mui/material";

import "./style.css";

export function WatchTaskPage() {
  const { objetoSerializado } = useParams();
  const history = useNavigate();
  const [task, setTask] = useState(undefined);
  const { user } = useUsuario();
  const [openModal, setOpenModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [textModal, setTextModal] = useState("");

  useEffect(() => {
    const objetoDeserializado = JSON.parse(
      decodeURIComponent(objetoSerializado)
    );
    setTask(objetoDeserializado);
  }, [objetoSerializado]);

  return (
    <section id="watchTaskScreen">
      {!user ? (
        <div className="loadingContent">
          <CircularProgress color="black" />
          <p>Buscando por usuário ...</p>
        </div>
      ) : !task ? (
        <div className="loadingContent">
          <CircularProgress color="black" />
          <p>Buscando por tarefas ...</p>
        </div>
      ) : (
        <div className="watchTaskContent">
          <DrawerHeader />
          <main className="mainWatchTask">
            <div className="headerWatchTask"></div>
            <form onSubmit={(e) => handleEditTask(e)} className="formWatchTask">
              <label className="formWatchTaskLabel" htmlFor="titulo">
                Título:{" "}
              </label>
              <textarea
                name="titulo"
                disabled={!task.function}
                placeholder="Descrição..."
                onChange={(e) => {
                  setNewTitulo(e.target.value);
                }}
                value={task.name}
              />
              <label className="formWatchTaskLabel" htmlFor="description">
                Descrição:{" "}
              </label>
              <textarea
                name="description"
                disabled={!task.function}
                placeholder="Descrição..."
                onChange={(e) => {
                  setNewDescription(e.target.value);
                }}
                value={task.description}
              />
              <div className="contentInput">
                <InputTipo
                  desabilitado={!task.function}
                  value={task.categoria}
                  setValue={(inputTipo) => setNewCategoria(inputTipo)}
                />
              </div>
              <Button
                type="submit"
                variant="contained"
                color="black"
                startIcon={
                  task.function ? <BookmarkAddedIcon /> : <ModeEditIcon />
                }
              >
                {task.function ? "Salvar" : "Editar"}
              </Button>
              <span className="dateWatchTask">
                {`${task.createdAt.substring(8, 10)}/${task.createdAt.substring(
                  5,
                  7
                )}/${task.createdAt.substring(0, 4)}`}
              </span>
            </form>
          </main>
          <footer className="footerWatchTask">
            <p>Desevolvido por Luan Santos</p>
          </footer>
        </div>
      )}
      {openModal && (
        <WarnModal
          value={openModal}
          setValue={(controlModal) => setOpenModal(controlModal)}
          title={titleModal}
          text={textModal}
        />
      )}
    </section>
  );

  function setNewDescription(value) {
    const newTask = { ...task };
    newTask.description = value;
    setTask(newTask);
  }

  function setNewTitulo(value) {
    const newTask = { ...task };
    newTask.name = value;
    setTask(newTask);
  }

  function setNewCategoria(value) {
    const newTask = { ...task };
    newTask.categoria = value;
    setTask(newTask);
  }

  function handleEditTask(event) {
    event.preventDefault();
    if (task.function === false) {
      const newTask = { ...task };
      newTask.function = !newTask.function;
      setTask(newTask);
      return;
    }
    Meteor.call(
      "tasks.update",
      task._id,
      task.name,
      task.description,
      task.categoria,
      function (error) {
        if (error) {
          setTitleModal(error.error);
          setTextModal(error.reason);
          setOpenModal(true);
        } else {
          history(-1);
        }
      }
    );
  }
}
