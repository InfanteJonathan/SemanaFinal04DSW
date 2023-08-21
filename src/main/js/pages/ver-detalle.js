const React = require("react");
const client = require("../client");
const { Link, useParams } = require("react-router-dom");
const { useState, useEffect } = require("react");

const PageVerventaDetalle = () => {
  let { id } = useParams();
  const [detalle, setdetalle] = useState({});
  const [ventaDetalles, setventaDetalles] = useState([]);

  useEffect(() => {
    url_verdetalle = "/api/detalles/" + id;
    client({
      method: "GET",
      path: url_verdetalle,
    }).done((response) => setdetalle(response.entity));

    client({
      method: "GET",
      path: url_verdetalle + "/formacion",
    }).done((response) => setventaDetalles(response.entity));
  }, []);

  return (
    <>
      <h1>Id Detalle</h1>
      <table border="1">
        <tbody>
          <tr>
            <th>Detalle</th>
            <td>{ventaDetalles.ID}</td>
          </tr>
        </tbody>
      </table>
      <hr />
      <h1>Ver Detalle</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Venta</th>
            <th>Producto</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {ventaDetalles.map((ventadetalle) => (
            <tr key={ventadetalle.ID}>
              <td>{ventadetalle.ID}</td>
              <td>{ventadetalle.VENTA}</td>
              <td>{ventadetalle.PRODUCTO}</td>
              <td>{ventadetalle.CANDTIDAD}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
      <Link to="/">Volver</Link>
    </>
  );
};

module.exports = PageVerventaDetalle;
