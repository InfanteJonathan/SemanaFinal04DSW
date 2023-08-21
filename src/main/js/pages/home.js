const React = require("react");
const client = require("../client");
const { Link } = require("react-router-dom");

class PageHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = { productos: [], ventas: [], detalles: [] };
  }
  componentDidMount() {
    client({ method: "GET", path: "/api/productos" }).done((response) => {
      this.setState({ productos: response.entity._embedded.productos });
    });
    client({ method: "GET", path: "/api/ventas" }).done((response) => {
      this.setState({ ventas: response.entity._embedded.ventas });
    });
    client({ method: "GET", path: "/api/detalles" }).done((response) => {
      this.setState({ detalles: response.entity._embedded.detalles });
    });
  }
  render() {
    return (
      <>
        <h1>EVC04</h1>

        <div style={{ width: "100%", display: "flex" }}>
          <div style={{ width: "calc(100% / 3)" }}>
            <Titulo entidad="Productos" emoji="🛒" />
            <ProductoList productos={this.state.productos} />
            <Link to="/nuevo-producto">Nuevo Producto</Link>
          </div>
          <div style={{ width: "calc(100% / 3)" }}>
            <Titulo entidad="Ventas" emoji="💰" />
            <VentaList ventas={this.state.ventas} />
            <Link to="/nueva-venta">Nueva Venta</Link>
          </div>
          <div style={{ width: "calc(100% / 3)" }}>
            <Titulo entidad="Detalles de Venta" emoji="📝" />
            <DetalleList detalles={this.state.detalles} />
            <Link to="/nuevo-detalle">Nuevo Detalle de Venta</Link>
          </div>
        </div>
      </>
    );
  }
}

const Titulo = (props) => {
  return (
    <>
      <hr />
      <h2>
        {props.emoji} - {props.entidad}
      </h2>
      <span>Listado completo de {props.entidad.toLowerCase()}:</span>
      <hr />
    </>
  );
};

class ProductoList extends React.Component {
  render() {
    const productos = this.props.productos.map((producto) => (
      <Producto key={producto._links.self.href} producto={producto} />
    ));
    return (
      <table border="1">
        <tbody>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
          {productos}
        </tbody>
      </table>
    );
  }
}

class Producto extends React.Component {
  render() {
    const id = this.props.producto._links.self.href.split("/").slice(-1);

    return (
      <tr>
        <td>{this.props.producto.nombre}</td>
        <td>{this.props.producto.precio}</td>
        <td>
          <Link to={`/ver-producto/${id}`}>Ver</Link> |
          <Link to={`/editar-producto/${id}`}>Editar</Link>
        </td>
      </tr>
    );
  }
}

class VentaList extends React.Component {
  render() {
    const ventas = this.props.ventas.map((venta) => (
      <Venta key={venta._links.self.href} venta={venta} />
    ));
    return (
      <table border="1">
        <tbody>
          <tr>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
          {ventas}
        </tbody>
      </table>
    );
  }
}

class Venta extends React.Component {
  render() {
    const id = this.props.venta._links.self.href.split("/").slice(-1);
    return (
      <tr>
        <td>{this.props.venta.total}</td>
        <td>
          <Link to={`/ver-venta/${id}`}>Ver</Link> |
          <Link to={`/editar-venta/${id}`}>Editar</Link>
        </td>
      </tr>
    );
  }
}

class DetalleList extends React.Component {
  render() {
    const detalles = this.props.detalles.map((detalle) => (
      <Detalle key={detalle._links.self.href} detalle={detalle} />
    ));
    return (
      <table border="1">
        <tbody>
          <tr>
            <th>Cantidad</th>
          </tr>
          {detalles}
        </tbody>
      </table>
    );
  }
}

class Detalle extends React.Component {
  render() {
    const id = this.props.detalle._links.self.href.split("/").slice(-1);
    const ventaId = this.props.detalle.venta;
    const productoId = this.props.detalle.producto;

    return (
      <tr>
        <td>{this.props.detalle.cantidad}</td>
        <td>
          <Link to={`/ver-detalle/${id}`}>Ver</Link> |
        </td>
      </tr>
    );
  }
}

module.exports = PageHome;
