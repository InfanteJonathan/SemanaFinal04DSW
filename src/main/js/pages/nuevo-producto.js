const React = require("react");
const client = require("../client");
const { Link } = require("react-router-dom");
const { useState } = require("react");

const PageNuevoProducto = () => {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    client({
      method: "POST",
      path: "/api/productos",
      entity: {
        nombre: nombre,
        precio: precio,
      },
      headers: { "Content-Type": "application/json" },
    }).done(() => {
      window.location = "/";
    });
  };

  return (
    <>
      <h1>Nuevo Producto</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          onChange={(e) => setNombre(e.target.value)}
        />
        <br />
        <label htmlFor="precio">Precio</label>
        <input
          type="number"
          id="precio"
          name="precio"
          onChange={(e) => setPrecio(e.target.value)}
        />
        <br />
        <br />
        <input type="submit" value="Nuevo Producto" />
      </form>
      <Link to="/">Volver</Link>
    </>
  );
};

module.exports = PageNuevoProducto;
