import React from "react";

export function Task({ task, onCheckboxClick, removeTaks }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={!!task.isChecked}
        onClick={() => onCheckboxClick(task)}
        readOnly
      />
      <span>{task.text}</span>
      <div className="removeButton">
        <button onClick={() => removeTaks(task)}>&times;</button>
      </div>
    </li>
  );
}
