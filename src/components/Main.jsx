import { useCallback, useState, useMemo} from "react";

const Main = () => {
  const [count, setCount] = useState(0);

  // const doble = ()=>{
  //   setCount(count * 2)
  // }

  const doble = ()=>{
    return count * 2 
 }

  const callback = useCallback(doble, [count]);
  const memo = useMemo(doble, []);

  // console.log(callback);
  console.log(callback());
  
  // console.log(memo);

  return (
    <div>
      {/* <h1 onClick={()=>setCount(doble)} > {count}  </h1> */}
      <h1> {count} </h1>
      <button onClick={()=>setCount(count + 1)}>Incrementar</button>
    </div>
  )
}

export default Main

/*
Explicación
useCallback y useMemo:

Ambos hooks son utilizados para optimizar el rendimiento de componentes en React.
useCallback memoriza una función, es decir, guarda una referencia a esa función para que no se recree en cada renderizado del componente. Se utiliza principalmente cuando se pasa una función a un componente hijo que depende de esa función, para evitar que el componente hijo se vuelva a renderizar innecesariamente.
useMemo memoriza un valor calculado, lo que significa que guarda el resultado de una operación costosa y solo la vuelve a calcular si sus dependencias cambian.
Costos de uso:

Aunque useCallback y useMemo pueden mejorar el rendimiento evitando cálculos y renderizados innecesarios, su uso también tiene un costo. Cada vez que se utiliza uno de estos hooks, React debe guardar y comparar referencias de funciones o valores memorizados, lo que puede añadir complejidad y costo computacional.
¿Cuándo usarlos?:

Rendimiento justificado: Se recomienda usar estos hooks solo cuando se ha identificado un problema de rendimiento claro. Por ejemplo, si una función o cálculo es muy costoso y se está ejecutando muchas veces innecesariamente, o si hay componentes hijos que se están volviendo a renderizar constantemente debido a referencias de funciones que cambian.
React maneja optimización automáticamente: En muchos casos, React es lo suficientemente eficiente sin estas optimizaciones manuales. React utiliza un algoritmo de "reconciliación" para determinar cuándo debe actualizar el DOM y ya realiza una serie de optimizaciones internas para minimizar los cambios y mejorar el rendimiento.
Conclusión
La clave es usar useCallback y useMemo solo cuando sea realmente necesario para mejorar el rendimiento. Agregar estos hooks innecesariamente puede hacer que el código sea más complicado sin beneficios significativos, e incluso puede perjudicar el rendimiento si se usan mal. Es importante hacer un uso consciente y medido de estas herramientas para mantener el código limpio, eficiente y fácil de mantener.
*/  