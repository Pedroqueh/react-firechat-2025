import TaskForm from "@/components/tasks/TaskForm";
import TaskList from "@/components/tasks/TaskList";
import { Suspense } from "react";

const TasksPage = () => {
  return (
    <div>
      <h1 className="text-2xl">Tasks</h1>

      <TaskForm />

      <Suspense fallback={<div>Cargando tareas...</div>}>
        <TaskList />
      </Suspense>
    </div>
  );
};

export default TasksPage;
