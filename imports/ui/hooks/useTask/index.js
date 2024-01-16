import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "../../../db/TasksCollection.js";
import { useUsuario } from "../../hooks";
export function useTask() {
  const { user } = useUsuario();

  const {
    tasks,
    tasksCount,
    tasksEmAndamento,
    emAndamentosCount,
    tasksConcluidas,
    concluidasCount,
    tasksCadastradas,
    cadastradasCount,
  } = useTracker(() => {
    if (!user) {
      return {
        tasks: undefined,
        tasksCount: undefined,
        tasksEmAndamento: undefined,
        emAndamentosCount: undefined,
        tasksConcluidas: undefined,
        concluidasCount: undefined,
        tasksCadastradas: undefined,
        cadastradasCount: undefined,
      };
    }

    if (!Meteor.subscribe("tasks").ready()) {
      return {
        tasks: undefined,
        tasksCount: undefined,
        tasksEmAndamento: undefined,
        emAndamentosCount: undefined,
        tasksConcluidas: undefined,
        concluidasCount: undefined,
        tasksCadastradas: undefined,
        cadastradasCount: undefined,
      };
    }

    const allTasks = TasksCollection.find().fetch();
    const tasksCount = allTasks.length;

    const emAndamentoTasks = TasksCollection.find({
      status: "Em andamento",
    }).fetch();
    const emAndamentosCount = emAndamentoTasks.length;

    const concluidasTasks = TasksCollection.find({
      status: "Concluída",
    }).fetch();
    const concluidasCount = concluidasTasks.length;

    const cadastradasTasks = TasksCollection.find({
      status: "Cadastrada",
    }).fetch();
    const cadastradasCount = cadastradasTasks.length;

    return {
      tasks: allTasks,
      tasksCount,
      tasksEmAndamento: emAndamentoTasks,
      emAndamentosCount,
      tasksConcluidas: concluidasTasks,
      concluidasCount,
      tasksCadastradas: cadastradasTasks,
      cadastradasCount,
    };
  });

  return {
    tasks,
    tasksCount,
    tasksEmAndamento,
    emAndamentosCount,
    tasksConcluidas,
    concluidasCount,
    tasksCadastradas,
    cadastradasCount,
  };
}
