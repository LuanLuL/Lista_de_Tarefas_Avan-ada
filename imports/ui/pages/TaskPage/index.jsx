import * as React from "react";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import { useUsuario, useTask } from "../../hooks";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { Task, WarnModal, InputText, DrawerHeader } from "../../components";
import "./style.css";

export function TaskPage() {
  const { user, handleSignOut } = useUsuario();
  const { tasks } = useTask();
  const [titleTaks, setTitleTask] = React.useState("");
  const [descTaks, setDescTask] = React.useState("");
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [titleModal, setTitleModal] = React.useState("");
  const [textModal, setTextModal] = React.useState("");

  return (
    <section id="taskScreen">
      {!user ? (
        <div>
          <CircularProgress color="black" />
          <p className="loading">Buscando por usuário ...</p>
        </div>
      ) : (
        <div className="taskContent">
          <DrawerHeader />
          {tasks === undefined ? (
            <div>
              <CircularProgress color="black" />
              <p className="loading">Buscando por tarefas ...</p>
            </div>
          ) : !tasks ? (
            <div className="loadingContent">
              <CircularProgress color="black" />
              <p>Buscando pelas tarefas ...</p>
            </div>
          ) : (
            <main className="mainTask">
              <div className="controlFormTaks" style={{ width: "100%" }}>
                <form
                  className={`formTask ${
                    isFormOpen ? " openControlFormTaks" : ""
                  }`}
                  onSubmit={handleAddNewTaks}
                >
                  <h2>Criar nova Tarefa</h2>
                  <InputText
                    text="Nome"
                    value={titleTaks}
                    setValue={(textInputText) => setTitleTask(textInputText)}
                  />
                  <InputText
                    text="Descrição"
                    value={descTaks}
                    setValue={(textInputText) => setDescTask(textInputText)}
                  />
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
                  color="black"
                  aria-label="open drawer"
                  onClick={toggleForm}
                  sx={{ mr: 2 }}
                >
                  {!isFormOpen ? (
                    <AddIcon fontSize="large" />
                  ) : (
                    <CloseIcon fontSize="large" />
                  )}
                </IconButton>
              </div>
              <List className="taskList">
                {tasks.map((task) => (
                  <Task key={task._id} task={task} />
                ))}
              </List>
            </main>
          )}
          <footer className="footerTask">
            <p>Desevolvido por Luan Gonçalves Santos</p>
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

  function handleOptionDrawer(directory) {
    history(directory);
  }

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

  function handleAddNewTaks(event) {
    event.preventDefault();
    if (titleTaks.trim() === "" || descTaks == "") {
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
  }
}
