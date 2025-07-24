import "./App.css";
import Task from "./Components/Task";
import { Tasks } from "./Components/Data/index";
import { useState, type ChangeEvent, type MouseEvent } from "react";
import Model from "./Components/UI/Model";
import type { ITask } from "./Components/Interface";
import { v4 as uuidv4 } from "uuid";
import { addTaskValidation } from "./Validation";
import ErrorMsg from "./Components/errorMsg";

function App() {
  const defaultNewTask = {
    title: "",
    id: "",
    completed: false,
  };
  //-------------------STATES------------------
  const [isOpened, setIsOpened] = useState(false);
  const [isEditOpened, setIsEditOpened] = useState(false);
  const [isRemoveOpened, setIsRemoveOpened] = useState(false);
  const [tasks, setTasks] = useState<ITask[]>(Tasks);
  const [taskToEditIdx, setTaskToEditIdx] = useState<number>(0);
  const [taskToEdit, setTaskToEdit] = useState<ITask>(defaultNewTask);
  const [newTask, setNewTask] = useState<ITask>({
    title: "",
    id: "",
    completed: false,
  });
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [error, setError] = useState("");

  //-------------------HANDELERS------------------
  const openModel = () => setIsOpened(true);
  const closeModel = () => setIsOpened(false);
  const openEditModel = () => setIsEditOpened(true);
  const closeEditModel = () => setIsEditOpened(false);
  const openRemoveModel = (taskId: string) => {
    setTaskToDelete(taskId);
    setIsRemoveOpened(true);
  };
  const closeRemoveModel = () => setIsRemoveOpened(false);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };
  const onChangeEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTaskToEdit({ ...taskToEdit, [name]: value });
  };
  const onSubmitHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setNewTask({ title: "", id: "", completed: false });
    const validation = addTaskValidation({ title: newTask.title });
    if (validation) {
      setError(validation.title);
      return;
    }

    setTasks((prev) => [...prev, { ...newTask, id: uuidv4() }]);
    closeModel();
  };
  const onCancel = () => {
    setNewTask(defaultNewTask);
    closeModel();
  };
  const onCancelEditModel = () => {
    closeEditModel();
  };
  const onSubmitEditHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const updatedTasks = [...tasks];
    updatedTasks[taskToEditIdx] = {
      ...taskToEdit,
    };
    setTasks(updatedTasks);
    closeEditModel();
  };
  const handleClick = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, isClicked: !task.isClicked } : task
      )
    );
  };
  const handleDelete = (taskId: string) => {
    const filterd = tasks.filter((task) => taskId !== task.id);
    setTasks(filterd);
    closeRemoveModel();
  };

  return (
    <>
      <div className="border-1 border-neutral-600 p-3 flex flex-col gap-3 items-center justify-center rounded-md">
        <div className="flex w-full justify-around m-5 items-center ">
          <h1 className=" text-4xl shadow-xl ">ToDo </h1>
          <button
            className="text-xl p-2 rounded-md text-white hover:bg-white hover:border-none hover:text-neutral-800 border-1 m-2  border-gray-300 transition-colors duration-200 hover:cursor-pointer"
            onClick={openModel}
          >
            Add Task
          </button>
          <Model isOpen={isOpened} isClosed={closeModel} title="ADD TASK">
            <input
              type="text"
              className=" h-14  text-lg focus:border-1 focus:border-zinc-400 w-full mt-2 rounded-md shadow-2xl p-3"
              name="title"
              value={newTask.title}
              onChange={onChangeHandler}
            />
            {error && <ErrorMsg msg={error} />}
            <button
              className="mt-3 mr-3 inline-flex rounded-md bg-gray-700 px-3 py-1.5 text-md font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
              onClick={onSubmitHandler}
            >
              Sumbit
            </button>
            <button
              className="mt-3 inline-flex rounded-md bg-gray-700 px-3 py-1.5 text-md font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
              onClick={onCancel}
            >
              Cancel
            </button>
          </Model>
          <Model
            isOpen={isRemoveOpened}
            isClosed={closeRemoveModel}
            title="Are You sure to Delete this task ?"
          >
            <div className="flex gap-2 items-center justify-center">
              <button
                className=" w-full mt-3 inline-flex rounded-md bg-gray-700 px-3 py-1.5 text-md font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white hover:bg-zinc-600"
                onClick={() => taskToDelete && handleDelete(taskToDelete)}
              >
                Yes , I'm Sure
              </button>
              <button
                className=" w-full mt-3 inline-flex rounded-md bg-gray-700 px-3 py-1.5 text-md font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline focus:outline-white  hover:bg-zinc-600"
                onClick={closeRemoveModel}
              >
                Cancel
              </button>
            </div>
          </Model>
          <Model
            isOpen={isEditOpened}
            isClosed={closeEditModel}
            title="Edit the Task"
          >
            <input
              type="text"
              className=" h-14  text-lg focus:border-1 focus:border-zinc-400 w-full mt-2 rounded-md shadow-2xl p-3"
              name="title"
              value={taskToEdit.title}
              onChange={onChangeEditHandler}
            />
            <div className="flex gap-2 items-center justify-center">
              <button
                className=" w-full mt-3 inline-flex rounded-md bg-gray-700 px-3 py-1.5 text-md font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white hover:bg-zinc-600"
                onClick={onSubmitEditHandler}
              >
                Submit
              </button>
              <button
                className=" w-full mt-3 inline-flex rounded-md bg-gray-700 px-3 py-1.5 text-md font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline focus:outline-white  hover:bg-zinc-600"
                onSubmit={onCancelEditModel}
              >
                Cancel
              </button>
            </div>
            <div />
          </Model>
        </div>
        {tasks.map((task, idx) => (
          <Task
            key={task.id}
            title={task.title}
            id={task.id}
            completed={task.completed}
            onclick={() => handleClick(task.id)}
            isClicked={task.isClicked}
            openDeleteModel={() => openRemoveModel(task.id)}
            openEditModel={() => {
              setTaskToEditIdx(idx);
              setTaskToEdit(task);
              openEditModel();
            }}
          />
        ))}
      </div>
    </>
  );
}

export default App;
