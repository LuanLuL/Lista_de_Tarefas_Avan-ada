import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Meteor } from "meteor/meteor";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { InputPassword, InputText, WarnModal } from "../../components";
import Button from "@mui/material/Button";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { Avatar, IconButton } from "@mui/material";
import { useUsuario } from "../../hooks";
import "./style.css";

export function RegisterPage() {
  const [userName, setUserName] = useState("");
  const [userEmpresa, setUserEmpresa] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userGenero, setUserGenero] = useState("");
  const [userNascimento, setUserNascimento] = useState("");
  const [userFoto, setUserFoto] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [textModal, setTextModal] = useState("");
  const history = useNavigate();
  const { handleSingIn } = useUsuario();
  return (
    <section id="registerScreen">
      <aside>
        <h1>Lista de tarefas</h1>
      </aside>
      <main className="registerMain">
        <h2>Cadastre-se</h2>
        <form className="registerForm" onSubmit={handleRegisterUser}>
          <InputText
            text="Email"
            value={userEmail}
            setValue={(textInputText) => setUserEmail(textInputText)}
          />
          <InputText
            text="Nome de usuário"
            value={userName}
            setValue={(textInputText) => setUserName(textInputText)}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
              color="black"
              label="Data de Nascimento"
              className="inputDate"
              value={undefined}
              format="DD/MM/YYYY"
              onChange={(newValue) => {
                if (newValue["$y"] > 999) {
                  setUserNascimento(
                    `${
                      newValue["$D"] < 10
                        ? "0" + newValue["$D"]
                        : newValue["$D"]
                    }/${
                      newValue["$M"] + 1 < 10
                        ? "0" + (newValue["$M"] + 1)
                        : newValue["$M"] + 1
                    }/${newValue["$y"]}`
                  );
                }
              }}
            />
            <div>
              <input
                accept="image/*"
                id="upload-avatar-pic"
                type="file"
                hidden
                onChange={handlePhotoChange}
              />
              <label
                htmlFor="upload-avatar-pic"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <IconButton component="span" color="black">
                  <Avatar
                    color="white"
                    sx={{
                      width: "10vmin",
                      height: "10vmin",
                      backgroundColor: "#000",
                    }}
                    src={userFoto}
                    alt="User Photo"
                  />
                </IconButton>
                <span style={{ paddingTop: "8px" }}>Escolher Foto</span>
              </label>
            </div>
          </LocalizationProvider>
          <FormControl style={{ paddingLeft: 45 }}>
            <FormLabel id="demo-row-radio-buttons-group-label" color="black">
              Genêro
            </FormLabel>
            <RadioGroup
              color="black"
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={userGenero}
              onChange={(e) => setUserGenero(e.target.value)}
            >
              <FormControlLabel
                color="black"
                value="feminino"
                control={<Radio color="black" />}
                label="Feminino"
              />
              <FormControlLabel
                value="masculino"
                control={<Radio color="black" />}
                label="Masculino"
                color="black"
              />
              <FormControlLabel
                value="outro"
                control={<Radio color="black" />}
                label="Outro"
              />
            </RadioGroup>
          </FormControl>
          <InputText
            text="Empresa"
            value={userEmpresa}
            setValue={(textInputText) => setUserEmpresa(textInputText)}
          />
          <InputPassword
            text="Senha"
            value={userPassword}
            setValue={(textInputPassowrd) => setUserPassword(textInputPassowrd)}
          />
          <Button
            variant="contained"
            color="black"
            startIcon={<HowToRegIcon />}
            type="submit"
          >
            Cadastrar
          </Button>
        </form>
      </main>
      <footer className="linkToLogin">
        <p>
          Já possui uma conta no sistema! <Link to="/login">Entrar</Link>.
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

  function checkInputs() {
    console.log("userName:", userName.trim());
    console.log("userPassword:", userPassword);
    console.log("userEmail:", userEmail.trim());
    console.log("userGenero:", userGenero.trim());
    console.log("userNascimento:", userNascimento.trim());
    console.log("userEmpresa:", userEmpresa.trim());
    console.log("userFoto:", userFoto.trim());
    return (
      userName.trim() === "" ||
      userPassword === "" ||
      userEmail.trim() === "" ||
      userGenero.trim() === "" ||
      userNascimento.trim() === "" ||
      userEmpresa.trim() === "" ||
      userFoto.trim() === ""
    );
  }

  function emailValidation() {
    let regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    if (!regEx.test(userEmail)) {
      return false;
    }
    return true;
  }

  function handlePhotoChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader(file);
      reader.onload = (e) => {
        setUserFoto(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleRegisterUser(event) {
    event.preventDefault();

    if (checkInputs()) {
      setTitleModal("Campos obrigatórios vazios");
      setTextModal(
        "Por favor, preencha todos os campos obrigatórios para continuar."
      );
      setOpenModal(true);
      return;
    }

    if (!emailValidation()) {
      setTitleModal("Evamil inválido");
      setTextModal(
        "O email fornecido é inválido. Por favor, insira um email válido para continuar."
      );
      setOpenModal(true);
      return;
    }

    /*DO LOGIN*/

    Meteor.call(
      "users.register",
      userName.trim(),
      userPassword,
      userEmail.trim(),
      function (error) {
        if (error) {
          setTitleModal(error.error);
          setTextModal(error.reason);
          setOpenModal(true);
        } else {
          handleSingIn(userName.trim(), userPassword)
            .then(() => {
              Meteor.call(
                "users.setRegisterDatas",
                userNascimento,
                userGenero,
                userEmpresa.trim(),
                userFoto.trim(),
                function (error) {
                  if (error) {
                    setTitleModal(error.error);
                    setTextModal(error.reason);
                    setOpenModal(true);
                  } else {
                    history("/home");
                  }
                }
              );
            })
            .catch((error) => {
              console.log(
                `./RegisterPage::handleRegisterUser()::handleSing() => <Error> \n\n${error.reason}\n\n</Error>`
              );
              setTitleModal(error.error);
              setTextModal(error.reason);
              setOpenModal(true);
            });
        }
      }
    );
  }
}
