import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { TasksCollection } from "/imports/db/TasksCollection";
import { ServiceConfiguration } from "meteor/service-configuration";
import "/imports/api/tasksMethods";
import "/imports/api/tasksPublications";

const SEED_USERNAME = "meteorite";
const SEED_PASSWORD = "password";

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
});

ServiceConfiguration.configurations.upsert(
  { service: "github" },
  {
    $set: {
      loginStyle: "popup",
      clientId: "3be193ae5c9832492633", // insert your clientId here
      secret: "d163f8cc52cbccff8e356061907dc5196425d5d2", // insert your secret here
    },
  }
);
