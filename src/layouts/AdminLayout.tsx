import Navbar from "@/components/Navbar";
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
      <Navbar />

      <div className="container mx-auto p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
