const xl = require('excel4node');
var wb = new xl.Workbook();

const estilosReportes = {
    encabezadoPrincipal: wb.createStyle({
        font: {
            bold: true,
            size: 15
        },
        alignment: {
            horizontal: 'center',
            vertical: 'center'
        },
    }),
    encabezadoTabla: wb.createStyle({
        font: {
            bold: true,
            size: 12
        },
        alignment: {
            horizontal: 'center',
            vertical: 'center'
        },
    }),
    negrita: wb.createStyle({
        font: {
            bold: true,
            size: 12
        },
    }),
    backgroundAmarillo: wb.createStyle({
        fill: {
            type: 'pattern',
            patternType: 'solid',
            bgColor: '#FFFF00',
            fgColor: '#FFFF00',
          }
    }),
    backgroundRojo: wb.createStyle({
        fill: {
            type: 'pattern',
            patternType: 'solid',
            bgColor: '#D11003',
            fgColor: '#D11003',
          }
    }),
    backgroundVerde: wb.createStyle({
        fill: {
            type: 'pattern',
            patternType: 'solid',
            bgColor: '#14BE00',
            fgColor: '#14BE00',
          }
    }),
    backgroundGris: wb.createStyle({
        fill: {
            type: 'pattern',
            patternType: 'solid',
            bgColor: '#D6F3BC',
            fgColor: '#D6F3BC'
        }
    }),
    backgroundRosado: wb.createStyle({
        fill: {
            type: 'pattern',
            patternType: 'solid',
            bgColor: '#F79B87',
            fgColor: '#F79B87'
        }
    })


}
module.exports = estilosReportes