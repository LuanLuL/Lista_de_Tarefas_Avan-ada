import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useUsuario } from "../../hooks";
import "./style.css";

export function HomePage() {
  const { user } = useUsuario();
  console.log(user);
  return (
    <section id="homeScreen">
      {user === undefined ? (
        <CircularProgress color="black" />
      ) : (
        <div>
          <h1>HomePage</h1>
          <h2>{user.username}</h2>
          <h2>{user.profile.genero}</h2>
          <h2>{user.emails[0].address}</h2>
          <h2>{user.profile.dataNascimento}</h2>
          <h2>{user.profile.empresa}</h2>
        </div>
      )}
    </section>
  );
}
