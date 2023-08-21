const React = require("react");
const { useState, useEffect } = require("react");
const { useParams, Link } = require("react-router-dom");
const client = require("../client");

const PageEditarProducto = () => {
  const { id } = useParams();
  const [producto, setproducto] = useState({});

  useEffect(() => {
    client({
      method: "GET",
      path: "/api/productos/" + id,
      headers: { "Content-Type": "application/json" },
    }).done((response) => {
      setproducto(response.entity);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isNaN(parseFloat(producto.precio))) {
      client({
        method: "PATCH",
        path: "/api/productos/" + id,
        headers: { "Content-Type": "application/json" },
        entity: producto,
      }).done(() => (window.location = "/"));
    } else {
      alert("Por favor, ingrese un precio válido.");
    }
  };

  return (
    <>
      <h1>Editar Producto: {id}</h1>

      <form onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          value={producto.nombre}
          onChange={(e) => {
            setproducto({ ...producto, nombre: e.target.value });
          }}
        />
        <br />

        <label>Precio</label>
        <input
          type="text"
          name="precio"
          value={producto.precio}
          onChange={(e) => {
            setproducto({ ...producto, precio: e.target.value });
          }}
        />
        <br />

        <input type="submit" value={`Editar producto ${id}`} />
      </form>
      <Link to="/">Volver</Link>
    </>
  );
};

module.exports = PageEditarProducto;
