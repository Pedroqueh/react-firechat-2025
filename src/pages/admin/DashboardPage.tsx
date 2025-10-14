import { useAuth, useUser } from "reactfire";

const DashboardPage = () => {
  const auth = useAuth();
  const { data: user } = useUser();

  return (
    <div>
      <h1>Dashboard Page</h1>
      <p>Bienvenido, {user?.displayName || "Invitado"}!</p>
      <p>Email: {user?.email || "No informado"}</p>
      <button onClick={() => auth.signOut()}>Cerrar sesión</button>
    </div>
  );
};

export default DashboardPage;
