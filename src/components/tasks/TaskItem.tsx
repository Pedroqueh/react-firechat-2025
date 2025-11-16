import { useTaskActions } from "@/hooks/use-task-actions";
import type { Task } from "@/schemas/task.schema";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Props {
  task: Task;
}

const TaskItem = ({ task }: Props) => {
  const { deleteTask, toggleTaskCompletion } = useTaskActions();
  const [isPending, startTransition] = useTransition();

  //Handles
  const handleDelete = async () => {
    startTransition(async () => {
      try {
        await deleteTask(task.id);
      } catch (error) {
        console.log(error);
        toast.error("Error al borrar la tarea");
      }
    });
  };

  const handleToggleCompletion = async () => {
    startTransition(async () => {
      try {
        await toggleTaskCompletion(task.id);
      } catch (error) {
        console.log(error);
        toast.error("Error al actualizar la tarea");
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle
          className={cn(
            "text-lg font-semibold",
            task.completed ? "line-through text-gray-500" : ""
          )}
        >
          {task.title}
        </CardTitle>
        <CardAction className="space-x-2">
          <Button
            variant={"outline"}
            onClick={handleToggleCompletion}
            disabled={isPending}
          >
            Actualizar
          </Button>
          <Button
            variant={"destructive"}
            onClick={handleDelete}
            disabled={isPending}
          >
            Delete
          </Button>
        </CardAction>
        <CardContent
          className={cn(
            "text-lg font-semibold",
            task.completed ? "line-through text-gray-500" : ""
          )}
        >
          {task.description && <CardContent>{task.description}</CardContent>}
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default TaskItem;
