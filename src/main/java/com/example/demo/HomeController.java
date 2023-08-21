package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

@Controller
public class HomeController {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@RequestMapping(value = "/")
	public String index() {
		return "index";
	}

	@GetMapping(path = "/api/detalles/{id}/formacion")
	public @ResponseBody List<Map<String, Object>> formacion(@PathVariable Integer id) {
		String sql = "SELECT VentaDetalle.id as ID, Venta.id as VENTA, Producto.nombre as PRODUCTO, VentaDetalle.cantidad as CANTIDAD FROM VentaDetalle JOIN Venta ON VentaDetalle.id_venta = Venta.id JOIN Producto ON VentaDetalle.id_producto = Producto.id WHERE id = ?";
		List<Map<String, Object>> queryResult = jdbcTemplate.queryForList(sql, id);
		return queryResult;
	}

}