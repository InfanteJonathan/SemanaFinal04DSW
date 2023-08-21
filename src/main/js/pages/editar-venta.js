const React = require("react");
const { useState, useEffect } = require("react");
const { useParams, Link } = require("react-router-dom");
const client = require("../client");

const PageEditarventa = () => {
  const { id } = useParams();
  const [venta, setventa] = useState({});

  useEffect(() => {
    client({
      method: "GET",
      path: "/api/ventas/" + id,
      headers: { "Content-Type": "application/json" },
    }).done((response) => {
      setventa(response.entity);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isNaN(parseFloat(venta.total))) {
      client({
        method: "PATCH",
        path: "/api/ventas/" + id,
        headers: { "Content-Type": "application/json" },
        entity: venta,
      }).done(() => (window.location = "/"));
    } else {
      alert("Por favor, ingrese un número válido.");
    }
  };

  return (
    <>
      <h1>Editar venta: {id}</h1>

      <form onSubmit={handleSubmit}>
        <label>Total</label>
        <input
          type="text"
          name="total"
          value={venta.total}
          onChange={(e) => {
            setventa({ ...venta, total: e.target.value });
          }}
        />
        <br />

        <input type="submit" value={`Editar venta ${id}`} />
      </form>
      <Link to="/">Volver</Link>
    </>
  );
};

module.exports = PageEditarventa;
