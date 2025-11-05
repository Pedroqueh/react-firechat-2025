import { z } from "zod";

//Validación login
export const loginZodSchema = z.object({
  email: z.string().trim().pipe(z.email("Formato email inválido")),
  password: z.string().min(6, "Largo mínimo contraseña 6 caracteres"),
});

export type loginZodSchemaType = z.infer<typeof loginZodSchema>;

export const registerZodSchema = z
  .object({
    email: z.string().trim().pipe(z.email()),
    displayName: z
      .string()
      .min(2, "El nombre es requerido")
      .max(50, "El nombre no puede superar los 50 caracteres"),
    password: z.string().min(6, "La contraseña debe tener 6 caracteres minímo"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"], // Esto hace que el error aparezca en el campo confirmPassword
  });

export type RegisterZodSchemaType = z.infer<typeof registerZodSchema>;

export const profileZodSchema = z.object({
  displayName: z
    .string()
    .min(1, "Se requiere un nombre")
    .max(50, "El nombre no puede superar los 50 caracteres"),
  photoURL: z.url().optional(),
});

export type ProfileZodSchemaType = z.infer<typeof profileZodSchema>;
