const React = require("react");
const client = require("../client");
const { Link } = require("react-router-dom");
const { useState } = require("react");

const PageNuevoventa = () => {
  const [total, setTotal] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    client({
      method: "POST",
      path: "/api/ventas",
      entity: {
        total: total,
      },
      headers: { "Content-Type": "application/json" },
    }).done(() => {
      window.location = "/";
    });
  };

  return (
    <>
      <h1>Nuevo venta</h1>
      <form onSubmit={handleSubmit}>
        <br />
        <label htmlFor="total">Total</label>
        <input
          type="number"
          id="total"
          name="total"
          onChange={(e) => setTotal(e.target.value)}
        />
        <br />
        <br />
        <input type="submit" value="Nuevo venta" />
      </form>
      <Link to="/">Volver</Link>
    </>
  );
};

module.exports = PageNuevoventa;
