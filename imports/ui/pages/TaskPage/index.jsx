import React, { useState } from "react";
import { useParams } from "react-router-dom";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { useUsuario, useTask } from "../../hooks";
import AddTaskIcon from "@mui/icons-material/AddTask";
import {
  Task,
  WarnModal,
  InputText,
  DrawerHeader,
  InputTipo,
} from "../../components";
import "./style.css";

export function TaskPage() {
  const params = useParams();
  const { user } = useUsuario();
  const [titleTaks, setTitleTask] = useState("");
  const [isTaksPessoal, setIsTaksPessoal] = useState("");
  const [descTaks, setDescTask] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { tasks, showCompletedTasks, setShowCompletedTasks } = useTask(
    params.id
  );
  const [openModal, setOpenModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [textModal, setTextModal] = useState("");

  return (
    <section id="taskScreen">
      {!user ? (
        <div className="loadingContent">
          <CircularProgress color="black" />
          <p>Buscando por usuário ...</p>
        </div>
      ) : tasks === undefined ? (
        <div className="loadingContent">
          <CircularProgress color="black" />
          <p>Buscando por tarefas ...</p>
        </div>
      ) : (
        <div className="taskContent">
          <DrawerHeader />
          <main className="mainTask">
            <div className="controlFormTaks">
              <form
                className={`formTask ${
                  isFormOpen ? " openControlFormTaks" : ""
                }`}
                onSubmit={handleAddNewTask}
              >
                <h2>Criar nova Tarefa</h2>
                <div
                  className="contentInput"
                  style={{ justifyContent: "center" }}
                >
                  <InputText
                    text="Nome"
                    value={titleTaks}
                    setValue={(textInputText) => setTitleTask(textInputText)}
                  />
                </div>
                <div
                  className="contentInput"
                  style={{ justifyContent: "center" }}
                >
                  <InputText
                    text="Descrição"
                    value={descTaks}
                    setValue={(textInputText) => setDescTask(textInputText)}
                  />
                </div>
                <div className="InpuTipo">
                  <InputTipo
                    value={isTaksPessoal}
                    setValue={(inputTipo) => setIsTaksPessoal(inputTipo)}
                  />
                </div>
                <Button
                  type="submit"
                  variant="contained"
                  color="black"
                  startIcon={<AddTaskIcon />}
                >
                  Adicionar
                </Button>
              </form>
              <IconButton
                className="buttonFormTaks"
                style={{ position: "absolute" }}
                color="black"
                aria-label="open drawer"
                onClick={toggleForm}
              >
                {!isFormOpen ? <AddIcon /> : <CloseIcon />}
              </IconButton>
            </div>
            {params.id !== "suas" && params.id !== "todas" ? (
              <div style={{ height: "40px" }}></div>
            ) : (
              <div className="buttonControlCompletedTaks">
                <Button
                  color="black"
                  aria-label="open drawer"
                  onClick={toggleIsToShowCompletedTasks}
                  startIcon={
                    showCompletedTasks ? (
                      <CheckBoxOutlineBlankIcon />
                    ) : (
                      <CheckBoxIcon color="green" />
                    )
                  }
                >
                  Ocultar concluídas
                </Button>
              </div>
            )}
            <List className="taskList">
              {tasks.map((task) => (
                <Task
                  key={task._id}
                  task={task}
                  setOpenM={(inputSetOpenM) => setOpenModal(inputSetOpenM)}
                  setTitleM={(inputSetTitleM) => setTitleModal(inputSetTitleM)}
                  setTextM={(inputSetTextM) => setTextModal(inputSetTextM)}
                />
              ))}
            </List>
          </main>
          <footer className="footerTask">
            <p>Desevolvido por Luan Santos</p>
          </footer>
          {openModal && (
            <WarnModal
              value={openModal}
              setValue={(controlModal) => setOpenModal(controlModal)}
              title={titleModal}
              text={textModal}
            />
          )}
        </div>
      )}
    </section>
  );

  function toggleForm() {
    setIsFormOpen(!isFormOpen);
  }

  function toggleIsToShowCompletedTasks() {
    setShowCompletedTasks(!showCompletedTasks);
  }

  function handleAddNewTask(event) {
    event.preventDefault();
    if (
      titleTaks.trim() === "" ||
      descTaks.trim() === "" ||
      isTaksPessoal.trim() === ""
    ) {
      setTitleModal("Campos obrigatórios vazios");
      setTextModal(
        "Por favor, preencha todos os campos obrigatórios para continuar."
      );
      setOpenModal(true);
      return;
    }

    if (!user) {
      return;
    }
    Meteor.call(
      "tasks.insert",
      titleTaks.trim(),
      descTaks.trim(),
      user.username,
      isTaksPessoal,
      function (error) {
        if (error) {
          setTitleModal(error.error);
          setTextModal(error.reason);
          setOpenModal(true);
          return;
        }
      }
    );
    setTitleTask("");
    setDescTask("");
    setIsTaksPessoal("");
  }
}
