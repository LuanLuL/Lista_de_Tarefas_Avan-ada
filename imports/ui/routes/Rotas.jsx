import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  LoginPage,
  RegisterPage,
  HomePage,
  TaskPage,
  UserPage,
  WatchTaskPage,
} from "../pages";

export function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/tasks/:id" element={<TaskPage />} />
        <Route path="/edit/:objetoSerializado" element={<WatchTaskPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
