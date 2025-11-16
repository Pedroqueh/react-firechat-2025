import { taskZodSchema, type TaskZodSchemaType } from "@/lib/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { useTaskActions } from "@/hooks/use-task-actions";
import { toast } from "sonner";
const TaskForm = () => {
  //useTransition
  const [isPending, startTransition] = useTransition();

  const { createTask } = useTaskActions();

  //Método form
  const form = useForm<TaskZodSchemaType>({
    resolver: zodResolver(taskZodSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  //Para procesar el formulario
  function onSubmit(values: TaskZodSchemaType) {
    startTransition(async () => {
      try {
        await createTask(values);
        //Reiniciar formulario
        form.reset();
      } catch (error) {
        console.log(error);
        toast.error("Error al crear la tarea");
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título tarea</FormLabel>
              <FormControl>
                <Input placeholder="Ingresa la tarea" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Input placeholder="Ingresa la descripción" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creando tarea" : "Crear tarea"}
        </Button>
      </form>
    </Form>
  );
};

export default TaskForm;
