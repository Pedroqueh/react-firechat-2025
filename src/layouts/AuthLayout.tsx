import { Navigate, Outlet } from "react-router";
import { useSigninCheck } from "reactfire";

const AuthLayout = () => {
  const { status, data: signInCheckResult, hasEmitted } = useSigninCheck();

  //Mostrar Loading mientras se verefica el estado de inicio de sesión
  if (status === "loading" || !hasEmitted) {
    return <div>Cargando...</div>;
  }

  //Redirigir al usuario si ya está autenticado
  if (status === "success" && signInCheckResult.signedIn) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
