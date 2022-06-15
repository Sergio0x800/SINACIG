const express = require('express');
const router = express.Router();
const CatalogosService = require('../services/catalogos.service');
const moment = require('moment');

const xl = require('excel4node');
// const PdfPrinter = require("pdfmake");
// const fs = require("fs");
const {
  header,
  table,
  tableBody,
  tableFooter,
} = require('../utils/reports/styles-reportes-excel/style_report_evaluacion_riesgo');
const EvaluacionRiesgoReporteService = require('../services/evaluacion_riesgo_reporte.service');

const catalogosServiceI = new CatalogosService();
const reporteService = new EvaluacionRiesgoReporteService();

router.post('/evaluacion_riesgo', async (req, res, next) => {
  try {
    const { unidadEjecutora, fechaInicio, fechaFin } = req.body;

    var wb = new xl.Workbook();
    var ws = wb.addWorksheet('Matriz evaluacion riesgos');

    //Obtenemos información de la unidad ejecutora por el id
    const unidadEjecutoraData = await catalogosServiceI.findUnidadEjecutoraById(
      unidadEjecutora
    );

    //Damos el ancho a las columnas especificando el numero de columna ws.column(1)
    ws.column(1).setWidth(10);
    ws.column(2).setWidth(10);
    ws.column(3).setWidth(14);
    ws.column(4).setWidth(6);
    ws.column(5).setWidth(15);
    ws.column(6).setWidth(14);
    ws.column(7).setWidth(25);
    ws.column(8).setWidth(14);
    ws.column(9).setWidth(11);
    ws.column(10).setWidth(11);
    ws.column(11).setWidth(10);
    ws.column(12).setWidth(10);
    ws.column(13).setWidth(21);
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

    ws.row(17).filter({
      firstRow: 17,
      firstColumn: 1,
      lastRow: 17,
      lastColumn: 13,
    });

    //Encabezado principal
    const fecha_inicio = moment(fechaInicio, 'YYYY-MM-DD').format('DD/MM/YYYY');
    const fecha_fin = moment(fechaFin, 'YYYY-MM-DD').format('DD/MM/YYYY');
    ws.addImage({
      path: '/root/sinacig/sinacig-reportes-backend/utils/reports/img/logo_mspas_report.png',
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
      .string('Matriz de Evaluación de Riesgos')
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
    // ws.cell(7, 4, 7, 6, true)
    //   .string(`${unidadEjecutoraData.codigo_unidad}`)
    //   .style(header.text);
    ws.cell(8, 1, 8, 3, true)
      .string('Nombre de la Unidad Ejecutora:')
      .style(header.tituloInfoUnidad);
    ws.cell(8, 4, 8, 13, true)
      .string(`${unidadEjecutoraData.nombre_unidad}`)
      .style(header.text);
    ws.cell(9, 1, 9, 3, true)
      .string('Periodo de evaluación:')
      .style(header.tituloInfoUnidad);
    ws.cell(9, 4, 9, 6, true)
      .string(`Del ${fecha_inicio} al ${fecha_fin}`)
      .style(header.text);

    // Instrucciones
    ws.cell(12, 1, 13, 9, true)
      .string(
        'Instrucciones: Realice la evaluación de riesgos identificados previamente, completando la información de la matriz según lo indica el documento SINACIG en la página 51.'
      )
      .style(header.text);

    //Rango registro residual y definir colores
    ws.cell(12, 11).string('1 a 10').style(header.text);
    ws.cell(13, 11).string('10.01 a 15').style(header.text);
    ws.cell(14, 11).string('15.1 +').style(header.text);
    ws.cell(12, 12, 12, 13, true)
      .string('Tolerable')
      .style(header.medidaTolerable);
    ws.cell(13, 12, 13, 13, true)
      .string('Gestionable')
      .style(header.medidaGestionable);
    ws.cell(14, 12, 14, 13, true)
      .string('No tolerable')
      .style(header.medidaNoTolerable);

    //numeracion col tablas
    ws.cell(16, 2).string('(1)').style(tableBody.tableBodyText4);
    ws.cell(16, 3).string('(2)').style(tableBody.tableBodyText4);
    ws.cell(16, 4).string('(3)').style(tableBody.tableBodyText4);
    ws.cell(16, 5).string('(4)').style(tableBody.tableBodyText4);
    ws.cell(16, 6).string('(5)').style(tableBody.tableBodyText4);
    ws.cell(16, 7).string('(6)').style(tableBody.tableBodyText4);
    ws.cell(15, 8, 15, 9, true).string('(7)').style(tableBody.tableBodyText4);
    ws.cell(16, 10).string('(8)').style(tableBody.tableBodyText4);
    ws.cell(16, 11).string('(9)').style(tableBody.tableBodyText4);
    ws.cell(16, 12).string('(10)').style(tableBody.tableBodyText4);
    ws.cell(16, 13).string('(11)').style(tableBody.tableBodyText4);
    ws.cell(16, 14).string('(12)').style(tableBody.tableBodyText4);

    //Encabezado columnas
    const filaEncabezado = 17;
    ws.cell(16, 8, 16, 9, true)
      .string('Evaluación')
      .style(table.tableHeaderEvaluacion);
    ws.cell(filaEncabezado, 1).string('No.').style(table.tableHeader);
    ws.cell(filaEncabezado, 2)
      .string('Código Unidad Ejecutora')
      .style(table.tableHeader);
    ws.cell(filaEncabezado, 3)
      .string('Tipo de Objetivo')
      .style(table.tableHeader);
    ws.cell(filaEncabezado, 4).string('Ref').style(table.tableHeader);
    ws.cell(filaEncabezado, 5).string('Área Evaluada').style(table.tableHeader);
    ws.cell(filaEncabezado, 6)
      .string('Eventos Identificados')
      .style(table.tableHeader);
    ws.cell(filaEncabezado, 7)
      .string('Descripción Riesgo')
      .style(table.tableHeader);
    ws.cell(filaEncabezado, 8).string('Probabilidad').style(table.tableHeader);
    ws.cell(filaEncabezado, 9).string('Severidad').style(table.tableHeader);
    ws.cell(filaEncabezado, 10)
      .string('Riesgo Inherente (RI)')
      .style(table.tableHeaderMedida);
    ws.cell(filaEncabezado, 11)
      .string('Valor Control Mitigador')
      .style(table.tableHeaderMedida);
    ws.cell(filaEncabezado, 12)
      .string('Riesgo Residual (RR)')
      .style(table.tableHeaderMedida);
    ws.cell(filaEncabezado, 13)
      .string('Control Interno para mitigar (gestionar) el riesgo')
      .style(table.tableHeader);
    ws.cell(filaEncabezado, 14)
      .string('Observaciones')
      .style(table.tableHeader);

    //Obtenemos la infomación del reporte

    await reporteService
      .dataReporteEvaluacionRiesgo(
        unidadEjecutoraData.codigo_unidad,
        fechaInicio,
        fechaFin
      )
      .then((resultado) => {
        //indicamos el número de fila donde se comenzará a escribir la información del reporte
        let totalRiesgos = resultado[0].length;
        let conteoRiesgosRecorridos = 0;
        let rowIndex = 18;
        let colNum = 0;

        resultado[0].forEach((item) => {
          reporteService
            .dataControlesInternos(item.id_riesgo)
            .then((result) => {
              let columnIndex = 2;
              colNum++;

              Object.keys(item).forEach((colName) => {
                ws.cell(rowIndex, 1)
                  .string(colNum.toString())
                  .style(tableBody.tableBodyText1);
                if (colName === 'Riesgo Residual') {
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
                } else if (
                  colName === 'Tipo Objetivo' ||
                  colName === 'Código Referencia' ||
                  colName === 'Área Evaluada'
                ) {
                  ws.cell(rowIndex, columnIndex++)
                    .string(item[colName].toString())
                    .style(tableBody.tableBodyText2);
                } else if (
                  colName === 'Descripción Riesgo' ||
                  colName === 'Eventos Identificados' ||
                  colName === 'Observaciones'
                ) {
                  ws.cell(rowIndex, columnIndex++)
                    .string(item[colName].toString())
                    .style(tableBody.tableBodyText3);
                } else if (colName === 'id_riesgo') {
                  let controlesInternos = '';
                  result.map((item) => {
                    controlesInternos += `${item.descripcion}\n\n`;
                  });
                  ws.cell(rowIndex, columnIndex++)
                    .string(controlesInternos)
                    .style(tableBody.tableBodyText3);
                } else {
                  ws.cell(rowIndex, columnIndex++)
                    .string(item[colName].toString())
                    .style(tableBody.tableBodyText1);
                }
              });
              rowIndex++;
              conteoRiesgosRecorridos++;

              //Pie de página
              if (totalRiesgos == conteoRiesgosRecorridos) {
                ws.cell(rowIndex + 2, 1, rowIndex + 6, 14, true)
                  .string('Conclusión:')
                  .style(tableFooter.footerTitle1);

                ws.cell(rowIndex + 8, 1, rowIndex + 8, 3, true)
                  .string('Firma')
                  .style(tableFooter.footerTitle2);
                ws.cell(rowIndex + 8, 4, rowIndex + 8, 14, true).style(
                  tableFooter.footerBoxText
                );
                ws.row(rowIndex + 8).setHeight(20);

                ws.cell(rowIndex + 9, 1, rowIndex + 9, 3, true)
                  .string('Nombre del responsable')
                  .style(tableFooter.footerTitle2);
                ws.cell(rowIndex + 9, 4, rowIndex + 9, 14, true).style(
                  tableFooter.footerBoxText
                );
                ws.row(rowIndex + 9).setHeight(20);

                ws.cell(rowIndex + 10, 1, rowIndex + 10, 3, true)
                  .string('Puesto')
                  .style(tableFooter.footerTitle2);
                ws.cell(rowIndex + 10, 4, rowIndex + 10, 14, true).style(
                  tableFooter.footerBoxText
                );
                ws.row(rowIndex + 10).setHeight(20);

                wb.write('Matriz_evaluacion_riesgos.xlsx', res);
              }
            });
        });
      });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

// router.post('/evaluacion_riesgo_pdf', async (req, res, next) => {

// })

module.exports = router;
