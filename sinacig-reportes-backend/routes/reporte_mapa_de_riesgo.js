const express = require('express');
const router = express.Router();
const xl = require('excel4node');
const CatalogosService = require('../services/catalogos.service');
const estilosReportes = require('../utils/reports/estilos_reportes');


const catalogosServiceI = new CatalogosService();
router.post('/mapa_riesgo', async (req, res, next) => {
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
        ws.cell(2,3, 2,6, true).string("Ministerio de Salud Pública y Asistencia Social-MSPAS-").style(estilosReportes.encabezadoPrincipal)
        ws.cell(3,3, 3,6, true).string("Matriz de Evaluación de Riesgos").style(estilosReportes.encabezadoPrincipal);

        //Datos unidad ejecutora y periodo evaluación
        ws.cell(7,1).string("Unidad Ejecutora No.").style(estilosReportes.negrita);
        ws.cell(7,2).string(`${unidadEjecutoraData[0].codigo}`);
        ws.cell(8,1).string("Nombre de la Unidad Ejecutora").style(estilosReportes.negrita);
        ws.cell(8,2, 8,4, true).string(`${unidadEjecutoraData[0].nombre}`)
        ws.cell(9,1).string("Periodo de Evaluación").style(estilosReportes.negrita);
        ws.cell(9,2, 9,3, true).string(`Del ${fechaInicio} al ${fechaFin}`)


        //Instrucciones
        ws.cell(12,1, 12,5, true).string(
            "Instrucciones: Realice el mapa de riesgos, completando la información de la matriz según lo indica el documento SINACIG"
            )
        ws.cell(13,1, 13,2, true).string("en la página 53.");


        wb.write('Mapa_de_riesgo.xlsx', res);
    } catch (error) {
        console.log(error.message);
        next(error);
    }





});


module.exports = router;