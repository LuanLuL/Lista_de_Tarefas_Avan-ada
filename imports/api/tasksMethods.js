import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { TasksCollection } from "../db/TasksCollection";

Meteor.methods({
  "tasks.insert"(text) {
    check(text, String);

    if (!this.userId) {
      throw new Meteor.Error("Não autorizado.");
    }

    TasksCollection.insert({
      text: text,
      createdAt: new Date(),
      userId: this.userId,
    });
  },

  "tasks.remove"(taskId) {
    check(taskId, String);

    if (!this.userId) {
      throw new Meteor.Error("Não autorizado.");
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
