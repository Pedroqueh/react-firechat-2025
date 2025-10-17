import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CardFooterAuth from "@/components/ui/CardFooterAuth";
import { useAuthActions } from "@/hooks/use-auth-actions";

const LoginPage = () => {
  const { loading } = useAuthActions();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inicia sesión</CardTitle>
        <CardDescription>
          Puedes ingresar con tu usuario o con Google.
        </CardDescription>
      </CardHeader>
      <CardContent>...</CardContent>
      <CardFooterAuth type="login" loading={loading} />
    </Card>
  );
};

export default LoginPage;
