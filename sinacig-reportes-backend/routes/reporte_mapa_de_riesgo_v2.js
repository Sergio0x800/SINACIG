const express = require('express');
const router = express.Router();
const xl = require('excel4node');
const CatalogosService = require('../services/catalogos.service');
const estilosReportes = require('../utils/reports/estilos_reportes');
const MapaRiesgo = require('../services/mapa_riesgo_reporte.service');
const moment = require('moment');
const path = require('path');

const {
  header,
  tableBody,
  tableFooter,
} = require('../utils/reports/styles-reportes-excel/style_report_evaluacion_riesgo');
const catalogosServiceI = new CatalogosService();
const mapaRiesgoService = new MapaRiesgo();
router.post('/mapa_riesgo_RR', async (req, res, next) => {
  const { unidadEjecutora, fechaInicio, fechaFin } = req.body;

  try {
    var wb = new xl.Workbook();
    var ws = wb.addWorksheet('Matriz evaluacion riesgos');
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
    const fecha_inicio = moment(fechaInicio, 'YYYY-MM-DD').format('DD/MM/YYYY');
    const fecha_fin = moment(fechaFin, 'YYYY-MM-DD').format('DD/MM/YYYY');
    ws.addImage({
      path: path.join(
        __dirname,
        '..',
        'utils',
        'reports',
        'img',
        'logo_mspas_report.png'
      ),
      type: 'picture',
      position: {
        type: 'absoluteAnchor',
        x: '0.3in',
        y: '0.2in',
      },
    });

    ws.cell(1, 1, 13, 8).style(header.fondoHeader);

    ws.cell(2, 3, 3, 8, true)
      .string('Ministerio de Salud Pública y Asistencia Social-MSPAS-')
      .style(header.tituloPrincipal);
    ws.cell(4, 3, 4, 8, true)
      .string('Mapa de Riesgos')
      .style(header.tituloSecundario);

    await catalogosServiceI
      .findUnidadEjecutoraById(unidadEjecutora)
      .then((unidadEjecutoraData) => {
        //Datos unidad ejecutora y periodo evaluación
        ws.cell(7, 1, 7, 3, true)
          .string('Unidad Ejecutora No.')
          .style(header.tituloInfoUnidad);

        if (unidadEjecutoraData.codigo_unidad == 999) {
          ws.cell(7, 4, 7, 6, true).string(`TODAS`).style(header.text);
        } else {
          ws.cell(7, 4, 7, 6, true)
            .string(`${unidadEjecutoraData.codigo_unidad}`)
            .style(header.text);
        }
        ws.cell(8, 1, 8, 3, true)
          .string('Nombre de la Unidad Ejecutora:')
          .style(header.tituloInfoUnidad);
        ws.cell(8, 4, 8, 13, true)
          .string(`${unidadEjecutoraData.nombre_unidad}`)
          .style(header.text);
        ws.cell(9, 1, 9, 3, true)
          .string('Periodo:')
          .style(header.tituloInfoUnidad);
        ws.cell(9, 4, 9, 6, true)
          .string(`Del ${fecha_inicio} al ${fecha_fin}`)
          .style(header.text);

        mapaRiesgoService
          .dataReporteMapariesgo(
            unidadEjecutoraData.codigo_unidad,
            fechaInicio,
            fechaFin,
            0
          )
          .then((dataReporte) => {
            if (dataReporte.length > 0) {
              let dataTolerable = [];
              let dataTolerable1 = [];
              let dataTolerable2 = [];
              let dataTolerable3 = [];
              let dataTolerable4 = [];
              let dataTolerable5 = [];
              let dataTolerable6 = [];
              let dataTolerable7 = [];
              let dataTolerable8 = [];
              let dataTolerable9 = [];
              let dataTolerable10 = [];
              let dataTolerable11 = [];
              let dataTolerable12 = [];
              let dataTolerable13 = [];
              let dataTolerable14 = [];
              let dataTolerable15 = [];
              let dataTolerable16 = [];
              let dataTolerable17 = [];
              let dataNoTolerable = [];
              let dataGestionable = [];
              let dataGestionable1 = [];
              let dataGestionable2 = [];
              let dataGestionable3 = [];
              let dataGestionable4 = [];

              let random = 0;

              dataReporte.find((element) => {
                if (element.RR >= 0 && element.RR <= 10) {
                  dataTolerable.push(`(${element.Riesgo}), `);
                } else if (element.RR > 10 && element.RR <= 15) {
                  dataGestionable.push(`(${element.Riesgo}), `);
                } else {
                  dataNoTolerable.push(`(${element.Riesgo}), `);
                  ws.cell(17, 7, 18, 8, true)
                    .string(dataNoTolerable)
                    .style(estilosReportes.backgroundRojo2);
                }
              });

              ws.cell(17, 4, 17, 5).style(estilosReportes.backgroundVerde2);
              ws.cell(18, 4, 18, 5).style(estilosReportes.backgroundVerde2);
              ws.cell(19, 4, 19, 6).style(estilosReportes.backgroundVerde2);
              ws.cell(20, 4, 20, 8).style(estilosReportes.backgroundVerde2);
              ws.cell(21, 4, 21, 8).style(estilosReportes.backgroundVerde2);
              ws.cell(17, 6, 18, 6).style(estilosReportes.backgroundAmarillo2);
              ws.cell(19, 7, 19, 8).style(estilosReportes.backgroundAmarillo2);
              ws.cell(17, 7, 18, 8).style(estilosReportes.backgroundRojo);

              dataTolerable.find((element) => {
                random = Math.floor(Math.random() * 18);
                if (random == 1) {
                  dataTolerable1.push(element);
                  ws.cell(17, 4)
                    .string(dataTolerable1.toString())
                    .style(estilosReportes.backgroundVerde2);
                } else if (random == 2) {
                  dataTolerable2.push(element);
                  ws.cell(17, 5)
                    .string(dataTolerable2.toString())
                    .style(estilosReportes.backgroundVerde2);
                } else if (random == 3) {
                  dataTolerable3.push(element);
                  ws.cell(18, 4)
                    .string(dataTolerable3.toString())
                    .style(estilosReportes.backgroundVerde2);
                } else if (random == 4) {
                  dataTolerable4.push(element);
                  ws.cell(18, 5)
                    .string(dataTolerable4.toString())
                    .style(estilosReportes.backgroundVerde2);
                } else if (random == 5) {
                  dataTolerable5.push(element);
                  ws.cell(19, 4)
                    .string(dataTolerable5.toString())
                    .style(estilosReportes.backgroundVerde2);
                } else if (random == 6) {
                  dataTolerable6.push(element);
                  ws.cell(19, 5)
                    .string(dataTolerable6.toString())
                    .style(estilosReportes.backgroundVerde2);
                } else if (random == 7) {
                  dataTolerable7.push(element);
                  ws.cell(19, 6)
                    .string(dataTolerable7.toString())
                    .style(estilosReportes.backgroundVerde2);
                } else if (random == 8) {
                  dataTolerable8.push(element);
                  ws.cell(20, 4)
                    .string(dataTolerable8.toString())
                    .style(estilosReportes.backgroundVerde2);
                } else if (random == 9) {
                  dataTolerable9.push(element);
                  ws.cell(20, 5)
                    .string(dataTolerable9.toString())
                    .style(estilosReportes.backgroundVerde2);
                } else if (random == 10) {
                  dataTolerable10.push(element);
                  ws.cell(20, 6)
                    .string(dataTolerable10.toString())
                    .style(estilosReportes.backgroundVerde2);
                } else if (random == 11) {
                  dataTolerable11.push(element);
                  ws.cell(20, 7)
                    .string(dataTolerable11.toString())
                    .style(estilosReportes.backgroundVerde2);
                } else if (random == 12) {
                  dataTolerable12.push(element);
                  ws.cell(20, 8)
                    .string(dataTolerable12.toString())
                    .style(estilosReportes.backgroundVerde2);
                } else if (random == 13) {
                  dataTolerable13.push(element);
                  ws.cell(21, 4)
                    .string(dataTolerable13.toString())
                    .style(estilosReportes.backgroundVerde2);
                } else if (random == 14) {
                  dataTolerable14.push(element);
                  ws.cell(21, 5)
                    .string(dataTolerable14.toString())
                    .style(estilosReportes.backgroundVerde2);
                } else if (random == 15) {
                  dataTolerable15.push(element);
                  ws.cell(21, 6)
                    .string(dataTolerable15.toString())
                    .style(estilosReportes.backgroundVerde2);
                } else if (random == 16) {
                  dataTolerable16.push(element);
                  ws.cell(21, 7)
                    .string(dataTolerable16.toString())
                    .style(estilosReportes.backgroundVerde2);
                } else if (random == 17) {
                  dataTolerable17.push(element);
                  ws.cell(21, 8)
                    .string(dataTolerable17.toString())
                    .style(estilosReportes.backgroundVerde2);
                } else {
                  dataTolerable17.push(element);
                  ws.cell(21, 8)
                    .string(dataTolerable17.toString())
                    .style(estilosReportes.backgroundVerde2);
                }
              });

              dataGestionable.find((element) => {
                random = Math.floor(Math.random() * 5);
                if (random == 1) {
                  dataGestionable1.push(element);
                  ws.cell(17, 6)
                    .string(dataGestionable1.toString())
                    .style(estilosReportes.backgroundAmarillo2);
                } else if (random == 2) {
                  dataGestionable2.push(element);
                  ws.cell(18, 6)
                    .string(dataGestionable2.toString())
                    .style(estilosReportes.backgroundAmarillo2);
                } else if (random == 3) {
                  dataGestionable3.push(element);
                  ws.cell(19, 7)
                    .string(dataGestionable3.toString())
                    .style(estilosReportes.backgroundAmarillo2);
                } else if (random == 4) {
                  dataGestionable4.push(element);
                  ws.cell(19, 8)
                    .string(dataGestionable4.toString())
                    .style(estilosReportes.backgroundAmarillo2);
                } else {
                  dataGestionable4.push(element);
                  ws.cell(19, 8)
                    .string(dataGestionable4.toString())
                    .style(estilosReportes.backgroundAmarillo2);
                }
              });

              if (dataNoTolerable.length > 0) {
                ws.cell(17, 7, 18, 8, true)
                  .string(dataNoTolerable.toString())
                  .style(estilosReportes.backgroundRojo2);
              }

              ws.cell(26, 4)
                .string('No.')
                .style(estilosReportes.encabezadoTabla);
              ws.cell(26, 5)
                .string('Riesgos')
                .style(estilosReportes.encabezadoTabla);
              ws.cell(26, 6)
                .string('Probabilidad')
                .style(estilosReportes.encabezadoTabla);
              ws.cell(26, 7)
                .string('Severidad')
                .style(estilosReportes.encabezadoTabla);
              ws.cell(26, 8)
                .string('Punteo RI')
                .style(estilosReportes.encabezadoTabla);
              ws.cell(26, 9)
                .string('Control Mitigador')
                .style(estilosReportes.encabezadoTabla);
              ws.cell(26, 10)
                .string('Punteo RR')
                .style(estilosReportes.encabezadoTabla);
              let rowIndex = 27;
              let colNum = 0;
              let totalMatrices = dataReporte.length;
              let conteoRecorrido = 0;
              dataReporte.forEach((item) => {
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
                    .string('Elaborado por:')
                    .style(header.tituloInfoUnidad);
                  ////////////
                  ws.cell(rowIndex + 3, 1, rowIndex + 3, 2, true)
                    .string('Firma')
                    .style(tableFooter.footerTitle2);
                  ws.cell(rowIndex + 3, 3, rowIndex + 3, 8, true).style(
                    tableFooter.footerBoxText
                  );
                  ws.row(rowIndex + 3).setHeight(20);

                  ws.cell(rowIndex + 4, 1, rowIndex + 4, 2, true)
                    .string('Nombre del responsable')
                    .style(tableFooter.footerTitle2);
                  ws.cell(rowIndex + 4, 3, rowIndex + 4, 8, true).style(
                    tableFooter.footerBoxText
                  );
                  ws.row(rowIndex + 4).setHeight(20);

                  ws.cell(rowIndex + 5, 1, rowIndex + 5, 2, true)
                    .string('Puesto')
                    .style(tableFooter.footerTitle2);
                  ws.cell(rowIndex + 5, 3, rowIndex + 5, 8, true).style(
                    tableFooter.footerBoxText
                  );
                  ws.row(rowIndex + 5).setHeight(20);

                  ws.cell(rowIndex + 8, 1, rowIndex + 8, 2, true)
                    .string('Visto bueno:')
                    .style(header.tituloInfoUnidad);

                  ws.cell(rowIndex + 9, 1, rowIndex + 9, 2, true)
                    .string('Firma')
                    .style(tableFooter.footerTitle2);
                  ws.cell(rowIndex + 9, 3, rowIndex + 9, 8, true).style(
                    tableFooter.footerBoxText
                  );
                  ws.row(rowIndex + 9).setHeight(20);

                  ws.cell(rowIndex + 10, 1, rowIndex + 10, 2, true)
                    .string('Nombre del responsable')
                    .style(tableFooter.footerTitle2);
                  ws.cell(rowIndex + 10, 3, rowIndex + 10, 8, true).style(
                    tableFooter.footerBoxText
                  );
                  ws.row(rowIndex + 10).setHeight(20);

                  ws.cell(rowIndex + 11, 1, rowIndex + 11, 2, true)
                    .string('Puesto')
                    .style(tableFooter.footerTitle2);
                  ws.cell(rowIndex + 11, 3, rowIndex + 11, 8, true).style(
                    tableFooter.footerBoxText
                  );
                  ws.row(rowIndex + 11).setHeight(20);
                }
              });
              wb.write('Mapa_de_riesgo.xlsx', res);
            } else {
              wb.write('Mapa_de_riesgo.xlsx', res);
            }
          });
      });
  } catch (error) {
    console.log('error2::', error.message);
    next(error);
  }

  function datosAmarillo(pro, sev, fila, columna) {
    let data = [];
    var celda;
    dataReporte.find((element) => {
      if (element.Probabilidad == pro && element.Severidad == sev) {
        data.push(`(${element.Riesgo}), `);
        celda = ws
          .cell(fila, columna)
          .string(data)
          .style(estilosReportes.backgroundAmarillo);
      } else {
        celda = ws
          .cell(fila, columna)
          .style(estilosReportes.backgroundAmarillo);
      }
    });
    return celda;
  }

  function datosRojo(pro, sev, fila, columna) {
    let data = [];
    var celda;
    dataReporte.find((element) => {
      if (element.Probabilidad == pro && element.Severidad == sev) {
        data.push(`(${element.Riesgo}), `);
        celda = ws
          .cell(fila, columna)
          .string(data)
          .style(estilosReportes.backgroundRojo);
      } else {
        celda = ws.cell(fila, columna).style(estilosReportes.backgroundRojo);
      }
    });
    return celda;
  }

  function numRandom(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // function datosVerde(RI, CM, fila, columna) {
  //   let data = [];
  //   var celda;
  //   dataReporte.find((element) => {
  //     if (element.RI >= RI && element.RI <= RI && element.CM == CM) {
  //       data.push(`(${element.Riesgo}), `);
  //       celda = ws
  //         .cell(17, 4, 21, 5, 19, 6, 21, 6, 20, 7, 21, 8, true)
  //         .string(data)
  //         .style(estilosReportes.backgroundVerde);
  //     } else {
  //       celda = ws
  //         .cell(17, 4, 21, 5, 19, 6, 21, 6, 20, 7, 21, 8, true)
  //         .style(estilosReportes.backgroundVerde);
  //     }
  //   });
  //   return celda;
  // }
});

module.exports = router;
