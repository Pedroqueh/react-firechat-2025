import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "reactfire";

const RegisterPage = () => {
  //Para habilitar el btn de Google
  const auth = useAuth();

  const handleClickGoogle = async () => {
    try {
      //Crear un nuevo provider
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      console.log("Usuario inicio sesión exitosamente");
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <button onClick={handleClickGoogle}>Iniciar sesión con Google</button>
    </div>
  );
};

export default RegisterPage;
