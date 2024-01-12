import React, { createContext, useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

export const AutenticacaoContext = createContext({});

export function AutenticacoContextProvider(props) {
  const user = useTracker(() => {
    if (!Meteor.subscribe("users").ready) {
      return undefined;
    }
    return Meteor.user();
  });

  function handleSingIn(name, password) {
    return new Promise((resolve, reject) => {
      Meteor.loginWithPassword(name, password, (error) => {
        if (error) {
          reject(error); // Rejeita a promessa se houver um erro
        } else {
          resolve(); // Resolve a promessa se o login for bem-sucedido
        }
      });
    });
  }

  function handleSignOut() {
    return new Promise((resolve, reject) => {
      Meteor.logout((error) => {
        if (error) {
          reject(error); // Rejeita a promessa se houver um erro
        } else {
          resolve(); // Resolve a promessa se o login for bem-sucedido
        }
      });
    });
  }

  return (
    <AutenticacaoContext.Provider value={{ user, handleSingIn, handleSignOut }}>
      {props.children}
    </AutenticacaoContext.Provider>
  );
}
