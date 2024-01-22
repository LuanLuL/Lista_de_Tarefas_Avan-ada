import { Meteor } from "meteor/meteor";
import { TasksCollection } from "/imports/db/TasksCollection";

Meteor.publish("tasks", function publishTasks() {
  let query = {
    $or: [{ "user.userId": this.userId }, { categoria: "Normal" }],
  };

  if (this.userId) {
    return TasksCollection.find(query);
  }
  return undefined;
});
