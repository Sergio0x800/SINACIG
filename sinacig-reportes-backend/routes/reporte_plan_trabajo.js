const express = require('express');
const router = express.Router();
const xl = require('excel4node');
const estilosReportes = require('../utils/reports/estilos_reportes');
const CatalogosService = require('../services/catalogos.service');
const PlanTrabajoReporteService = require('../services/plan_trabajo_reporte.service');
const moment = require('moment');

const catalogosServiceI = new CatalogosService();
const reporteService = new PlanTrabajoReporteService();
router.post('/evaluacion_plan_trabajo', async (req, res, next) => {
  try {
    let { unidadEjecutora, fechaInicio, fechaFin } = req.body;

    fechaInicio = moment(fechaInicio, 'DD/MM/YYYY').format('YYYY-MM-DD');
    fechaFin = moment(fechaFin, 'DD/MM/YYYY').format('YYYY-MM-DD');

    var wb = new xl.Workbook();
    var ws = wb.addWorksheet('Plan de Trabajo');

    //Obtenemos información de la unidad ejecutora por el id
    const unidadEjecutoraData = await catalogosServiceI.findUnidadEjecutoraById(
      unidadEjecutora
    );

    //Encabezado principal
    ws.cell(2, 2, 2, 5, true)
      .string('Ministerio de Salud Pública y Asistencia Social-MSPAS-')
      .style(estilosReportes.encabezadoPrincipal);
    ws.cell(3, 2, 3, 5, true)
      .string('Plan de Trabajo en Evaluación de Riesgos')
      .style(estilosReportes.encabezadoPrincipal);

    //Damos el ancho a las columnas especificando el numero de columna ws.column(1)
    ws.column(1).setWidth(30);
    ws.column(2).setWidth(30);
    ws.column(3).setWidth(20);
    ws.column(4).setWidth(20);
    ws.column(5).setWidth(20);
    ws.column(6).setWidth(20);
    ws.column(7).setWidth(35);
    ws.column(8).setWidth(35);
    ws.column(9).setWidth(35);
    ws.column(10).setWidth(35);
    ws.column(11).setWidth(30);
    ws.column(12).setWidth(20);
    ws.column(13).setWidth(20);
    ws.column(14).setWidth(35);
    ws.column(15).setWidth(20);

    //Datos unidad ejecutora y periodo evaluación
    ws.cell(7, 1).string('Unidad Ejecutora No.').style(estilosReportes.negrita);
    ws.cell(7, 2).string(`${unidadEjecutoraData.codigo_unidad}`);
    ws.cell(8, 1)
      .string('Nombre de la Unidad Ejecutora')
      .style(estilosReportes.negrita);
    ws.cell(8, 2, 8, 4, true).string(`${unidadEjecutoraData.nombre_unidad}`);
    ws.cell(9, 1)
      .string('Periodo de Evaluación')
      .style(estilosReportes.negrita);
    ws.cell(9, 2, 9, 3, true).string(`Del ${fechaInicio} al ${fechaFin}`);

    //Instrucciones
    ws.cell(12, 1, 12, 7, true).string(
      'Instrucciones: Realice el plan de trabajo en evaluación de riesgos identificados previamente, completando la información de la matriz según lo indica el documento'
    );
    ws.cell(13, 1, 13, 2, true).string('SINACIG en la página 52.');

    ws.cell(16, 1)
      .string('Código Unidad Ejecutora')
      .style(estilosReportes.encabezadoTabla)
      .style(estilosReportes.backgroundGris);
    ws.cell(16, 2)
      .string('Nombre Unidad Ejecutora')
      .style(estilosReportes.encabezadoTabla)
      .style(estilosReportes.backgroundGris);
    ws.cell(16, 3)
      .string('Riesgo')
      .style(estilosReportes.encabezadoTabla)
      .style(estilosReportes.backgroundGris);
    ws.cell(16, 4)
      .string('Ref. Tipo Riesgo')
      .style(estilosReportes.encabezadoTabla)
      .style(estilosReportes.backgroundGris);
    ws.cell(16, 5)
      .string('Nivel Riesgo Residual')
      .style(estilosReportes.encabezadoTabla)
      .style(estilosReportes.backgroundGris);
    ws.cell(16, 6)
      .string('Medida Riesgo')
      .style(estilosReportes.encabezadoTabla)
      .style(estilosReportes.backgroundGris);
    ws.cell(16, 7)
      .string('Controles Recomendados')
      .style(estilosReportes.encabezadoTabla)
      .style(estilosReportes.backgroundGris);
    ws.cell(16, 8)
      .string('Perioridad de Implementación')
      .style(estilosReportes.encabezadoTabla)
      .style(estilosReportes.backgroundGris);
    ws.cell(16, 9)
      .string('Área Evaluada y Eventos Identificados')
      .style(estilosReportes.encabezadoTabla)
      .style(estilosReportes.backgroundGris);
    ws.cell(16, 10)
      .string('Controles para Implementación')
      .style(estilosReportes.encabezadoTabla)
      .style(estilosReportes.backgroundGris);
    ws.cell(16, 11)
      .string('Recursos')
      .style(estilosReportes.encabezadoTabla)
      .style(estilosReportes.backgroundGris);
    ws.cell(16, 12)
      .string('Puesto Responsable')
      .style(estilosReportes.encabezadoTabla)
      .style(estilosReportes.backgroundGris);
    ws.cell(16, 12)
      .string('Fecha Inicio')
      .style(estilosReportes.encabezadoTabla)
      .style(estilosReportes.backgroundGris);
    ws.cell(16, 12)
      .string('Fecha Fin')
      .style(estilosReportes.encabezadoTabla)
      .style(estilosReportes.backgroundGris);
    ws.cell(16, 12)
      .string('Comentarios')
      .style(estilosReportes.encabezadoTabla)
      .style(estilosReportes.backgroundGris);

    //indicamos el número de fila donde se comenzará a escribir la información del reporte
    const resultado = await reporteService.dataReportePlanTrabajo(
      unidadEjecutoraData.codigo_unidad,
      fechaInicio,
      fechaFin
    );
    let rowIndex = 17;
    resultado[0].forEach((item) => {
      let columnIndex = 1;
      Object.keys(item).forEach((colName) => {
        ws.cell(rowIndex, columnIndex++).string(item[colName].toString());
      });
      rowIndex++;
    });

    //Pie de página
    ws.cell(rowIndex + 2, 1)
      .string('Firma')
      .style(estilosReportes.negrita);
    ws.cell(rowIndex + 3, 1)
      .string('Nombre del responsable')
      .style(estilosReportes.negrita);
    ws.cell(rowIndex + 4, 1)
      .string('Puesto')
      .style(estilosReportes.negrita);

    wb.write('Plan_de_trabajo.xlsx', res);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

module.exports = router;
