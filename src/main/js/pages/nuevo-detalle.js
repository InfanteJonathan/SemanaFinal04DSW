const React = require("react");
const client = require("../client");
const { Link, useParams } = require("react-router-dom");
const { useState, useEffect } = require("react");

const PageNuevodetalle = () => {
  let { id } = useParams();
  const [ventas, setventas] = useState([]);
  const [productos, setproductos] = useState([]);
  const [idventa, setidventa] = useState("");
  const [idproducto, setidproducto] = useState("");
  const [cantidad, setcantidad] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    client({
      method: "POST",
      path: "/api/detalles",
      entity: {
        venta: "http://localhost:8080/api/ventas/" + idventa,
        producto: "http://localhost:8080/api/productos/" + idproducto,
        cantidad: cantidad,
      },
      headers: { "Content-Type": "application/json" },
    }).done(() => {
      window.location = "/";
    });
  };

  useEffect(() => {
    client({
      method: "GET",
      path: "/api/ventas",
    }).done((response) => {
      let ventas2 = [];
      response.entity._embedded.ventas.map((venta) => {
        ventas2.push({
          value: venta._links.self.href.split("/").slice(-1),
          label: venta.id,
        });
      });
      setventas(ventas2);
    });
    client({
      method: "GET",
      path: "/api/productos",
    }).done((response) => {
      let productos2 = [];
      response.entity._embedded.productos.map((producto) => {
        productos2.push({
          value: producto._links.self.href.split("/").slice(-1),
          label: producto.id,
        });
      });
      setproductos(productos2);
    });

    console.log(ventas);
    console.log(productos);
  }, []);

  return (
    <>
      <h1>Nuevo detalle</h1>
      <form onSubmit={handleSubmit}>
        <br />
        <label htmlFor="venta">Id Venta</label>
        <select
          name="venta"
          id="venta"
          onChange={(e) => {
            setidventa(e.target.value);
          }}
        >
          {ventas.map((venta) => {
            console.log(venta);
            return (
              <option key={venta.value} value={venta.value}>
                {venta.id}
              </option>
            );
          })}
        </select>
        <br />
        <label htmlFor="producto">Id Producto</label>
        <select
          name="producto"
          id="producto"
          onChange={(e) => {
            setidproducto(e.target.value);
          }}
        >
          {productos.map((producto) => {
            return (
              <option key={producto.value} value={producto.value}>
                {producto.id}
              </option>
            );
          })}
        </select>
        <br />
        <label htmlFor="cantidad">Cantidad</label>
        <input
          type="number"
          id="cantidad"
          name="cantidad"
          onChange={(e) => setcantidad(e.target.value)}
        />
        <br />
        <br />
        <input type="submit" value="Nuevo detalle" />
      </form>
      <Link to="/">Volver</Link>
    </>
  );
};

module.exports = PageNuevodetalle;
