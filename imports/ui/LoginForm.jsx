import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { LoginWithGithub } from "./LoginWithGithub";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(event) {
    event.preventDefault();
    Meteor.loginWithPassword(username, password);
  }

  return (
    <form onSubmit={handleLogin} className="login-form ">
      <LoginWithGithub />
      <div>
        <div>
          <label htmlFor="username">Usuário</label>
          <input
            type="text"
            placeholder="Digite o nome de usuário"
            name="username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            name="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Entrar</button>
        </div>
      </div>
    </form>
  );
}
