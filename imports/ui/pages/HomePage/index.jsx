import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useUsuario } from "../../hooks";
import "./style.css";

export function HomePage() {
  const { user } = useUsuario();
  return (
    <section>
      {user === undefined ? (
        <CircularProgress color="black" />
      ) : (
        <div>
          <h1>HomePage</h1>
          <h2>{user.username}</h2>
          <h2>{user.profile.genero}</h2>
          <h2>{user.profile.email}</h2>
          <h2>{user.profile.idade}</h2>
        </div>
      )}
    </section>
  );
}
