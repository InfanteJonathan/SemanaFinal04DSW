const React = require("react");
const client = require("../client");
const { Link, useParams } = require("react-router-dom");
const { useState, useEffect } = require("react");

const PageVerventa = (props) => {
  // const id = props.match.params.id;
  let { id } = useParams();
  const [venta, setventa] = useState({});

  useEffect(() => {
    client({
      method: "GET",
      path: "/api/ventas/" + id,
    }).done((response) => {
      setventa(response.entity);
    });
  }, []);

  return (
    <>
      <h1>Ver venta</h1>
      <table class="table">
        <tbody>
          <tr>
            <th>Total</th>
            <td>{venta.total}</td>
          </tr>
        </tbody>
      </table>

      <Link to="/">Volver</Link>
    </>
  );
};

module.exports = PageVerventa;
