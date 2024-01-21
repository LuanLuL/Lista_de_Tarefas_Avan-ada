import React, { useState, useEffect } from "react";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";
import { useUsuario, useTask } from "../../hooks";
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

  console.log(task);
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
            <form onSubmit={(e) => handleEditTask(e)} className="formWatchTask">
              <div
                className="contentInput"
                style={{ justifyContent: "center" }}
              >
                <InputText
                  desabilitado={!task.function}
                  text="Titulo"
                  value={task.name}
                  setValue={(textInputTitulo) => setNewTitulo(textInputTitulo)}
                />
              </div>
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
              <div className="formWatchTaskButton">
                <Button
                  type="submit"
                  variant="contained"
                  color="black"
                  startIcon={
                    task.function ? <BookmarkAddedIcon /> : <BookmarkAddIcon />
                  }
                >
                  {task.function ? "Salvar" : "Editar"}
                </Button>
              </div>
              <span className="dateWatchTask">
                {`${task.createdAt.substring(8, 10)}/${task.createdAt.substring(
                  5,
                  7
                )}/${task.createdAt.substring(0, 4)}`}
              </span>
            </form>
          </main>
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
    const newTask = { ...task };
    newTask.function = !newTask.function;
    setTask(newTask);
  }
}
