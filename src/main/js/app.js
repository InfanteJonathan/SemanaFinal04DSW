const React = require("react");
const ReactDOM = require("react-dom");
const { createBrowserRouter, RouterProvider } = require("react-router-dom");

const PageHome = require("./pages/home");
const PageVerProducto = require("./pages/ver-producto");
const PageEditarProducto = require("./pages/editar-producto");
const PageNuevoProducto = require("./pages/nuevo-producto");
const PageVerventa = require("./pages/ver-venta");
const PageEditarventa = require("./pages/editar-venta");
const PageNuevoventa = require("./pages/nueva-venta");
const PageVerventaDetalle = require("./pages/ver-detalle");
const PageNuevodetalle = require("./pages/nuevo-detalle");

const router = createBrowserRouter([
  { path: "/", element: <PageHome /> },
  { path: "/ver-producto/:id", element: <PageVerProducto /> },
  { path: "/nuevo-producto", element: <PageNuevoProducto /> },
  { path: "/editar-producto/:id", element: <PageEditarProducto /> },
  { path: "/ver-venta/:id", element: <PageVerventa /> },
  { path: "/editar-venta/:id", element: <PageEditarventa /> },
  { path: "/nueva-venta", element: <PageNuevoventa /> },
  { path: "/ver-detalle/:id", element: <PageVerventaDetalle /> },
  { path: "/nuevo-detalle", element: <PageNuevodetalle /> },
]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById("react")
);
