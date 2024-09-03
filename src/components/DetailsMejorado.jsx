import { useCallback, useEffect, useState } from "react";

const DetailsMejorado = ({ userId }) => {
  const [user, setUser] = useState(null); // Cambiado a null para verificar la carga de datos
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  const getUsers = useCallback(async () => {
    setLoading(true); // Iniciar la carga
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.co/users/${userId}`);
      if (!response.ok) throw new Error('No se pudieron obtener los datos del usuario');
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("obteniendo datos del usuario:", error);
      setError(error.message); // Establecer mensaje de error
    } finally {
      setLoading(false); // Finalizar la carga
    }
  }, [userId]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  // Mostrar mensaje de error si ocurre un error
  if (error) return <div>Error: {error}</div>;

  // Mostrar mensaje de carga mientras los datos se están obteniendo
  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {user ? (
        <>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
};

export default DetailsMejorado;


/*  
  Análisis y Mejora
Uso de useCallback:

El uso de useCallback para getUsers está bien implementado porque la función depende de userId. Esto asegura que la función getUsers solo se recree cuando userId cambie, evitando renders innecesarios.
Uso de useEffect:

useEffect se utiliza correctamente para ejecutar getUsers cuando el componente se monta o cuando la función getUsers cambia. Dado que getUsers está memorizada con useCallback, useEffect solo se ejecutará de nuevo si userId cambia.
Manejo de Errores:

Actualmente, el código no maneja errores en la solicitud fetch. Agregar un bloque try...catch dentro de la función getUsers puede ayudar a manejar errores de red o problemas con la respuesta de la API.
Estado Inicial:

user se inicializa como un objeto vacío {}, lo cual está bien. Sin embargo, podrías inicializarlo como null y luego condicionalmente verificar si user existe antes de mostrar sus propiedades en el JSX. Esto puede prevenir errores si los datos del usuario no se han cargado correctamente.
Mejoras en la Renderización:

Sería útil mostrar un estado de "cargando" o algún tipo de feedback visual mientras los datos están siendo obtenidos.
El componente está bien estructurado, pero con algunas mejoras para el manejo de errores y el estado de carga, se puede hacer más robusto y proporcionar una mejor experiencia de usuario.
*/