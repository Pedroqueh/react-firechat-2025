import { updateProfile } from "firebase/auth";
import { useState } from "react";
import { useUser } from "reactfire";

export const useProfileActions = () => {
  const [loading, setLoading] = useState(false);
  const { data: user } = useUser();

  //Para actualizar la información del usuario
  const updateUserProfile = async (data: {
    displayName?: string;
    photoURL?: string;
  }) => {
    if (!user) {
      throw new Error("Usuario no autenticado");
    }

    setLoading(true);
    try {
      await updateProfile(user, {
        displayName: data.displayName || user.displayName,
        photoURL: data.photoURL || user.photoURL,
      });
      return {
        success: true,
      };
    } catch (error) {
      console.error("Error al actualizar el perfil", error);
      return {
        success: false,
      };
    } finally {
      setLoading(false);
    }
  };
  //Al ser un custom hook hay que retornarlo
  return {
    updateUserProfile,
    loading,
  };
};
