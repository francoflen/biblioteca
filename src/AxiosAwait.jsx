import axios from "axios";
import React, { useState, useEffect } from "react";
import moment from "moment";


const AxiosAwait = () => {
  const [libros, setLibros] = useState([]);
  const [socios, setSocios] = useState([]);
  const [libroSeleccionado, setLibroSeleccionado] = useState("");
  const [socioSeleccionado, setSocioSeleccionado] = useState("");
  const [fechaPrestamo, setFechaPrestamo] = useState("");
  const [fechaDevolucion, setFechaDevolucion] = useState("")
  const [prestamos, setPrestamos] = useState([]);
  const [devoluciones, setDevoluciones] = useState([]);
  const [limpiarDevoluciones, setLimpiarDevoluciones] = useState(false);
  const librosDisponibles = libros.filter(libro => libro.disponible);
  const urlLibros = "http://45.236.130.191/api-prueba/biblioteca.php?action=libros";
  const urlSocios = "http://45.236.130.191/api-prueba/biblioteca.php?action=socios";

  

  useEffect(() => {
    datosApi(urlLibros, setLibros);
    datosApi(urlSocios, setSocios);
    const prestamos = localStorage.getItem("prestamos");
    const devoluciones = localStorage.getItem("devoluciones");
    if (prestamos){
      setPrestamos(JSON.parse(prestamos))
    };
    if (devoluciones){
      setDevoluciones(JSON.parse(devoluciones));
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("prestamos", JSON.stringify(prestamos));
  }, [prestamos]);

  useEffect(() => {
    localStorage.setItem("devoluciones", JSON.stringify(devoluciones));
  }, [devoluciones]);


  const datosApi = async (url, setData) => {
    const response = await axios.get(url);
    setData(response.data);
  };

  const handleLibroChange = (event) => {
    setLibroSeleccionado(event.target.value);
  };

  const handleSocioChange = (event) => {
    setSocioSeleccionado(event.target.value);
  };

  const handleFechaChange = (event) => {
    setFechaPrestamo(event.target.value);
  };

  const handleFechaDChange = (event) => {
    setFechaDevolucion(event.target.value);
  };

  const handleRealizarPrestamo = () => {
    if (!libroSeleccionado || !socioSeleccionado || !fechaPrestamo) {
      alert("No pueden existir campos vacíos");
      return;
    }
    const libroSeleccionadoInfo = libros.find((libro) => libro.titulo === libroSeleccionado);

    if (libroSeleccionado) {
      if (libroSeleccionadoInfo.disponible) {
        const libroPrestado = prestamos.find((prestamo) => prestamo.titulo === libroSeleccionado)
        if (libroPrestado) {
          alert("El libro no está disponible para préstamo. ")
          return;
        }
        
        setPrestamos([...prestamos, { titulo: libroSeleccionado, socio: socioSeleccionado, fechaPrestamo, fechaDevolucion }]);
        const nuevosLibros = libros.map((libro) =>
          libro.titulo === libroSeleccionado ? { ...libro, disponible: false } : libro
        );
        setLibros(nuevosLibros);
        setLibroSeleccionado("");
        setSocioSeleccionado("");
        setFechaPrestamo("");
        setFechaDevolucion("")
        localStorage.setItem("libros", JSON.stringify(nuevosLibros));
      } else {
        alert("El libro no está disponible para préstamo.");
      }
    }
  };

  const handleDevolverLibro = (libroDevolucion) => {
    const fechaActual = moment().format("YYYY-MM-DD");
  
    const actualesPrestamos = prestamos.filter((prestamo) => prestamo.titulo !== libroDevolucion.titulo);
    const nuevosLibros = libros.map((libro) =>
      libro.titulo === libroDevolucion.titulo ? { ...libro, disponible: true } : libro
    );
  
    setPrestamos(actualesPrestamos);
    setLibros(nuevosLibros);
    setDevoluciones([...devoluciones, { titulo: libroDevolucion.titulo, fechaDevolucion: fechaActual }]);
  };

  const prestamoAtrasado = (fechaDevolucion) => {
    const fechaDevolucionObj = new Date(fechaDevolucion);
    const hoy = new Date();
    const diffTime = fechaDevolucionObj.getTime() - hoy.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays < -2;
  };


  
  const Tituloxd = {
    fontFamily: 'Arial, sans-serif',
    fontSize: '36px',
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'BlueViolet',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', 
  };

  const estiloAtrasado = {
    background: "red",
    color: "white",
  };
  const Texto2 = {
    fontFamily: 'Arial, sans-serif',
    fontSize: '20px',
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'BlueViolet',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
  };
  
  const handleLimpiarDevoluciones = () => {
    setDevoluciones([]);
    setLimpiarDevoluciones(true);
  };

  return (
    <>
    <div className="container">
      <div>
      <i style={Tituloxd}>
        Bienvenido a la biblioteca Tony Chopper!              
      </i>
    </div>

      <div style={{ marginBottom: "30px" }}>
      <label htmlFor="librosSelect" style={{margin: "7px"}}>Seleccionar libro:</label>
        <select id="librosSelect" value={libroSeleccionado} onChange={handleLibroChange}>
          <option value="">Seleccione un libro</option>
          {libros.map((libro) => (
            <option key={libro.id} value={libro.titulo}>
              {libro.titulo}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "20px" }}>
      <label htmlFor="sociosSelect" style={{margin: "5px"}}>Seleccionar socio:</label>
        <select id="sociosSelect" value={socioSeleccionado} onChange={handleSocioChange}>
          <option value="">Seleccione un socio</option>
          {socios.map((socio) => (
            <option key={socio.id} value={socio.nombre}>
              {socio.nombre}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="fechaPre" style={{margin: "10px"}}>Fecha Préstamo: </label>
        <input type="date" id="fechaInput" value={fechaPrestamo} onChange={handleFechaChange} />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="fechaDev" style={{margin: "5px"}}>Fecha Devolución:</label>
        <input type="date" id="fechaDev" value={fechaDevolucion} onChange={handleFechaDChange} />
      </div>

      <button
        onClick={handleRealizarPrestamo}
        style={{ marginBottom: "20px", backgroundColor: "blue", color: "white" }}
      >
        Realizar préstamo
      </button>

      <table className="table table-bordered table-striped" style={{border: "1px  black", borderCollapse:"collapse"}}>
        <thead>
          <tr>
            <th style={{ width: "50px", height: "50px", background: "lightgreen", textAlign: "center"}}>Socio</th>
            <th style={{ width: "80px", height: "50px", background: "lightgreen", textAlign: "center" }}>Titulo</th>
            <th style={{ width: "80px", height: "50px", background: "lightgreen", textAlign: "center"}}>Fecha de préstamo</th>
            <th style={{ width: "80px", height: "50px", background: "lightgreen", textAlign: "center"}}>Fecha de devolución</th>
            <th style={{ width: "80px", height: "50px", background: "lightgreen", textAlign: "center"}}>Devolución</th>
          </tr>
        </thead>
        <tbody>
          {prestamos.map((prestamo, index) => (
            <tr key={index}>
              <td style={prestamoAtrasado(prestamo.fechaDevolucion) ? estiloAtrasado : {}}>{prestamo.socio}</td>
              <td style={prestamoAtrasado(prestamo.fechaDevolucion) ? estiloAtrasado : {}}>{prestamo.titulo}</td>
              <td style={prestamoAtrasado(prestamo.fechaDevolucion) ? estiloAtrasado : {}}>{prestamo.fechaPrestamo}</td>
              <td style={prestamoAtrasado(prestamo.fechaDevolucion) ? estiloAtrasado : {}}>{prestamo.fechaDevolucion}</td>
              <td style={{textAlign: "center"}}><button onClick={() => handleDevolverLibro(prestamo)} style={{ marginBottom: "10px", backgroundColor: "green", color: "white" }}>
                Devolver
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
          <i style={Texto2}>Lista de devoluciones</i>
        </div>
        <table className="table table-bordered table-striped" style={{ border: "1px black", borderCollapse: "collapse", marginTop: "20px" }}>
          <thead>
            <tr>
              <th style={{ width: "80px", height: "50px", background: "lightblue", textAlign: "center" }}>Título</th>
              <th style={{ width: "80px", height: "50px", background: "lightblue", textAlign: "center" }}>Fecha de devolución</th>
            </tr>
          </thead>
          <tbody>
            {devoluciones.map((devolucion, index) => (
              <tr key={index}>
                <td>{devolucion.titulo}</td>
                <td>{devolucion.fechaDevolucion}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleLimpiarDevoluciones} style={{ backgroundColor: "red", color: "white" }}>
          Limpiar
        </button>
      </div>
      
    </>
  
  );

};
export default AxiosAwait;