import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { TasksCollection } from "../db/TasksCollection";

Meteor.methods({
  "tasks.insert"(titulo, descricao, userName) {
    check(titulo, String);
    check(descricao, String);
    check(userName, String);

    if (!this.userId) {
      throw new Meteor.Error(
        "Usuario inválido!",
        "Você não possui autorização para realizar a ação solicitada. Agradecemos pela compreensão."
      );
    }

    TasksCollection.insert({
      name: titulo,
      description: descricao,
      createdAt: new Date(),
      user: {
        userId: this.userId,
        userName: userName,
      },
      status: "Cadastrada",
    });
  },

  "tasks.remove"(taskId) {
    check(taskId, String);

    if (!this.userId) {
      throw new Meteor.Error(
        "Usuario inválido!",
        "Você não possui autorização para realizar a ação solicitada. Agradecemos pela compreensão."
      );
    }

    TasksCollection.remove(taskId);
  },

  "tasks.setStatus"(taskId, status) {
    check(taskId, String);
    check(status, String);

    if (!this.userId) {
      throw new Meteor.Error(
        "Usuario inválido!",
        "Você não possui autorização para realizar a ação solicitada. Agradecemos pela compreensão."
      );
    }

    TasksCollection.update(taskId, {
      $set: {
        status: status,
      },
    });
  },
});
