import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUsuario } from "../../hooks";
import { InputPassword, InputText, WarnModal } from "../../components";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import "./style.css";

export function LoginPage() {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [openModal, setOpenModal] = React.useState(false);
  const [titleModal, setTitleModal] = React.useState("");
  const [textModal, setTextModal] = React.useState("");
  const { handleSingIn } = useUsuario();
  const history = useNavigate();

  return (
    <section id="loginScreen">
      <aside>
        <h1>Lista de tarefas</h1>
      </aside>
      <main className="loginMain">
        <h2>Conecte-se</h2>
        <form className="loginForm" onSubmit={handleLoginUser}>
          <InputText
            text="Nome de usuário"
            value={userName}
            setValue={(textInputText) => setUserName(textInputText)}
          />
          <InputPassword
            text="Senha"
            value={userPassword}
            setValue={(textInputPassowrd) => setUserPassword(textInputPassowrd)}
          />
          <Button
            type="submit"
            variant="contained"
            color="black"
            startIcon={<LoginIcon />}
          >
            Entrar
          </Button>
        </form>
      </main>
      <footer className="linkToRegister">
        <p>
          Não possui uma conta no sistema!{" "}
          <Link to="/register">Clique Aqui</Link>.
        </p>
      </footer>
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

  function handleLoginUser(event) {
    event.preventDefault();
    if (userName.trim() === "" || userPassword.trim() === "") {
      setTitleModal("Campos obrigatórios vazios");
      setTextModal(
        "Por favor, preencha todos os campos obrigatórios para continuar."
      );
      setOpenModal(true);
      return;
    }

    handleSingIn(userName.trim(), userPassword)
      .then(() => {
        history("/home");
      })
      .catch((error) => {
        console.log(
          `./LoginPage::handleSing => <Error> \n\n${error.reason}\n\n</Error>`
        );
        setTitleModal("Usuário não encontrado");
        setTextModal(
          "As credenciais fornecidas são inválidas. Por favor, tente novamente."
        );
        setOpenModal(true);
      });
  }
}
