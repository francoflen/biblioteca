import React from 'react';

const SolicitudesLibros = ({ solicitudes }) => {
  return (
    <div>
      <h2>Solicitudes de Libros</h2>
      <table>
        <thead>
          <tr>
            <th>Socio</th>
            <th>Libro</th>
            <th>Fecha de Solicitud</th>
          </tr>
        </thead>
        <tbody>
          {solicitudes.map((solicitud) => (
            <tr key={solicitud.id}>
              <td>{solicitud.socio}</td>
              <td>{solicitud.libro}</td>
              <td>{solicitud.fechaSolicitud}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SolicitudesLibros;
