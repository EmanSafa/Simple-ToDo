export const addTaskValidation = (task: { title: string }) => {
  const error = { title: "" };
  if (
    !task.title.trim() ||
    task.title.length < 10 ||
    task.title.length > 100
  ){
    error.title = "type your task it must be more than 10 characters"
  }
    return error;
};

