import { Meteor } from "meteor/meteor";

Meteor.publish("users", function publishUsers() {
  if (this.userId) {
    const user = Meteor.users.find(
      { _id: this.userId },
      {
        fields: { "profile.email": 1, "profile.idade": 1, "profile.genero": 1 },
      }
    );
    return user;
  }
  return undefined;
});
