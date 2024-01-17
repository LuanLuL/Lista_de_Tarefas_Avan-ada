import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { ServiceConfiguration } from "meteor/service-configuration";
import "/imports/api/tasksMethods";
import "/imports/api/usersMethods";
import "/imports/api/tasksPublications";
import "/imports/api/usersPublications";

Meteor.startup(() => {});
