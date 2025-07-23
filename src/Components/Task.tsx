import { SquarePen, Trash } from "lucide-react";
interface IProps {
  title: string;
  id: string;
  completed: boolean;
  onclick: () => void;
  isClicked?: boolean;
  openDeleteModel: () => void;
  openEditModel: () => void;
}
const Task = ({
  title,
  id,
  isClicked = false,
  completed,
  onclick,
  openEditModel,
  openDeleteModel,
}: IProps) => {
  return (
    <div
      className="flex justify-between items-center p-3 rounded-md w-1/2 mx-auto shadow-2xl cursor-pointer"
      key={id}
      onClick={onclick}
    >
      <div
        className={`text-2xl ${
          completed ? "line-through mask-linear-from-blue-50" : ""
        } ${isClicked ? "mask-linear-from-blue-50 line-through" : ""}`}
      >
        {title}
      </div>

      <div className="flex gap-2 p-3">
        <button
          className=" hover:cursor-pointer hover:bg-zinc-700 p-2 rounded-full"
          onClick={(e) => {
            openEditModel();
            e.stopPropagation();
          }}
        >
          <SquarePen />
        </button>
        <button
          className="hover:bg-zinc-700 p-2 rounded-full hover:cursor-pointer"
          onClick={(e) => {
            openDeleteModel();
            e.stopPropagation(); // ✋ Prevent triggering parent click
          }}
        >
          <Trash />
        </button>
      </div>
    </div>
  );
};

export default Task;
