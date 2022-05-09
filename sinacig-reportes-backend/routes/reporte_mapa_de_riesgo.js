const express = require('express');
const router = express.Router();
const xl = require('excel4node');
const CatalogosService = require('../services/catalogos.service');
const estilosReportes = require('../utils/reports/estilos_reportes');
const MapaRiesgo = require('../services/mapa_riesgo_reporte.service');


const catalogosServiceI = new CatalogosService();
const mapaRiesgoService = new MapaRiesgo();
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
        ws.column(2).setWidth(15);
        ws.column(3).setWidth(30);
        ws.column(4).setWidth(30);
        ws.column(5).setWidth(30);
        ws.column(6).setWidth(30);
        ws.column(7).setWidth(30);
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
        
        ws.cell(15,2, 15,6, true).string("Probabilidad y Severidad").style(estilosReportes.encabezadoTabla)
        ws.cell(16,1, 21,1, true).string("Probabilidad").style(estilosReportes.encabezadoTabla)
        
        ws.cell(16,2).number(1)
        ws.cell(17,2).number(2)
        ws.cell(18,2).number(3)
        ws.cell(19,2).number(4)
        ws.cell(20,2).number(5)
        ws.cell(21,3).number(1)
        ws.cell(21,4).number(2)
        ws.cell(21,5).number(3)
        ws.cell(21,6).number(4)
        ws.cell(21,7).number(5)

        ws.row(16).setHeight(110);
        ws.row(17).setHeight(110);
        ws.row(18).setHeight(110);
        ws.row(19).setHeight(110);
        ws.row(20).setHeight(110);
    
        let dataReporte = await mapaRiesgoService.dataReporteMapariesgo(unidadEjecutoraData[0].codigo, fechaInicio, fechaFin);
        console.log(dataReporte);

        // Le damos color a la tabla de mapa de riesgo
        let fila = 16
        //variable i es la probabilidad, variable j es la severidad
        for (let i = 0; i < 5; i++) {
            let columna = 3
            for (let j = 0; j < 5; j++) {
                if(i == 0 && j == 2){
                    datosAmarillo(1, 3, fila, columna);
                }else if(i == 1 && j == 2){
                    datosAmarillo(2, 3, fila, columna);
                }else if(i == 2 && j == 3){
                    datosAmarillo(3, 4, fila, columna);
                }else if(i == 2 && j == 4){
                    datosAmarillo(3, 5, fila, columna);
                }else if(i == 0 && j == 3){
                    datosRojo(1, 4, fila, columna);
                }else if(i == 0 && j == 4){
                    datosRojo(1, 5, fila, columna);
                }else if(i == 1 && j == 3){
                    datosRojo(2, 4, fila, columna);
                }else if(i == 1 && j == 4){
                    datosRojo(2, 5, fila, columna);
                }else if(i == 0 && j == 0){
                    datosVerde(1, 1, fila, columna)
                }else if(i == 0 && j == 1){
                    datosVerde(1, 2, fila, columna)
                }else if(i == 1 && j == 0){
                    datosVerde(2, 1, fila, columna)
                }else if(i == 1 && j == 1){
                    datosVerde(2, 2, fila, columna)
                }else if(i == 2 && j == 0){
                    datosVerde(3, 1, fila, columna)
                }else if(i == 2 && j == 1){
                    datosVerde(3, 2, fila, columna)
                }else if(i == 2 && j == 2){
                    datosVerde(3, 3, fila, columna)
                }else if(i == 3 && j == 0){
                    datosVerde(4, 1, fila, columna)
                }else if(i == 3 && j == 1){
                    datosVerde(4, 2, fila, columna)
                }else if(i == 3 && j == 2){
                    datosVerde(4, 3, fila, columna)
                }else if(i == 3 && j == 3){
                    datosVerde(4, 4, fila, columna)
                }else if(i == 3 && j == 4){
                    datosVerde(4, 5, fila, columna)
                }else if(i == 4 && j == 0){
                    datosVerde(5, 1, fila, columna)
                }else if(i == 4 && j == 1){
                    datosVerde(5, 2, fila, columna)
                }else if(i == 4 && j == 2){
                    datosVerde(5, 3, fila, columna)
                }else if(i == 4 && j == 3){
                    datosVerde(5, 4, fila, columna)
                }else if(i == 4 && j == 4){
                    datosVerde(5, 5, fila, columna)
                }
                    columna ++
            }
            fila ++ 
        }
        
        function datosAmarillo(pro, sev, fila, columna){
            let data = [];
            var celda;
            dataReporte.find(element => {
                if(element.Probabilidad == pro && element.Severidad == sev){
                    data.push(`(${element.Riesgo}), `)
                    celda = ws.cell(fila, columna).string(data).style(estilosReportes.backgroundAmarillo)
                }else{
                    celda = ws.cell(fila, columna).style(estilosReportes.backgroundAmarillo);
                }
            })
            return celda;
        }

        function datosRojo(pro, sev, fila, columna){
            let data = [];
            var celda;
            dataReporte.find(element => {
                if(element.Probabilidad == pro && element.Severidad == sev){
                    data.push(`(${element.Riesgo}), `)
                    celda = ws.cell(fila, columna).string(data).style(estilosReportes.backgroundRojo);  
                }else{
                    celda = ws.cell(fila, columna).style(estilosReportes.backgroundRojo);
                }
            })
            return celda;
        }

        function datosVerde(pro, sev, fila, columna){
            let data = [];
            var celda;
            dataReporte.find(element => {
                if(element.Probabilidad == pro && element.Severidad == sev){
                    data.push(`(${element.Riesgo}), `)
                    celda = ws.cell(fila, columna).string(data).style(estilosReportes.backgroundVerde);  
                }else{
                    celda = ws.cell(fila, columna).style(estilosReportes.backgroundVerde);
                }
            })
            return celda;
        }

        ws.cell(23, 3, 23, 7, true).string("Severidad").style(estilosReportes.encabezadoTabla)



        ws.cell(26,1).string("Riesgos").style(estilosReportes.encabezadoTabla);
        ws.cell(26,2).string("Probabilidad").style(estilosReportes.encabezadoTabla);
        ws.cell(26,3).string("Severidad").style(estilosReportes.encabezadoTabla);
        ws.cell(26,4).string("Punteo").style(estilosReportes.encabezadoTabla);


        let rowIndex = 27;
            dataReporte.forEach((item) => {
                let columnIndex = 1;
                Object.keys(item).forEach((colName) => {
                    ws.cell(rowIndex, columnIndex++).string(item[colName].toString())
                })
                rowIndex++
            })

        wb.write('Mapa_de_riesgo.xlsx', res);
    } catch (error) {
        console.log(error.message);
        next(error);
    }
});



module.exports = router;