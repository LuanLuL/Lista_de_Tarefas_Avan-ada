import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { CardOptionsView, DrawerHeader } from "../../components";
import { useUsuario, useTask } from "../../hooks";
import "./style.css";

export function HomePage() {
  const { user } = useUsuario();
  const {
    tasksCount,
    emAndamentoTasksCount,
    concluidasTasksCount,
    cadastradasTasksCount,
  } = useTask();

  return (
    <section id="homeScreen">
      {!user ? (
        <div className="loadingContent">
          <CircularProgress color="black" />
          <p>Buscando por usuário ...</p>
        </div>
      ) : (
        <div className="homeContent">
          {tasksCount === undefined ||
          !emAndamentoTasksCount === undefined ||
          !concluidasTasksCount === undefined ||
          !cadastradasTasksCount === undefined ? (
            <div className="loadingContent">
              <CircularProgress color="black" />
              <p>Buscando por tarefas ...</p>
            </div>
          ) : (
            <main className="mainHome">
              <DrawerHeader />
              <CardOptionsView option={"todas"} color="white">
                <div>
                  <p>Ver</p>
                  <p>Todas as</p>
                  <p>Tarefas</p>
                </div>
                <span>{tasksCount}</span>
              </CardOptionsView>
              <CardOptionsView option={"cadastradas"} color="red">
                <div>
                  <p>Ver</p>
                  <p>Tarefas</p>
                  <p>Cadastradas</p>
                </div>
                <span>{cadastradasTasksCount}</span>
              </CardOptionsView>
              <CardOptionsView option={"emAndamento"} color="yellow">
                <div>
                  <p>Ver</p>
                  <p>Tarefas</p>
                  <p>Em andamento</p>
                </div>
                <span>{emAndamentoTasksCount}</span>
              </CardOptionsView>
              <CardOptionsView option={"concluidas"} color="green">
                <div>
                  <p>Ver</p>
                  <p>Tarefas</p>
                  <p>Concluídas</p>
                </div>
                <span>{concluidasTasksCount}</span>
              </CardOptionsView>
            </main>
          )}
          <footer className="footerHome">
            <p>Desevolvido por Luan Santos</p>
          </footer>
        </div>
      )}
    </section>
  );
}
