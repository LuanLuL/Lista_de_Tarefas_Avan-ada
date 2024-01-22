import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "./style.css";
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
  const [titleTask, setTitleTask] = useState("");
  const [isTaskPessoal, setIsTaskPessoal] = useState("");
  const [descTask, setDescTask] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [page, setPage] = useState(1);
  const {
    tasks,
    showCompletedTasks,
    setShowCompletedTasks,
    pesquisa,
    setPesquisa,
  } = useTask(params.id);

  const [openAutocomplete, setOpenAutocomplete] = useState(false);
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
          <aside className="optionTaskPage">
            <div className="controlFormTasks">
              <form
                className={`formTask ${
                  isFormOpen ? " openControlFormTasks" : ""
                }`}
                onSubmit={handleAddNewTask}
              >
                <h2>Criar nova Tarefa</h2>
                <div
                  className="contentInput"
                  style={{ justifyContent: "center" }}
                >
                  <InputText
                    desabilitado={!isFormOpen}
                    text="Nome"
                    value={titleTask}
                    setValue={(textInputText) => setTitleTask(textInputText)}
                  />
                </div>
                <div
                  className="contentInput"
                  style={{ justifyContent: "center" }}
                >
                  <InputText
                    desabilitado={!isFormOpen}
                    text="Descrição"
                    value={descTask}
                    setValue={(textInputText) => setDescTask(textInputText)}
                  />
                </div>
                <div className="InpuTipo">
                  <InputTipo
                    desabilitado={!isFormOpen}
                    value={isTaskPessoal}
                    setValue={(inputTipo) => setIsTaskPessoal(inputTipo)}
                  />
                </div>
                <Button
                  disabled={!isFormOpen}
                  type="submit"
                  variant="contained"
                  color="black"
                  startIcon={<AddTaskIcon />}
                >
                  Adicionar
                </Button>
              </form>
              <IconButton
                className="buttonFormTasks"
                style={{ position: "absolute" }}
                color="black"
                aria-label="open drawer"
                onClick={toggleForm}
              >
                {!isFormOpen ? <AddIcon /> : <CloseIcon />}
              </IconButton>
            </div>
            <div className="controlSearchTask">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setOpenAutocomplete(false);
                }}
                className={`contentInput searchTask ${
                  isSearchOpen ? " openControlSearchTasks" : ""
                }`}
                style={{ justifyContent: "center" }}
              >
                <Autocomplete
                  className="autoComplete"
                  id="controlled-demo"
                  disabled={!isSearchOpen}
                  options={tasks.map((task) => task.name)}
                  getOptionLabel={(taskName) => taskName}
                  noOptionsText="Nenhuma tarefa encontrada"
                  open={openAutocomplete}
                  onOpen={() => setOpenAutocomplete(true)}
                  onClose={() => setOpenAutocomplete(false)}
                  value={pesquisa}
                  onChange={(event, newValue) => {
                    event.preventDefault();
                    setPesquisa(newValue);
                    setOpenAutocomplete(false);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Pesquisar"
                      variant="outlined"
                      color="black"
                      disabled={!isSearchOpen}
                      onChange={(event) => {
                        event.preventDefault();
                        setPesquisa(event.target.value);
                      }}
                    />
                  )}
                />
              </form>
              <IconButton
                className="buttonSearchTasks"
                style={{
                  position: "absolute",
                  top:
                    isFormOpen && isSearchOpen
                      ? "-23px"
                      : !isFormOpen
                      ? "-30px"
                      : "",
                  right: !isFormOpen ? "40px" : "",
                }}
                color="black"
                aria-label="open drawer"
                onClick={toggleSearch}
              >
                {!isSearchOpen ? <SearchIcon /> : <CloseIcon />}
              </IconButton>
            </div>
            {params.id !== "suas" && params.id !== "todas" ? (
              <div style={{ height: "60px" }}></div>
            ) : (
              <div className="buttonShowCompletdTasks">
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
          </aside>
          <main className="mainTask">
            {tasks.length === 0 ? (
              <div className="noTask">
                <h2>Nenhuma tarefa encontrada</h2>
              </div>
            ) : (
              <List className="taskList">
                {tasks.slice(page * 4 - 4, page * 4).map((task) => (
                  <Task
                    key={task._id}
                    task={task}
                    setOpenM={(inputSetOpenM) => setOpenModal(inputSetOpenM)}
                    setTitleM={(inputSetTitleM) =>
                      setTitleModal(inputSetTitleM)
                    }
                    setTextM={(inputSetTextM) => setTextModal(inputSetTextM)}
                  />
                ))}
              </List>
            )}
          </main>
          <Pagination
            style={{ margin: "30px 20px" }}
            onChange={(e, p) => setPage(p)}
            color="black"
            count={Math.ceil(tasks.length / 4)}
            shape="rounded"
            renderItem={(item) => (
              <PaginationItem
                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                {...item}
              />
            )}
          />
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

  function toggleSearch() {
    setIsSearchOpen(!isSearchOpen);
  }

  function toggleIsToShowCompletedTasks() {
    setShowCompletedTasks(!showCompletedTasks);
  }

  function handleAddNewTask(event) {
    event.preventDefault();
    if (
      titleTask.trim() === "" ||
      descTask.trim() === "" ||
      isTaskPessoal.trim() === ""
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
      titleTask.trim(),
      descTask.trim(),
      user.username,
      isTaskPessoal,
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
    setIsTaskPessoal("");
  }
}
