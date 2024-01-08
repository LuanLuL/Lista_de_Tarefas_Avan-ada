import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { Task } from "./Task.jsx";
import { useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "../db/TasksCollection.js";
import { TaskForm } from "./TaskForm.jsx";
import { LoginForm } from "./LoginForm.jsx";

export const App = () => {
  const [showJustCompletedTasks, setShowJustCompletedTasks] = useState(false);

  const hideCompletedFilter = { isChecked: { $ne: true } };

  const user = useTracker(() => Meteor.user());

  const userFilter = user ? { userId: user._id } : {};

  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  const { tasks, pendingTasksCount, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [], pendingTasksCount: 0 };
    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe("tasks");

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const tasks = TasksCollection.find(
      showJustCompletedTasks ? pendingOnlyFilter : userFilter,
      {
        sort: { createdAt: -1 },
      }
    ).fetch();

    const pendingTasksCount = TasksCollection.find(pendingOnlyFilter).count();

    return { tasks, pendingTasksCount };
  });

  function toggleChecked(task) {
    Meteor.call("tasks.setIsChecked", task._id, !task.isChecked);
  }

  function handleUserLogout() {
    Meteor.logout();
  }

  function handleRemoveTask(task) {
    Meteor.call("tasks.remove", task._id);
  }

  return (
    <div className="app">
      {user ? (
        <>
          <header>
            <div className="app-bar">
              <div className="app-header">
                <h1>
                  📝️ Lista de tarefas
                  {pendingTasksCount ? ` (${pendingTasksCount})` : " (0)"}
                </h1>
              </div>
            </div>
          </header>
          <div className="user" onClick={handleUserLogout}>
            {user.username || user.profile.name} 🚪
          </div>
          <div className="main">
            <TaskForm />
            <div className="filter">
              <button
                onClick={() =>
                  setShowJustCompletedTasks(!showJustCompletedTasks)
                }
              >
                {showJustCompletedTasks
                  ? "Mostrar todas as tarefas"
                  : "Mostrar apenas tarefas incompletas"}
              </button>
            </div>
            {isLoading && <div className="loading">loading...</div>}
            <ul className="tasks">
              {tasks.map((task, index) => (
                <Task
                  key={index}
                  task={task}
                  onCheckboxClick={toggleChecked}
                  removeTaks={handleRemoveTask}
                />
              ))}
            </ul>
          </div>
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};
