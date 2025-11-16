import Navbar from "@/components/Navbar";
import { Suspense } from "react";
import { Navigate, Outlet } from "react-router";
import { useSigninCheck, useUser } from "reactfire";

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
    <Suspense fallback={<div>Cargando usuario...</div>}>
      <AuthenticatedLayout />
    </Suspense>
  );
};

export default AdminLayout;

//Suspense para esperar que el usuario cargue
const AuthenticatedLayout = () => {
  //Mantiene los datos cacheados, para no tener que hacer una nueva solicitud
  useUser({
    suspense: true,
  });

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <Outlet />
      </div>
    </div>
  );
};
