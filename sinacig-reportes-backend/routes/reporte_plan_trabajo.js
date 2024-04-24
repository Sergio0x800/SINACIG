const express = require('express');
const router = express.Router();
const xl = require('excel4node');
const CatalogosService = require('../services/catalogos.service');
const PlanTrabajoReporteService = require('../services/plan_trabajo_reporte.service');
const moment = require('moment');
const path = require('path');

const {
  header,
  table,
  tableBody,
  tableFooter,
} = require('../utils/reports/styles-reportes-excel/style_report_evaluacion_riesgo');
const catalogosServiceI = new CatalogosService();
const reporteService = new PlanTrabajoReporteService();
router.post('/evaluacion_plan_trabajo', async (req, res, next) => {
  try {
    let { unidadEjecutora, fechaInicio, fechaFin } = req.body;

    // fechaInicio = moment(fechaInicio, 'DD/MM/YYYY').format('YYYY-MM-DD');
    // fechaFin = moment(fechaFin, 'DD/MM/YYYY').format('YYYY-MM-DD');

    var wb = new xl.Workbook();
    var ws = wb.addWorksheet('Plan de Trabajo');

    //Obtenemos información de la unidad ejecutora por el id
    const unidadEjecutoraData = await catalogosServiceI.findUnidadEjecutoraById(
      unidadEjecutora
    );

    //Damos el ancho a las columnas especificando el numero de columna ws.column(1)
    ws.column(1).setWidth(10);
    ws.column(2).setWidth(10);
    ws.column(3).setWidth(30);
    ws.column(4).setWidth(8);
    ws.column(5).setWidth(9);
    ws.column(6).setWidth(25);
    ws.column(7).setWidth(15);

    ws.column(8).setWidth(14);
    ws.column(9).setWidth(35);
    ws.column(10).setWidth(16);
    ws.column(11).setWidth(14);
    ws.column(12).setWidth(14);
    ws.column(13).setWidth(14);
    ws.column(14).setWidth(21);

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
      lastColumn: 14,
    });

    //Encabezado principal
    const fecha_inicio = moment(fechaInicio, 'YYYY-MM-DD').format('DD/MM/YYYY');
    const fecha_fin = moment(fechaFin, 'YYYY-MM-DD').format('DD/MM/YYYY');

    const fecha_inicio_ejecucion = moment(fechaInicio, 'YYYY-MM-DD')
      .add(1, 'year')
      .format('DD/MM/YYYY');
    const fecha_fin_ejecucion = moment(fechaFin, 'YYYY-MM-DD')
      .add(1, 'year')
      .format('DD/MM/YYYY');

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

    ws.cell(1, 1, 16, 14).style(header.fondoHeader);

    ws.cell(2, 5, 3, 10, true)
      .string('Ministerio de Salud Pública y Asistencia Social-MSPAS-')
      .style(header.tituloPrincipal);
    ws.cell(4, 5, 4, 10, true)
      .string('Plan de trabajo en evaluación de riesgos')
      .style(header.tituloSecundario);

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
    ws.cell(9, 1, 9, 3, true).string('Periodo:').style(header.tituloInfoUnidad);
    ws.cell(9, 4, 9, 6, true)
      .string(`Del ${fecha_inicio} al ${fecha_fin}`)
      .style(header.text);

    ws.cell(10, 1, 10, 3, true)
      .string('Periodo de ejecución:')
      .style(header.tituloInfoUnidad);
    ws.cell(10, 4, 10, 6, true)
      .string(`Del ${fecha_inicio_ejecucion} al ${fecha_fin_ejecucion}`)
      .style(header.text);
    // Instrucciones
    ws.cell(12, 1, 13, 9, true)
      .string(
        'Instrucciones: Realice el plan de trabajo en evaluación de riesgos identificados previamente.'
      )
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
    ws.cell(16, 10).string('(9)').style(tableBody.tableBodyText4);
    ws.cell(16, 11).string('(10)').style(tableBody.tableBodyText4);
    ws.cell(16, 12).string('(11)').style(tableBody.tableBodyText4);
    ws.cell(16, 13).string('(12)').style(tableBody.tableBodyText4);
    ws.cell(16, 14).string('(13)').style(tableBody.tableBodyText4);

    //Encabezado columnas
    const filaEncabezado = 17;
    ws.cell(filaEncabezado, 1).string('No.').style(table.tableHeaderEvaluacion);
    ws.cell(filaEncabezado, 2)
      .string('Código Unidad Ejecutora')
      .style(table.tableHeaderEvaluacion);
    ws.cell(filaEncabezado, 3)
      .string('Riesgo')
      .style(table.tableHeaderEvaluacion);
    ws.cell(filaEncabezado, 4)
      .string('Ref. Tipo Riesgo')
      .style(table.tableHeaderEvaluacion);
    ws.cell(filaEncabezado, 5)
      .string('Nivel Riesgo Residual')
      .style(table.tableHeaderEvaluacion);
    ws.cell(filaEncabezado, 6)
      .string('Controles Recomendados')
      .style(table.tableHeaderEvaluacion);
    ws.cell(filaEncabezado, 7)
      .string('Perioridad de Implementación')
      .style(table.tableHeaderEvaluacion);
    ws.cell(filaEncabezado, 8)
      .string('Área Evaluada y Eventos Identificados')
      .style(table.tableHeaderEvaluacion);
    ws.cell(filaEncabezado, 9)
      .string('Controles para Implementación')
      .style(table.tableHeaderEvaluacion);
    ws.cell(filaEncabezado, 10)
      .string('Recursos Internos o Externos')
      .style(table.tableHeaderEvaluacion);
    ws.cell(filaEncabezado, 11)
      .string('Puesto Responsable')
      .style(table.tableHeaderEvaluacion);
    ws.cell(filaEncabezado, 12)
      .string('Fecha Inicio')
      .style(table.tableHeaderEvaluacion);
    ws.cell(filaEncabezado, 13)
      .string('Fecha Fin')
      .style(table.tableHeaderEvaluacion);
    ws.cell(filaEncabezado, 14)
      .string('Comentarios')
      .style(table.tableHeaderEvaluacion);

    //indicamos el número de fila donde se comenzará a escribir la información del reporte
    await reporteService
      .dataReportePlanTrabajo(
        unidadEjecutoraData.codigo_unidad,
        fechaInicio,
        fechaFin
      )
      .then((resultado) => {
        if (resultado[0].length > 0) {
          let totalPlanes = resultado[0].length;
          let conteoPlanesRecorridos = 0;
          let rowIndex = 18;
          let colNum = 0;
          resultado[0].forEach((item) => {
            // reporteService
            //   .dataRecursos(item.id_planRecursos)
            //   .then((resultRecursos) => {
            // reporteService
            //   .dataControlesImplementacion(
            //     item.id_planControlesImplementacion
            //   )
            //   .then((resultControlesImplementacion) => {
            //     reporteService
            //       .dataControlesInternosPlan(item.id_planControlesInternos)
            //       .then((resultControlesInternosPlan) => {
            let columnIndex = 2;
            colNum++;
            Object.keys(item).forEach((colName) => {
              ws.cell(rowIndex, 1)
                .string(colNum.toString())
                .style(tableBody.tableBodyText1);

              if (colName === 'Nivel Riesgo Residual') {
                if (item[colName] >= 0 && item[colName] <= 10) {
                  ws.cell(rowIndex, columnIndex++)
                    .string(item[colName].toString())
                    .style(tableBody.tableBodyTolerable);
                } else if (item[colName] >= 10.01 && item[colName] <= 15) {
                  ws.cell(rowIndex, columnIndex++)
                    .string(item[colName].toString())
                    .style(tableBody.tableBodyGestionable);
                } else if (item[colName] >= 15.01) {
                  ws.cell(rowIndex, columnIndex++)
                    .string(item[colName].toString())
                    .style(tableBody.tableBodyNoTolerable);
                } else {
                  ws.cell(rowIndex, columnIndex++)
                    .string(item[colName].toString())
                    .style(tableBody.tableBodyText1);
                }
              } else if (colName === 'Riesgo' || colName === 'Comentarios') {
                ws.cell(rowIndex, columnIndex++)
                  .string(item[colName].toString())
                  .style(tableBody.tableBodyText3);
              } else if (colName === 'id_planRecursos') {
                // console.log(item[colName].toString());
                // let recursos = '';
                // resultRecursos.map((item) => {
                //   recursos += `${item.descripcion}\n\n`;
                // });
                ws.cell(rowIndex, columnIndex++)
                  .string(item[colName])
                  .style(tableBody.tableBodyText3);
              } else if (colName === 'id_planControlesInternos') {
                // let controlesInternos = '';
                // resultControlesInternosPlan.map((item) => {
                //   controlesInternos += `${item.descripcion}\n\n`;
                // });
                ws.cell(rowIndex, columnIndex++)
                  .string(item[colName])
                  .style(tableBody.tableBodyText3);
              } else if (colName === 'id_planControlesImplementacion') {
                // let controlesImplementacion = '';
                // resultControlesImplementacion.map((item) => {
                //   controlesImplementacion += `${item.descripcion}\n\n`;
                // });
                ws.cell(rowIndex, columnIndex++)
                  .string(item[colName])
                  .style(tableBody.tableBodyText3);
              } else {
                ws.cell(rowIndex, columnIndex++)
                  .string(item[colName].toString())
                  .style(tableBody.tableBodyText1);
              }
            });
            rowIndex++;
            conteoPlanesRecorridos++;

            if (totalPlanes == conteoPlanesRecorridos) {
              ws.cell(rowIndex + 2, 1, rowIndex + 2, 2, true)
                .string('Elaborado por:')
                .style(header.tituloInfoUnidad);
              ////////////
              ws.cell(rowIndex + 3, 1, rowIndex + 3, 3, true)
                .string('Firma')
                .style(tableFooter.footerTitle2);
              ws.cell(rowIndex + 3, 4, rowIndex + 3, 14, true).style(
                tableFooter.footerBoxText
              );
              ws.row(rowIndex + 3).setHeight(20);

              ws.cell(rowIndex + 4, 1, rowIndex + 4, 3, true)
                .string('Nombre del responsable')
                .style(tableFooter.footerTitle2);
              ws.cell(rowIndex + 4, 4, rowIndex + 4, 14, true).style(
                tableFooter.footerBoxText
              );
              ws.row(rowIndex + 4).setHeight(20);

              ws.cell(rowIndex + 5, 1, rowIndex + 5, 3, true)
                .string('Puesto')
                .style(tableFooter.footerTitle2);
              ws.cell(rowIndex + 5, 4, rowIndex + 5, 14, true).style(
                tableFooter.footerBoxText
              );
              ws.row(rowIndex + 5).setHeight(20);
              //////////////
              // ws.cell(rowIndex + 2, 1, rowIndex + 6, 8, true)
              //   .string('Conclusión:')
              //   .style(tableFooter.footerTitle1);

              ws.cell(rowIndex + 8, 1, rowIndex + 8, 2, true)
                .string('Visto bueno:')
                .style(header.tituloInfoUnidad);

              ////////////
              ws.cell(rowIndex + 9, 1, rowIndex + 9, 3, true)
                .string('Firma')
                .style(tableFooter.footerTitle2);
              ws.cell(rowIndex + 9, 4, rowIndex + 9, 14, true).style(
                tableFooter.footerBoxText
              );
              ws.row(rowIndex + 9).setHeight(20);

              ws.cell(rowIndex + 10, 1, rowIndex + 10, 3, true)
                .string('Nombre del responsable')
                .style(tableFooter.footerTitle2);
              ws.cell(rowIndex + 10, 4, rowIndex + 10, 14, true).style(
                tableFooter.footerBoxText
              );
              ws.row(rowIndex + 10).setHeight(20);

              ws.cell(rowIndex + 11, 1, rowIndex + 11, 3, true)
                .string('Puesto')
                .style(tableFooter.footerTitle2);
              ws.cell(rowIndex + 11, 4, rowIndex + 11, 14, true).style(
                tableFooter.footerBoxText
              );
              ws.row(rowIndex + 11).setHeight(20);

              wb.write('Plan_de_trabajo.xlsx', res);
            }
            //         });
            //     });
            // });
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
