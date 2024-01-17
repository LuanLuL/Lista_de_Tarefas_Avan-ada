import { Meteor } from "meteor/meteor";

Meteor.publish("users", function publishUsers() {
  if (this.userId) {
    const user = Meteor.users.find(
      { _id: this.userId },
      {
        fields: {
          "profile.email": 1,
          "profile.dataNascimento": 1,
          "profile.genero": 1,
          "profile.empresa": 1,
          "profile.foto": 1,
        },
      }
    );
    return user;
  }
  return undefined;
});
