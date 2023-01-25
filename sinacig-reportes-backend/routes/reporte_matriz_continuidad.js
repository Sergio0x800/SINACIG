const express = require('express');
const router = express.Router();
const xl = require('excel4node');
const CatalogosService = require('../services/catalogos.service');
const MatrizContinuidadReporteService = require('../services/matriz_continuidad_reporte.service');
const moment = require('moment');
const path = require('path');

const {
  header,
  table,
  tableBody,
  tableFooter,
} = require('../utils/reports/styles-reportes-excel/style_report_evaluacion_riesgo');
const catalogosServiceI = new CatalogosService();
const reporteService = new MatrizContinuidadReporteService();
router.post('/matriz_continuidad', async (req, res, next) => {
  try {
    let { unidadEjecutora, fechaInicio, fechaFin } = req.body;

    var wb = new xl.Workbook();
    var ws = wb.addWorksheet('Matriz de Continuidad');

    //Obtenemos información de la unidad ejecutora por el id
    const unidadEjecutoraData = await catalogosServiceI.findUnidadEjecutoraById(
      unidadEjecutora
    );

    //Damos el ancho a las columnas especificando el numero de columna ws.column(1)
    ws.column(1).setWidth(10);
    ws.column(2).setWidth(40);
    ws.column(3).setWidth(40);
    ws.column(4).setWidth(20);
    ws.column(5).setWidth(40);
    ws.column(6).setWidth(25);
    ws.column(7).setWidth(40);
    ws.column(8).setWidth(15);

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
    ws.row(17).setHeight(51);

    ws.row(17).filter({
      firstRow: 17,
      firstColumn: 2,
      lastRow: 17,
      lastColumn: 8,
    });

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

    ws.cell(1, 1, 16, 8).style(header.fondoHeader);

    ws.cell(2, 2, 3, 8, true)
      .string('Ministerio de Salud Pública y Asistencia Social-MSPAS-')
      .style(header.tituloPrincipal);
    ws.cell(4, 2, 4, 8, true)
      .string('Matriz de Continuidad de Evaluación de Riesgos')
      .style(header.tituloSecundario);

    //Datos unidad ejecutora y periodo evaluación
    ws.cell(7, 1, 7, 2, true)
      .string('Unidad Ejecutora No.')
      .style(header.tituloInfoUnidad);
    if (unidadEjecutoraData.codigo_unidad == 999) {
      ws.cell(7, 3, 7, 6, true).string(`TODAS`).style(header.text);
    } else {
      ws.cell(7, 3, 7, 6, true)
        .string(`${unidadEjecutoraData.codigo_unidad}`)
        .style(header.text);
    }
    ws.cell(8, 1, 8, 2, true)
      .string('Nombre de la Unidad Ejecutora:')
      .style(header.tituloInfoUnidad);
    ws.cell(8, 3, 8, 13, true)
      .string(`${unidadEjecutoraData.nombre_unidad}`)
      .style(header.text);
    ws.cell(9, 1, 9, 2, true)
      .string('Periodo de evaluación:')
      .style(header.tituloInfoUnidad);
    ws.cell(9, 3, 9, 6, true)
      .string(`Del ${fecha_inicio} al ${fecha_fin}`)
      .style(header.text);

    //numeracion col tablas
    ws.cell(16, 2).string('(1)').style(tableBody.tableBodyText4);
    ws.cell(16, 3).string('(2)').style(tableBody.tableBodyText4);
    ws.cell(16, 4).string('(3)').style(tableBody.tableBodyText4);
    ws.cell(16, 5).string('(4)').style(tableBody.tableBodyText4);
    ws.cell(16, 6).string('(5)').style(tableBody.tableBodyText4);
    ws.cell(16, 7).string('(6)').style(tableBody.tableBodyText4);
    ws.cell(16, 8).string('(7)').style(tableBody.tableBodyText4);
    ws.cell(16, 9).string('(8)').style(tableBody.tableBodyText4);

    //Encabezado columnas
    const filaEncabezado = 17;
    ws.cell(filaEncabezado, 1).string('No.').style(table.tableHeaderEvaluacion);
    ws.cell(filaEncabezado, 2)
      .string('Unidad Ejecutora')
      .style(table.tableHeaderEvaluacion);
    ws.cell(filaEncabezado, 3)
      .string('Riesgo')
      .style(table.tableHeaderEvaluacion);
    ws.cell(filaEncabezado, 4)
      .string('Subtema')
      .style(table.tableHeaderEvaluacion);
    ws.cell(filaEncabezado, 5)
      .string('Nivel de Tolerancia')
      .style(table.tableHeaderEvaluacion);
    ws.cell(filaEncabezado, 6)
      .string('Metodo de Monitoreo')
      .style(table.tableHeaderEvaluacion);
    ws.cell(filaEncabezado, 7)
      .string('Frecuencia de Monitoreo')
      .style(table.tableHeaderEvaluacion);
    ws.cell(filaEncabezado, 8)
      .string('Responsable')
      .style(table.tableHeaderEvaluacion);
    ws.cell(filaEncabezado, 9)
      .string('Severidad del Riesgo')
      .style(table.tableHeaderEvaluacion);

    //indicamos el número de fila donde se comenzará a escribir la información del reporte
    reporteService
      .dataReporteMatrizContinuidad(
        unidadEjecutoraData.codigo_unidad,
        fechaInicio,
        fechaFin
      )
      .then((resultado) => {
        if (resultado[0].length > 0) {
          let totalMatrices = resultado[0].length;
          let conteoMatricesRocorrido = 0;
          let rowIndex = 18;
          let rowIndex2 = 18;
          let colNum = 0;
          let id_riesgo_ant = 0;
          resultado[0].forEach((item) => {
            if (item.id_riesgo != id_riesgo_ant) {
              colNum++;
              if (item.cantidad_registros == 1) {
                ws.cell(rowIndex2, 1)
                  .string(colNum.toString())
                  .style(tableBody.tableBodyText1);
                ws.cell(rowIndex2, 2)
                  .string(item.codigo_unidad.toString())
                  .style(tableBody.tableBodyText1);
                ws.cell(rowIndex2, 3)
                  .string(item.riesgo.toString())
                  .style(tableBody.tableBodyText1);
              } else {
                ws.cell(
                  rowIndex2,
                  1,
                  rowIndex2 + (item.cantidad_registros - 1),
                  1,
                  true
                )
                  .string(colNum.toString())
                  .style(tableBody.tableBodyText1);
                ws.cell(
                  rowIndex2,
                  2,
                  rowIndex2 + (item.cantidad_registros - 1),
                  2,
                  true
                )
                  .string(item.codigo_unidad.toString())
                  .style(tableBody.tableBodyText1);
                ws.cell(
                  rowIndex2,
                  3,
                  rowIndex2 + (item.cantidad_registros - 1),
                  3,
                  true
                )
                  .string(item.riesgo.toString())
                  .style(tableBody.tableBodyText1);
              }
            }

            let columnIndex = 4;

            Object.keys(item).forEach((colName) => {
              if (colName === 'metodos_monitoreo') {
                ws.cell(rowIndex, columnIndex++)
                  .string(item[colName])
                  .style(tableBody.tableBodyText3);
              } else if (colName === 'id_riesgo') {
              } else if (colName === 'codigo_unidad') {
              } else if (colName === 'riesgo') {
              } else if (colName === 'cantidad_registros') {
              } else {
                ws.cell(rowIndex, columnIndex++)
                  .string(item[colName].toString())
                  .style(tableBody.tableBodyText1);
              }

              id_riesgo_ant = item.id_riesgo;
            });
            rowIndex++;
            conteoMatricesRocorrido++;

            if (totalMatrices == conteoMatricesRocorrido) {
              //Pie de página
              //Conclusión
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

              ////////////
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
              //////////////

              wb.write('Plan_de_trabajo.xlsx', res);
            }

            id_riesgo_ant = item.id_riesgo;
            rowIndex2++;
          });
        } else {
          wb.write('Plan_de_trabajo.xlsx', res);
        }
      });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

module.exports = router;
