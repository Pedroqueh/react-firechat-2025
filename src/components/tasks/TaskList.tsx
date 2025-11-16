import { useTaskActions } from "@/hooks/use-task-actions";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const { tasks } = useTaskActions();

  return (
    <div className="space-y-4 mt-4">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
