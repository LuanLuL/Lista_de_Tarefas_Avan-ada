import React, { useState } from "react";
import { Meteor } from "meteor/meteor";

export function TaskForm() {
  const [text, setText] = useState("");

  function handleAddNewTaks(event) {
    event.preventDefault();
    const newTask = text.trim();
    if (newTask === "") {
      return;
    }
    Meteor.call("tasks.insert", newTask);
    setText("");
  }

  return (
    <form className="task-form" onSubmit={handleAddNewTaks}>
      <input
        type="text"
        placeholder="Escreva sua nova tarefa"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Adicionar tarefa</button>
    </form>
  );
}
