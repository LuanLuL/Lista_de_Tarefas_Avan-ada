import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "../../../db/TasksCollection.js";
import { useUsuario } from "../../hooks";
import { useState } from "react";
export function useTask() {
  const { user } = useUsuario();

  const [showJustCompletedTasks, setShowJustCompletedTasks] = useState(false);

  //const buscaSomenteAsCompletas = { isChecked: { $ne: true } };

  //const buscaSomenteAsDoUsuarioLogado = user ? { userId: user._id } : {};

  //const pendingOnlyFilter = { ...buscaSomenteAsCompletas, ...buscaSomenteAsDoUsuarioLogado };

  const { tasks } = useTracker(() => {
    if (!user) {
      return { tasks: undefined };
    }

    if (!Meteor.subscribe("tasks").ready()) {
      return { tasks: undefined };
    }

    const tasks = TasksCollection.find().fetch();

    return { tasks };
  });

  return { tasks };
}
