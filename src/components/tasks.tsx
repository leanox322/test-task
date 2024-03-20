import React, { useState, FC } from "react";
import { useActions } from "../hooks/useActions";
import { selectTasks, selectFilter } from "../store/taskSlice";
import { useTypedSelector } from "../hooks/useTypedSelector";

const Tasks: FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const { addTask, toggleTask, setFilter, deleteTask } = useActions();

  const tasks = useTypedSelector(selectTasks);
  const filter = useTypedSelector(selectFilter);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "current") return !task.completed;
    return true;
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValue.trim().length > 10) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2500);
    } else {
      addTask(inputValue);
      setInputValue("");
    }
  };

  const handleDeleteTask = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteTask(id);
  };

  return (
    <div className="max-w-xl mx-auto my-10">
      {showAlert && (
        <div
          className="p-4 mb-4 text-sm text-purple-700 bg-purple-100 rounded-lg"
          role="alert"
        >
          Task name cannot be greater than 10 characters.
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex gap-3 mb-5">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 p-3 border-2 border-gray-200 rounded-lg shadow-sm"
          placeholder="Enter a new task"
        />
        <button
          type="submit"
          disabled={!inputValue}
          className="px-5 py-2 bg-indigo-500 disabled:bg-indigo-300 text-white font-semibold rounded-lg shadow"
        >
          Add
        </button>
      </form>
      <div>
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`flex justify-between items-center p-3 mb-2 cursor-pointer rounded-lg shadow-sm transition-colors ${
              task.completed ? "bg-teal-100" : "bg-amber-100"
            }`}
            onClick={() => toggleTask(task.id)}
          >
            <span>
              {task.name} - {task.completed ? "Completed" : "Not completed"}
            </span>
            <button
              onClick={(e) => handleDeleteTask(task.id, e)}
              className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="mb-5">
        <span className="mr-2 font-medium">Filter:</span>
        <button
          onClick={() => setFilter("all")}
          className="mr-2 px-3 py-1 bg-gray-200 rounded-lg shadow text-gray-800"
        >
          All
        </button>
        <button
          onClick={() => setFilter("completed")}
          className="mr-2 px-3 py-1 bg-teal-200 rounded-lg shadow text-teal-800"
        >
          Completed
        </button>
        <button
          onClick={() => setFilter("current")}
          className="px-3 py-1 bg-amber-200 rounded-lg shadow text-amber-800"
        >
          Current
        </button>
      </div>
      <div className="text-sm font-light">
        Completed: {tasks.filter((task) => task.completed).length} / Not
        Completed: {tasks.filter((task) => !task.completed).length}
      </div>
    </div>
  );
};

export default Tasks;
