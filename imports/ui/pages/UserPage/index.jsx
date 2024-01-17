import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Avatar } from "@mui/material";
import { useUsuario } from "../../hooks";
import { DrawerHeader } from "../../components";
import "./style.css";

export function UserPage() {
  const { user } = useUsuario();

  return (
    <section id="userScreen">
      {!user ? (
        <div className="loadingContent ">
          <CircularProgress color="black" />
          <p>Buscando por usuário ...</p>
        </div>
      ) : (
        <div className="userContent">
          <DrawerHeader />
          <div></div>
          <main className="mainUser">
            <Avatar
              color="white"
              sx={{
                width: "180px",
                height: "180px",
                backgroundColor: "#000",
              }}
              src={user.profile.foto}
              alt="User Photo"
            />
            <h2>{user.username}</h2>
            <p>{user.emails[0].address}</p>
            <p className="initial">{user.profile.empresa}</p>
            <p className="initial">{user.profile.genero}</p>
            <p>{user.profile.dataNascimento}</p>
          </main>
          <footer className="footerUser">
            <p>Desevolvido por Luan Santos</p>
          </footer>
        </div>
      )}
    </section>
  );
}
