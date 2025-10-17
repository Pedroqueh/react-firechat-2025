import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CardFooterAuth from "@/components/ui/CardFooterAuth";
import { useAuthActions } from "@/hooks/use-auth-actions";

const RegisterPage = () => {
  const { loading } = useAuthActions();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registrarse</CardTitle>
        <CardDescription>
          Puedes registrarte con tu usuario o con Google.
        </CardDescription>
      </CardHeader>
      <CardContent>...</CardContent>
      <CardFooterAuth type="register" loading={loading} />
    </Card>
  );
};

export default RegisterPage;
