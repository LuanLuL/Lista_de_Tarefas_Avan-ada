import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
import { Accounts } from "meteor/accounts-base";

Meteor.methods({
  "users.register"(name, password) {
    check(name, String);
    check(password, String);

    if (Accounts.findUserByUsername(name)) {
      throw new Meteor.Error("register-failed", "Nome de usuário já existente");
    }

    Accounts.createUser({
      username: name,
      password: password,
    });
  },
  "users.setRegisterDatas"(email, idade, genero) {
    check(email, String);
    check(idade, Match.Integer);
    check(genero, String);

    if (!this.userId) {
      throw new Meteor.Error("user-invalid", "Usuário não autorizado");
    }

    Meteor.users.update(this.userId, {
      $set: {
        profile: {
          email: email,
          idade: idade,
          genero: genero,
        },
      },
    });
  },
});
