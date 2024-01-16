import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { CardOptionsView, DrawerHeader } from "../../components";
import { useUsuario, useTask } from "../../hooks";
import "./style.css";

export function HomePage() {
  const { user } = useUsuario();
  const { tasksCount, emAndamentosCount, concluidasCount, cadastradasCount } =
    useTask();

  return (
    <section id="homeScreen">
      {!user ? (
        <div>
          <CircularProgress color="black" />
          <p className="loading">Buscando por usuário ...</p>
        </div>
      ) : (
        <div className="homeContent">
          {tasksCount === undefined ||
          !emAndamentosCount === undefined ||
          !concluidasCount === undefined ||
          !cadastradasCount === undefined ? (
            <div className="loadingContent">
              <CircularProgress color="black" />
              <p>Buscando por tarefas ...</p>
            </div>
          ) : (
            <main className="mainHome">
              <DrawerHeader />
              <CardOptionsView option={1} color="white">
                <div>
                  <p>Ver</p>
                  <p>Todas As</p>
                  <p>Tarefas</p>
                </div>
                <span>{tasksCount}</span>
              </CardOptionsView>
              <CardOptionsView option={2} color="red">
                <div>
                  <p>Ver</p>
                  <p>Tarefas</p>
                  <p>Cadastradas</p>
                </div>
                <span>{cadastradasCount}</span>
              </CardOptionsView>
              <CardOptionsView option={3} color="yellow">
                <div>
                  <p>Ver</p>
                  <p>Tarefas</p>
                  <p>Em andamento</p>
                </div>
                <span>{emAndamentosCount}</span>
              </CardOptionsView>
              <CardOptionsView option={4} color="green">
                <div>
                  <p>Ver</p>
                  <p>Tarefas</p>
                  <p>Concluídas</p>
                </div>
                <span>{concluidasCount}</span>
              </CardOptionsView>
            </main>
          )}
          <footer className="footerHome">
            <p>Desevolvido por Luan Gonçalves Santos</p>
          </footer>
        </div>
      )}
    </section>
  );
}
