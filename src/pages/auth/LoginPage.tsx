import { Button } from "@/components/ui/button";
import { useAuthActions } from "../../hooks/use-auth-actions";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

const LoginPage = () => {
  const { loginWithGoogle } = useAuthActions();

  const handleLoginWithGoogle = async () => {
    const result = await loginWithGoogle();
    if (result.success) {
      console.log("Login correcto");
    } else {
      console.error("Ha fallado el login:", result.error);
      toast.error("Login failed ");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inicia sesión</CardTitle>
        <CardDescription>
          Puedes ingresar con tu usuario o con Google.
        </CardDescription>
        <CardAction>
          <Button variant="link">Crear cuenta</Button>
        </CardAction>
      </CardHeader>
      <CardContent>...</CardContent>
      <CardFooter>
        <Button onClick={handleLoginWithGoogle} className="w-full">
          Login con Google
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoginPage;
