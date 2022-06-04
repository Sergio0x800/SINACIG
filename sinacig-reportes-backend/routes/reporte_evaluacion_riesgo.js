const express = require('express');
const router = express.Router();
const CatalogosService = require('../services/catalogos.service');
const moment = require('moment');

const xl = require('excel4node');
const estilosReportes = require('../utils/reports/estilos_reportes');
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
    ws.column(1).setWidth(14);
    ws.column(2).setWidth(14);
    ws.column(3).setWidth(8);
    ws.column(4).setWidth(11);
    ws.column(5).setWidth(20);
    ws.column(6).setWidth(31);
    ws.column(7).setWidth(14);
    ws.column(8).setWidth(11);
    ws.column(9).setWidth(11);
    ws.column(10).setWidth(11);
    ws.column(11).setWidth(15);
    ws.column(12).setWidth(33);
    ws.column(13).setWidth(20);
    ws.column(14).setWidth(35);

    //Encabezado principal
    const fecha_inicio = moment(fechaInicio, 'YYYY-MM-DD').format('DD/MM/YYYY');
    const fecha_fin = moment(fechaFin, 'YYYY-MM-DD').format('DD/MM/YYYY');
    ws.cell(2, 1, 3, 14, true)
      .string('Ministerio de Salud Pública y Asistencia Social-MSPAS-')
      .style(estilosReportes.encabezadoPrincipal);
    ws.cell(4, 1, 4, 14, true)
      .string('Matriz de Evaluación de Riesgos')
      .style(estilosReportes.encabezadoPrincipal);
    ws.cell(5, 1, 5, 14, true)
      .string(`Del ${fecha_inicio} al ${fecha_fin}`)
      .style(estilosReportes.encabezadoPrincipal);

    //Datos unidad ejecutora y periodo evaluación
    ws.cell(6, 1)
      .string('Unidad Ejecutora No.')
      .style(estilosReportes.infoUnidad);
    ws.cell(6, 2).string(`${unidadEjecutoraData.codigo_unidad}`);
    ws.cell(7, 1)
      .string('Nombre de la Unidad Ejecutora')
      .style(estilosReportes.infoUnidad);
    ws.cell(7, 2, 7, 4, true).string(`${unidadEjecutoraData.nombre_unidad}`);

    //Instrucciones
    // ws.cell(12, 1, 12, 5, true).string(
    //   'Instrucciones: Realice la evaluación de riesgos identificados previamente, completando la información de la matriz según lo indica'
    // );
    // ws.cell(13, 1, 13, 2, true).string('el documento SINACIG en la página 51');

    //Rango registro residual y definir colores
    ws.cell(6, 11).string('1 a 10').style(estilosReportes.infoMedida);
    ws.cell(7, 11).string('10.01 a 15').style(estilosReportes.infoMedida);
    ws.cell(8, 11).string('15.1 +').style(estilosReportes.infoMedida);
    ws.cell(6, 12, 6, 13, true)
      .string('Tolerable')
      .style(estilosReportes.backgroundVerde);
    ws.cell(7, 12, 7, 13, true)
      .string('Gestionable')
      .style(estilosReportes.backgroundAmarillo);
    ws.cell(8, 12, 8, 13, true)
      .string('No tolerable')
      .style(estilosReportes.backgroundRojo);

    //Encabezado columnas
    // ws.cell(16, 7, 16, 8, true)
    //   .string('No.')
    //   .style(estilosReportes.encabezadoTabla);
    const filaEncabezado = 11;
    ws.cell(10, 8, 10, 9, true)
      .string('Evaluación')
      .style(estilosReportes.encabezadoTabla);
    ws.cell(filaEncabezado, 1)
      .string('Código Unidad Ejecutora')
      .style(estilosReportes.encabezadoTabla);
    // ws.cell(filaEncabezado, 2)
    //   .string('Nombre Unidad Ejecutora')
    //   .style(estilosReportes.encabezadoTabla);
    ws.cell(filaEncabezado, 2)
      .string('Tipo de Objetivo')
      .style(estilosReportes.encabezadoTabla);
    ws.cell(filaEncabezado, 3)
      .string('Ref')
      .style(estilosReportes.encabezadoTabla);
    ws.cell(filaEncabezado, 4)
      .string('Área Evaluada')
      .style(estilosReportes.encabezadoTabla);
    ws.cell(filaEncabezado, 5)
      .string('Eventos Identificados')
      .style(estilosReportes.encabezadoTabla);
    ws.cell(filaEncabezado, 6)
      .string('Descripción Riesgo')
      .style(estilosReportes.encabezadoTabla);
    ws.cell(filaEncabezado, 7)
      .string('Probabilidad')
      .style(estilosReportes.encabezadoTabla);
    ws.cell(filaEncabezado, 8)
      .string('Severidad')
      .style(estilosReportes.encabezadoTabla);
    ws.cell(filaEncabezado, 9)
      .string('Riesgo Inherente (RI)')
      .style(estilosReportes.encabezadoTabla);
    ws.cell(filaEncabezado, 10)
      .string('Valor Control Mitigador')
      .style(estilosReportes.encabezadoTabla);
    ws.cell(filaEncabezado, 11)
      .string('Riesgo Residual')
      .style(estilosReportes.encabezadoTabla);
    // ws.cell(filaEncabezado, 13)
    //   .string('Medida Riesgo')
    //   .style(estilosReportes.encabezadoTabla);
    ws.cell(filaEncabezado, 12)
      .string('Control Interno para Mitigar')
      .style(estilosReportes.encabezadoTabla);
    ws.cell(filaEncabezado, 13)
      .string('Observaciones')
      .style(estilosReportes.encabezadoTabla);

    //Obtenemos la infomación del reporte
    const resultado = await reporteService.dataReporteEvaluacionRiesgo(
      unidadEjecutoraData.codigo_unidad,
      fechaInicio,
      fechaFin
    );

    //indicamos el número de fila donde se comenzará a escribir la información del reporte
    let rowIndex = 12;
    resultado[0].forEach((item) => {
      let columnIndex = 1;
      Object.keys(item).forEach((colName) => {
        if (colName === 'Riesgo Residual') {
          if (item[colName] >= 0 && item[colName] <= 10) {
            ws.cell(rowIndex, columnIndex++)
              .string(item[colName].toString())
              .style(estilosReportes.backgroundVerde);
          } else if (item[colName] >= 10.01 && item[colName] <= 15) {
            ws.cell(rowIndex, columnIndex++)
              .string(item[colName].toString())
              .style(estilosReportes.backgroundAmarillo);
          } else if (item[colName] >= 15.01) {
            ws.cell(rowIndex, columnIndex++)
              .string(item[colName].toString())
              .style(estilosReportes.backgroundRojo);
          } else {
            ws.cell(rowIndex, columnIndex++)
              .string(item[colName].toString())
              .style(estilosReportes.infoTabla);
          }
        } else {
          ws.cell(rowIndex, columnIndex++)
            .string(item[colName].toString())
            .style(estilosReportes.infoTabla);
        }
      });
      rowIndex++;
    });

    // resultado[0].forEach((riesgo) => {
    //   console.log(riesgo);
    // });

    //Pie de página
    ws.cell(rowIndex + 2, 1)
      .string('Conclusión')
      .style(estilosReportes.negrita);
    ws.cell(rowIndex + 5, 1)
      .string('Firma')
      .style(estilosReportes.negrita);
    ws.cell(rowIndex + 6, 1)
      .string('Nombre del responsable')
      .style(estilosReportes.negrita);
    ws.cell(rowIndex + 7, 1)
      .string('Puesto')
      .style(estilosReportes.negrita);

    wb.write('Matriz_evaluacion_riesgos.xlsx', res);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

module.exports = router;
