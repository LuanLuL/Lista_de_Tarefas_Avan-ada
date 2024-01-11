import React from "react";
import { useUsuario } from "../../hooks";
import "./style.css";

export function HomePage() {
  const { user } = useUsuario();
  return (
    <section>
      <h1>HomePage</h1>
      <h2>{user.username}</h2>
      <h2>{user._id}</h2>
    </section>
  );
}
