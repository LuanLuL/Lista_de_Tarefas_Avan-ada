import { Meteor } from "meteor/meteor";
import { TasksCollection } from "/imports/db/TasksCollection";

Meteor.publish("tasks", function publishTasks() {
  if (this.userId) {
    return TasksCollection.find({
      $or: [{ "user.userId": this.userId }, { categoria: "Normal" }],
    });
  }
  return undefined;
});
