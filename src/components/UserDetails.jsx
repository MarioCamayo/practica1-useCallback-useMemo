import { useCallback, useEffect, useState } from "react";

// Componente UserDetails que toma userId como prop
const UserDetails = ({ userId }) => {
  // Estado para almacenar los datos del usuario
  const [user, setUser] = useState({});

  // Función memorizada para obtener los datos del usuario de la API
  const getUsers = useCallback(async () => {
    try {
      // Hacer una solicitud fetch para obtener datos del usuario basado en el userId
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
      const data = await response.json();
      console.log(data); // Imprimir los datos en la consola (solo para depuración)
      setUser(data); // Actualizar el estado con los datos obtenidos
    } catch (error) {
      console.error("Error fetching user data:", error); // Manejo de errores en caso de que la solicitud falle
    }
  }, [userId]); // Dependencia del userId para regenerar la función si cambia

  // useEffect para ejecutar la función getUsers cuando el componente se monta o cuando getUsers cambia
  useEffect(() => {
    getUsers();
  }, [getUsers]); // Dependencia del getUsers para ejecutar el efecto nuevamente si cambia

  return (
    <div>
      {/* Renderizar el nombre y el email del usuario si están disponibles */}
      <p>{user.name}</p>
      <p>{user.email}</p>
    </div>
  );
};

export default UserDetails;
