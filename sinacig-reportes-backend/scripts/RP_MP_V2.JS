const express = require("express");
const router = express.Router();
const xl = require("excel4node");
const CatalogosService = require("../services/catalogos.service");
const estilosReportes = require("../utils/reports/estilos_reportes");
const MapaRiesgo = require("../services/mapa_riesgo_reporte.service");
const moment = require("moment");
const path = require("path");

const {
  header,
  tableBody,
  tableFooter,
} = require("../utils/reports/styles-reportes-excel/style_report_evaluacion_riesgo");
const catalogosServiceI = new CatalogosService();
const mapaRiesgoService = new MapaRiesgo();
router.post("/mapa_riesgo_RR", async (req, res, next) => {
  const { unidadEjecutora, fechaInicio, fechaFin } = req.body;

  const unidadEjecutoraData = await catalogosServiceI.findUnidadEjecutoraById(
    unidadEjecutora
  );
  let dataReporte = await mapaRiesgoService.dataReporteMapariesgo(
    unidadEjecutoraData.codigo_unidad,
    fechaInicio,
    fechaFin
  );
  try {
    var wb = new xl.Workbook();
    var ws = wb.addWorksheet("Matriz evaluacion riesgos");
    //Obtenemos información de la unidad ejecutora por el id

    //Damos el ancho a las columnas especificando el numero de columna ws.column(1)
    ws.column(1).setWidth(10);
    ws.column(2).setWidth(14);
    ws.column(4).setWidth(20);
    ws.column(5).setWidth(20);
    ws.column(6).setWidth(20);
    ws.column(7).setWidth(20);
    ws.column(8).setWidth(20);

    //Damos el ancho a las columnas especificando el numero de columna ws.column(1)

    ws.row(1).setHeight(13);
    ws.row(5).setHeight(13);
    ws.row(6).setHeight(13);
    ws.row(7).setHeight(13);
    ws.row(8).setHeight(13);
    ws.row(9).setHeight(13);
    ws.row(10).setHeight(13);
    ws.row(11).setHeight(13);
    ws.row(12).setHeight(13);
    ws.row(13).setHeight(13);
    ws.row(14).setHeight(13);
    ws.row(15).setHeight(13);
    ws.row(16).setHeight(13);

    //Encabezado principal
    const fecha_inicio = moment(fechaInicio, "YYYY-MM-DD").format("DD/MM/YYYY");
    const fecha_fin = moment(fechaFin, "YYYY-MM-DD").format("DD/MM/YYYY");
    ws.addImage({
      path: path.join(
        __dirname,
        "..",
        "utils",
        "reports",
        "img",
        "logo_mspas_report.png"
      ),
      type: "picture",
      position: {
        type: "absoluteAnchor",
        x: "0.3in",
        y: "0.2in",
      },
    });

    ws.cell(1, 1, 13, 8).style(header.fondoHeader);

    ws.cell(2, 3, 3, 8, true)
      .string("Ministerio de Salud Pública y Asistencia Social-MSPAS-")
      .style(header.tituloPrincipal);
    ws.cell(4, 3, 4, 8, true)
      .string("Mapa de Riesgos")
      .style(header.tituloSecundario);

    //Datos unidad ejecutora y periodo evaluación
    ws.cell(7, 1, 7, 3, true)
      .string("Unidad Ejecutora No.")
      .style(header.tituloInfoUnidad);

    if (unidadEjecutoraData.codigo_unidad == 999) {
      ws.cell(7, 4, 7, 6, true).string(`TODAS`).style(header.text);
    } else {
      ws.cell(7, 4, 7, 6, true)
        .string(`${unidadEjecutoraData.codigo_unidad}`)
        .style(header.text);
    }
    ws.cell(8, 1, 8, 3, true)
      .string("Nombre de la Unidad Ejecutora:")
      .style(header.tituloInfoUnidad);
    ws.cell(8, 4, 8, 13, true)
      .string(`${unidadEjecutoraData.nombre_unidad}`)
      .style(header.text);
    ws.cell(9, 1, 9, 3, true)
      .string("Periodo de evaluación:")
      .style(header.tituloInfoUnidad);
    ws.cell(9, 4, 9, 6, true)
      .string(`Del ${fecha_inicio} al ${fecha_fin}`)
      .style(header.text);

    // Instrucciones
    ws.cell(12, 1, 13, 8, true)
      .string(
        "Instrucciones: Realice el mapa de riesgos, completando la información de la matriz según lo indica el documento SINACIG en la página 53."
      )
      .style(header.text);

    ws.cell(17, 3).number(5);
    ws.cell(18, 3).number(4);
    ws.cell(19, 3).number(3);
    ws.cell(20, 3).number(2);
    ws.cell(21, 3).number(1);

    ws.cell(22, 4).number(1);
    ws.cell(22, 5).number(2);
    ws.cell(22, 6).number(3);
    ws.cell(22, 7).number(4);
    ws.cell(22, 8).number(5);
    if (dataReporte.length > 0) {
      // Le damos color a la tabla de mapa de riesgo
      let fila = 21;
      //variable i es la probabilidad, variable j es la severidad
      for (let i = 1; i < 6; i++) {
        let columna = 4;
        for (let j = 1; j < 6; j++) {
          if (i == 1 && j == 1) {
            datosVerde(i, j, fila, columna, 1);
          } else if (i == 1 && j == 2) {
            datosVerde(i, j, fila, columna, 2);
          } else if (i == 1 && j == 3) {
            datosVerde(i, j, fila, columna, 3);
          } else if (i == 1 && j == 4) {
            datosVerde(i, j, fila, columna, 4);
          } else if (i == 1 && j == 5) {
            datosVerde(i, j, fila, columna, 5);
          } else if (i == 2 && j == 1) {
            datosVerde(i, j, fila, columna, 6);
          } else if (i == 2 && j == 2) {
            datosVerde(i, j, fila, columna, 6);
          } else if (i == 2 && j == 3) {
            datosVerde(i, j, fila, columna, 8);
          } else if (i == 2 && j == 4) {
            datosVerde(i, j, fila, columna, 9);
          } else if (i == 2 && j == 5) {
            datosVerde(i, j, fila, columna, 10);
          }

          // else if (i == 3 && j == 5) {
          //   datosVerde(i, j, fila, columna);
          // } else if (i == 3 && j == 4) {
          //   datosVerde(i, j, fila, columna);
          // } else if (i == 3 && j == 1) {
          //   datosVerde(i, j, fila, columna);
          // } else if (i == 3 && j == 2) {
          //   datosVerde(i, j, fila, columna);
          // } else if (i == 3 && j == 3) {
          //   datosVerde(i, j, fila, columna);
          // } else if (i == 4 && j == 1) {
          //   datosVerde(i, j, fila, columna);
          // } else if (i == 4 && j == 2) {
          //   datosVerde(i, j, fila, columna);
          // } else if (i == 4 && j == 3) {
          //   datosAmarillo(i, j, fila, columna);
          // } else if (i == 4 && j == 4) {
          //   datosRojo(i, j, fila, columna);
          // } else if (i == 4 && j == 5) {
          //   datosRojo(i, j, fila, columna);
          // } else if (i == 5 && j == 1) {
          //   datosVerde(i, j, fila, columna);
          // } else if (i == 5 && j == 2) {
          //   datosVerde(i, j, fila, columna);
          // } else if (i == 5 && j == 3) {
          //   datosAmarillo(i, j, fila, columna);
          // } else if (i == 5 && j == 4) {
          //   datosRojo(i, j, fila, columna);
          // } else if (i == 5 && j == 5) {
          //   datosRojo(i, j, fila, columna);
          // }
          columna++;
        }
        fila--;
      }

      ws.cell(26, 4).string("No.").style(estilosReportes.encabezadoTabla);
      ws.cell(26, 5).string("Riesgos").style(estilosReportes.encabezadoTabla);
      ws.cell(26, 6)
        .string("Probabilidad")
        .style(estilosReportes.encabezadoTabla);
      ws.cell(26, 7).string("Severidad").style(estilosReportes.encabezadoTabla);
      ws.cell(26, 8).string("Punteo").style(estilosReportes.encabezadoTabla);
      let rowIndex = 27;
      let colNum = 0;

      let dataReporte2 = await mapaRiesgoService.dataReporteMapariesgo(
        unidadEjecutoraData.codigo_unidad,
        fechaInicio,
        fechaFin
      );

      let totalMatrices = dataReporte2.length;
      let conteoRecorrido = 0;

      dataReporte2.forEach((item) => {
        let columnIndex = 5;
        colNum++;
        Object.keys(item).forEach((colName) => {
          ws.cell(rowIndex, 4)
            .string(colNum.toString())
            .style(tableBody.tableBodyText1);
          ws.cell(rowIndex, columnIndex++)
            .string(item[colName].toString())
            .style(tableBody.tableBodyText1);
        });
        rowIndex++;
        conteoRecorrido++;

        if (totalMatrices == conteoRecorrido) {
          ws.cell(rowIndex + 2, 1, rowIndex + 2, 2, true)
            .string("Elaborado por:")
            .style(header.tituloInfoUnidad);
          ////////////
          ws.cell(rowIndex + 3, 1, rowIndex + 3, 2, true)
            .string("Firma")
            .style(tableFooter.footerTitle2);
          ws.cell(rowIndex + 3, 3, rowIndex + 3, 8, true).style(
            tableFooter.footerBoxText
          );
          ws.row(rowIndex + 3).setHeight(20);

          ws.cell(rowIndex + 4, 1, rowIndex + 4, 2, true)
            .string("Nombre del responsable")
            .style(tableFooter.footerTitle2);
          ws.cell(rowIndex + 4, 3, rowIndex + 4, 8, true).style(
            tableFooter.footerBoxText
          );
          ws.row(rowIndex + 4).setHeight(20);

          ws.cell(rowIndex + 5, 1, rowIndex + 5, 2, true)
            .string("Puesto")
            .style(tableFooter.footerTitle2);
          ws.cell(rowIndex + 5, 3, rowIndex + 5, 8, true).style(
            tableFooter.footerBoxText
          );
          ws.row(rowIndex + 5).setHeight(20);

          ws.cell(rowIndex + 8, 1, rowIndex + 8, 2, true)
            .string("Visto bueno:")
            .style(header.tituloInfoUnidad);

          ws.cell(rowIndex + 9, 1, rowIndex + 9, 2, true)
            .string("Firma")
            .style(tableFooter.footerTitle2);
          ws.cell(rowIndex + 9, 3, rowIndex + 9, 8, true).style(
            tableFooter.footerBoxText
          );
          ws.row(rowIndex + 9).setHeight(20);

          ws.cell(rowIndex + 10, 1, rowIndex + 10, 2, true)
            .string("Nombre del responsable")
            .style(tableFooter.footerTitle2);
          ws.cell(rowIndex + 10, 3, rowIndex + 10, 8, true).style(
            tableFooter.footerBoxText
          );
          ws.row(rowIndex + 10).setHeight(20);

          ws.cell(rowIndex + 11, 1, rowIndex + 11, 2, true)
            .string("Puesto")
            .style(tableFooter.footerTitle2);
          ws.cell(rowIndex + 11, 3, rowIndex + 11, 8, true).style(
            tableFooter.footerBoxText
          );
          ws.row(rowIndex + 11).setHeight(20);
        }
      });
      wb.write("Mapa_de_riesgo_RR.xlsx", res);
    } else {
      wb.write("Mapa_de_riesgo_RR.xlsx", res);
    }
  } catch (error) {
    console.log("error2::", error.message);
    next(error);
  }

  function datosAmarillo(pro, sev, fila, columna) {
    // let data = [];
    // var celda;
    // dataReporte.find((element) => {
    //   if (element.Probabilidad == pro && element.Severidad == sev) {
    //     data.push(`(${element.Riesgo}), `);
    //     celda = ws
    //       .cell(fila, columna)
    //       .string(data)
    //       .style(estilosReportes.backgroundAmarillo);
    //   } else {
    //     celda = ws
    //       .cell(fila, columna)
    //       .style(estilosReportes.backgroundAmarillo);
    //   }
    // });
    // return celda;
  }

  function datosRojo(pro, sev, fila, columna) {
    // let data = [];
    // var celda;
    // dataReporte.find((element) => {
    //   if (element.Probabilidad == pro && element.Severidad == sev) {
    //     data.push(`(${element.Riesgo}), `);
    //     celda = ws
    //       .cell(fila, columna)
    //       .string(data)
    //       .style(estilosReportes.backgroundRojo);
    //   } else {
    //     celda = ws.cell(fila, columna).style(estilosReportes.backgroundRojo);
    //   }
    // });
    // return celda;
  }

  function datosVerde(pro, sev, fila, columna, enlace) {
    let resProSev = pro * sev;
    let data = [];
    var celda;
    let indices = [];

    dataReporte.find((element) => {
      if (element.RI >= 1 && element.RI < 5 && enlace == 1) {
        setCell(element);
      } else if (element.RR >= 2 && element.RR < 3 && enlace == 2) {
        setCell(element);
      } else if (element.RR >= 3 && element.RR < 4 && enlace == 3) {
        setCell(element);
      } else if (element.RR >= 4 && element.RR < 5 && enlace == 4) {
        setCell(element);
      } else if (element.RR >= 5 && element.RR < 6 && enlace == 5) {
        setCell(element);
      } else if (element.RR >= 6 && element.RR < 7 && enlace == 6) {
        setCell(element);
      } else if (element.RR >= 7 && element.RR < 8 && enlace == 7) {
        setCell(element);
      } else if (element.RR >= 8 && element.RR < 9 && enlace == 8) {
        setCell(element);
      } else if (element.RR >= 9 && element.RR <= 10 && enlace == 9) {
        setCell(element);
      } else {
        celda = ws.cell(fila, columna).style(estilosReportes.backgroundVerde);
      }
    });
    indices.find((element) => {
      dataReporte.splice(element, 1);
    });
    console.log(dataReporte.RR);

    function setCell(element) {
      data.push(`(${element.Riesgo}), `);
      const index = dataReporte.findIndex(
        (x) => x.id_riesgo === element.id_riesgo
      );
      indices.push(index);
      celda = ws
        .cell(fila, columna)
        .string(data)
        .style(estilosReportes.backgroundVerde);
    }

    return celda;
  }
});

module.exports = router;
