const express = require('express');
const router = express.Router();
const xl = require('excel4node');
const estilosReportes = require('../utils/reports/estilos_reportes');
const CatalogosService = require('../services/catalogos.service');
const EvaluacionRiesgoReporteService = require('../services/evaluacion_riesgo_reporte.service');

const catalogosServiceI = new CatalogosService();
const reporteService = new EvaluacionRiesgoReporteService();
router.post('/evaluacion_riesgo', async (req, res, next) => {
    try {
        const {
            unidadEjecutora,
            fechaInicio,
            fechaFin
        }=req.body;
    
    var wb = new xl.Workbook();
    var ws = wb.addWorksheet("Matriz evaluacion riesgos");
    //Obtenemos información de la unidad ejecutora por el id
    const unidadEjecutoraData = await catalogosServiceI.findUnidadEjecutoraById(unidadEjecutora);
    //Damos el ancho a las columnas especificando el numero de columna ws.column(1)
    ws.column(1).setWidth(30);
    ws.column(2).setWidth(30);
    ws.column(3).setWidth(20);
    ws.column(4).setWidth(20);
    ws.column(5).setWidth(20);
    ws.column(6).setWidth(20);
    ws.column(7).setWidth(20);
    ws.column(8).setWidth(20);
    ws.column(9).setWidth(20);
    ws.column(10).setWidth(30);
    ws.column(11).setWidth(30);
    ws.column(12).setWidth(20);
    ws.column(13).setWidth(20);
    ws.column(14).setWidth(35);
    ws.column(15).setWidth(20);
        
    //Encabezado principal
    ws.cell(2,2, 2,5, true).string("Ministerio de Salud Pública y Asistencia Social-MSPAS-").style(estilosReportes.encabezadoPrincipal)
    ws.cell(3,2, 3,5, true).string("Matriz de Evaluación de Riesgos").style(estilosReportes.encabezadoPrincipal);
    
    //Datos unidad ejecutora y periodo evaluación
    ws.cell(7,1).string("Unidad Ejecutora No.").style(estilosReportes.negrita);
    ws.cell(7,2).string(`${unidadEjecutoraData[0].codigo}`);
    ws.cell(8,1).string("Nombre de la Unidad Ejecutora").style(estilosReportes.negrita);
    ws.cell(8,2, 8,4, true).string(`${unidadEjecutoraData[0].nombre}`)
    ws.cell(9,1).string("Periodo de Evaluación").style(estilosReportes.negrita);
    ws.cell(9,2, 9,3, true).string(`Del ${fechaInicio} al ${fechaFin}`)

    //Instrucciones
    ws.cell(12,1, 12,5, true).string(
        "Instrucciones: Realice la evaluación de riesgos identificados previamente, completando la información de la matriz según lo indica"
        )
    ws.cell(13,1, 13,2, true).string("el documento SINACIG en la página 51")
    
    //Rango registro residual y definir colores
    ws.cell(12,6).string("1 a 10")
    ws.cell(13,6).string("10.01 a 15")
    ws.cell(14,6).string("15.1 +")
    ws.cell(12,7,).string("Tolerable").style(estilosReportes.backgroundVerde);
    ws.cell(13,7,).string("Gestionable").style(estilosReportes.backgroundAmarillo);
    ws.cell(14,7,).string("No tolerable").style(estilosReportes.backgroundRojo);

    //Encabezado columnas
    ws.cell(16,7, 16,8, true).string("Evaluación").style(estilosReportes.encabezadoTabla)

    ws.cell(17,1).string("Código Unidad Ejecutora").style(estilosReportes.encabezadoTabla).style(estilosReportes.backgroundGris);
    ws.cell(17,2).string("Nombre Unidad Ejecutora").style(estilosReportes.encabezadoTabla).style(estilosReportes.backgroundGris);
    ws.cell(17,3).string("Tipo de Objetivo").style(estilosReportes.encabezadoTabla).style(estilosReportes.backgroundGris);
    ws.cell(17,4).string("Código de Referencia").style(estilosReportes.encabezadoTabla).style(estilosReportes.backgroundGris);
    ws.cell(17,5).string("Área Evaluada").style(estilosReportes.encabezadoTabla).style(estilosReportes.backgroundGris);
    ws.cell(17,6).string("Eventos Identificados").style(estilosReportes.encabezadoTabla).style(estilosReportes.backgroundGris);
    ws.cell(17,7).string("Descripción Riesgo").style(estilosReportes.encabezadoTabla).style(estilosReportes.backgroundGris);
    ws.cell(17,8).string("Probabilidad").style(estilosReportes.encabezadoTabla).style(estilosReportes.backgroundGris);
    ws.cell(17,9).string("Severidad").style(estilosReportes.encabezadoTabla).style(estilosReportes.backgroundGris);
    ws.cell(17,10).string("Riesgo Inherente (RI)").style(estilosReportes.encabezadoTabla).style(estilosReportes.backgroundRosado);
    ws.cell(17,11).string("Valor Control Mitigador").style(estilosReportes.encabezadoTabla).style(estilosReportes.backgroundRosado);
    ws.cell(17,12).string("Riesgo Residual").style(estilosReportes.encabezadoTabla).style(estilosReportes.backgroundRosado);
    ws.cell(17,13).string("Medida Riesgo").style(estilosReportes.encabezadoTabla).style(estilosReportes.backgroundGris);
    ws.cell(17,14).string("Control Interno para Mitigar").style(estilosReportes.encabezadoTabla).style(estilosReportes.backgroundGris);
    ws.cell(17,15).string("Observaciones").style(estilosReportes.encabezadoTabla).style(estilosReportes.backgroundGris);

    //Obtenemos la infomación del reporte
    const resultado = await reporteService.dataReporteEvaluacionRiesgo(
        unidadEjecutoraData[0].codigo,
        fechaInicio,
        fechaFin
    );

    //indicamos el número de fila donde se comenzará a escribir la información del reporte
    let rowIndex = 18;
        resultado[0].forEach((item) => {
            let columnIndex = 1;
            Object.keys(item).forEach((colName) => {
                if(item.registro_residual > 0 && item.registro_residual <= 10){
                    ws.cell(rowIndex, 12).string(item.registro_residual.toString()).style(estilosReportes.backgroundVerde);
                }else if(item.registro_residual > 10 && item.registro_residual <= 15 ){
                    ws.cell(rowIndex, 12).string(item.registro_residual.toString()).style(estilosReportes.backgroundAmarillo);
                }else if(item.registro_residual > 15){
                    ws.cell(rowIndex, 12).string(item.registro_residual.toString()).style(estilosReportes.backgroundRojo);
                }
                ws.cell(rowIndex, columnIndex++).string(item[colName].toString())
                
            })
            rowIndex++
        })

    //Pie de página 
    ws.cell(rowIndex + 2, 1).string("Conclusión").style(estilosReportes.negrita);
    ws.cell(rowIndex + 5, 1).string("Firma").style(estilosReportes.negrita);
    ws.cell(rowIndex + 6, 1).string("Nombre del responsable").style(estilosReportes.negrita);
    ws.cell(rowIndex + 7, 1).string("Puesto").style(estilosReportes.negrita);


    wb.write('Matriz_evaluacion_riesgos.xlsx', res);

    } catch (error) {
        console.log(error.message);
        next(error);
    }
})

module.exports = router;