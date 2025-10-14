import { Navigate, Outlet } from "react-router";
import { useSigninCheck } from "reactfire";

const AdminLayout = () => {
  const { status, data: signInCheckResult, hasEmitted } = useSigninCheck();

  //Mostrar Loading mientras se verefica el estado de inicio de sesión
  if (status === "loading" || !hasEmitted) {
    return <div>Cargando...</div>;
  }

  //Redirigir si el usuario no esta autenticado
  if (status === "success" && !signInCheckResult.signedIn) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
