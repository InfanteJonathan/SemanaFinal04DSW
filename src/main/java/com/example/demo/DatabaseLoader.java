package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseLoader implements CommandLineRunner {

	private final VentaDetalleRepository repositoryVD;
	private final VentaRepository repositoryV;
	private final ProductoRepository repositoryP;

	@Autowired
	public DatabaseLoader(
			VentaDetalleRepository repositoryVD, ///
			VentaRepository repositoryV, ///
			ProductoRepository repositoryP) {
		this.repositoryVD = repositoryVD;///
		this.repositoryV = repositoryV;///
		this.repositoryP = repositoryP;///
	}

	@Override
	public void run(String... strings) throws Exception {

		///

		Producto p1 = new Producto("Arroz", 15.5);
		Producto p2 = new Producto("Azucar", 4.50);
		Producto p3 = new Producto("Aceite", 11.5);
		Producto p4 = new Producto("Sal", 3.50);
		Producto p5 = new Producto("Avena", 5.5);
		this.repositoryP.save(p1);
		this.repositoryP.save(p2);
		this.repositoryP.save(p3);
		this.repositoryP.save(p4);
		this.repositoryP.save(p5);

		Venta v1 = new Venta(31);
		Venta v2 = new Venta(27.5);
		Venta v3 = new Venta(34.5);
		this.repositoryV.save(v1);
		this.repositoryV.save(v2);
		this.repositoryV.save(v3);

		VentaDetalle vd1 = new VentaDetalle(v1, p1, 2);
		VentaDetalle vd2 = new VentaDetalle(v2, p5, 5);
		VentaDetalle vd3 = new VentaDetalle(v3, p3, 3);
		this.repositoryVD.save(vd1);
		this.repositoryVD.save(vd2);
		this.repositoryVD.save(vd3);

	}

}