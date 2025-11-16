import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CardFooterAuth from "@/components/CardFooterAuth";
import { useAuthActions } from "@/hooks/use-auth-actions";
import { loginZodSchema, type loginZodSchemaType } from "@/lib/zodSchemas";

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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const { loading, login } = useAuthActions();

  //1. Definición del form
  const form = useForm<loginZodSchemaType>({
    resolver: zodResolver(loginZodSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //2. Definición de submit handler
  const onSubmit = async (data: loginZodSchemaType) => {
    //Manejo lógica login
    const response = await login(data);
    if (!response.success) {
      console.log(response);
      if (response.error?.code === "auth/invalid-login-credentials") {
        form.setError("email", {
          type: "manual",
          message: "Email o contraseña inválidos",
        });
        form.setError("password", {
          type: "manual",
          message: "Email o contraseña inválidos",
        });
      }
      return;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inicia sesión</CardTitle>
        <CardDescription>
          Puedes ingresar con tu usuario o con Google.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Ingresa tu email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="*******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Cargando" : "Iniciar sesión"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooterAuth type="login" loading={loading} />
    </Card>
  );
};

export default LoginPage;
