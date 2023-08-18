import React, { useState, useEffect } from 'react';
import SolicitudesLibros from './SolicitudesLibros';
const App = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [socios, setSocios] = useState([]);
  const [libros, setLibros] = useState([]);

  // API
  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const response = await fetch('http://45.236.130.191/api-prueba/biblioteca.php?action=solicitudes');
        const data = await response.json();
        setSolicitudes(data);
      } catch (error) {
        console.error('Error al obtener las solicitudes:', error);
      }
    };

    const fetchSocios = async () => {
      try {
        const response = await fetch('http://45.236.130.191/api-prueba/biblioteca.php?action=socios');
        const data = await response.json();
        setSocios(data);
      } catch (error) {
        console.error('Error al obtener los socios:', error);
      }
    };

    const fetchLibros = async () => {
      try {
        const response = await fetch('http://45.236.130.191/api-prueba/biblioteca.php?action=libros');
        const data = await response.json();
        setLibros(data);
      } catch (error) {
        console.error('Error al obtener los libros:', error);
      }
    };

    fetchSolicitudes();
    fetchSocios();
    fetchLibros();
  }, []);


  return (
    <div>
      <h1>Biblioteca React</h1>
      <SolicitudesLibros solicitudes={solicitudes} />
    </div>
  );
};

export default App;
