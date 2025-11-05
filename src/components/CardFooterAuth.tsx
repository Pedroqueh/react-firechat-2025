import { toast } from "sonner";
import { Button } from "./ui/button";
import { CardFooter } from "./ui/card";
import { useAuthActions } from "@/hooks/use-auth-actions";
import { Mail } from "lucide-react";
import { Link } from "react-router";

interface Props {
  type: "login" | "register";
  loading: boolean;
}

const CardFooterAuth = ({ type, loading }: Props) => {
  const isLogin = type === "login";

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
    <CardFooter className="flex flex-col items-center gap-4">
      <Button
        onClick={handleLoginWithGoogle}
        className="w-full"
        disabled={loading}
        variant="outline"
      >
        <Mail className="mr-2" />
        {isLogin ? "Login con Google" : "Registrarse con Google"}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        {isLogin ? "¿No tienes una cuenta? " : "¿Ya tienes una cuenta? "}
        <Link to={isLogin ? "/auth/register" : "/auth/login"}>
          <Button variant="link" className="p-0 h-auto font-normal">
            {isLogin ? "Registrarse" : "Iniciar sesión"}
          </Button>
        </Link>
      </p>
    </CardFooter>
  );
};

export default CardFooterAuth;
