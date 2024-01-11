import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Meteor } from "meteor/meteor";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { InputPassword, InputSelect, InputText } from "../../components";
import Button from "@mui/material/Button";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { useUsuario } from "../../hooks";
import "./style.css";

export function RegisterPage() {
  const [userName, setUserName] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  const [userGenero, setUserGenero] = React.useState("");
  const [userIdade, setUserIdade] = React.useState(0);
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
          <InputSelect
            text="Idade"
            value={userIdade === 0 ? "" : userIdade}
            setValue={(textInputSelect) => setUserIdade(textInputSelect)}
          >
            {Array.from({ length: 88 }, (_, index) => index + 12).map(
              (item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              )
            )}
          </InputSelect>
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
    </section>
  );

  function checkInputs() {
    return (
      userName.trim() === "" ||
      userPassword === "" ||
      userEmail.trim() === "" ||
      userGenero.trim() === "" ||
      userIdade === 0
    );
  }

  function emailValidation() {
    let regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    if (!regEx.test(userEmail)) {
      return false;
    }
    return true;
  }

  function handleRegisterUser(event) {
    event.preventDefault();

    if (checkInputs()) {
      alert("Você deve preecher todos os campos");
      return;
    }

    if (!emailValidation()) {
      alert("Você precisa inserir um e-mail válido");
      return;
    }

    /*DO LOGIN*/

    Meteor.call(
      "users.register",
      userName.trim(),
      userPassword,
      function (error) {
        if (error) {
          alert(error.reason);
        } else {
          handleSingIn(userName.trim(), userPassword)
            .then(() => {
              Meteor.call(
                "users.setRegisterDatas",
                userEmail.trim(),
                userIdade,
                userGenero,
                function (error) {
                  if (error) {
                    alert(error.reason);
                  }
                }
              );
              history("/home");
            })
            .catch((error) => {
              console.log(
                `./RegisterPage::handleRegisterUser()::handleSing() => <Error> \n\n${error.reason}\n\n</Error>`
              );
              alert("Erro ao cadastrar usuário");
            });
        }
      }
    );
  }
}
