import { useFirestore, useFirestoreCollectionData, useUser } from "reactfire";
import {
  collection,
  query,
  where,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import type { Task } from "@/schemas/task.schema";

//Leer + agregar + actualizar y eliminar CRUD
export const useTaskActions = () => {
  //Para obtener el usuario autenticado
  const { data: user } = useUser();
  //Si el usuario no existiera
  if (!user) {
    throw new Error("Usuario no autenticado");
  }

  //Tendrá la configuración del proyecto
  const db = useFirestore();
  //Hacer referencia a la colección en Firestore
  const taskCollectionRef = collection(db, "tasks");
  //Query para acceder a información
  const tasksQuery = query(taskCollectionRef, where("userId", "==", user!.uid));
  //Para ejecutar acciones
  //Creación del observable + añadir idField
  const { status, data: tasks } = useFirestoreCollectionData(tasksQuery, {
    idField: "id",
    suspense: true,
  });

  //Creación de tasks
  const createTask = async (data: { title: string; description?: string }) => {
    const newTask = {
      ...data,
      completed: false,
      userId: user!.uid,
    };

    return await addDoc(taskCollectionRef, newTask);
  };

  //Delete task
  const deleteTask = async (taskId: string) => {
    const taskDoc = doc(db, "tasks", taskId);
    return await deleteDoc(taskDoc);
  };

  //Toggle task completetion
  const toggleTaskCompletion = async (taskId: string) => {
    const task = tasks.find((task) => task.id === taskId);

    if (!task) {
      throw new Error("Task no encontrada");
    }

    const taskDoc = doc(db, "tasks", taskId);

    return await updateDoc(taskDoc, {
      completed: !task?.completed,
    });
  };

  return {
    tasks: tasks as Task[],
    //error: status === "error",
    isLoading: status === "loading",

    createTask,
    deleteTask,
    toggleTaskCompletion,
  };
};
