const xl = require('excel4node');
var wb = new xl.Workbook();

const estilosReportes = {
  encabezadoPrincipal: wb.createStyle({
    font: {
      bold: true,
      size: 11,
      name: 'Arial',
    },
    alignment: {
      horizontal: 'center',
      vertical: 'center',
    },
  }),

  fondoHeader: wb.createStyle({
    fill: {
      type: 'pattern',
      patternType: 'solid',
      bgColor: '#FFFFFF',
      fgColor: '#FFFFFF',
    },
  }),
  encabezadoTabla: wb.createStyle({
    border: {
      left: {
        style: 'thin',
        color: 'black',
      },
      right: {
        style: 'thin',
        color: 'black',
      },
      top: {
        style: 'thin',
        color: 'black',
      },
      bottom: {
        style: 'thin',
        color: 'black',
      },
      outline: false,
    },
    font: {
      bold: true,
      size: 11,
      name: 'Arial',
    },
    alignment: {
      shrinkToFit: true,
      wrapText: true,
      horizontal: 'center',
      vertical: 'center',
    },
    fill: {
      type: 'pattern',
      patternType: 'solid',
      bgColor: '#D9D9D9',
      fgColor: '#D9D9D9',
    },
  }),

  infoTabla: wb.createStyle({
    border: {
      left: {
        style: 'thin',
        color: 'black',
      },
      right: {
        style: 'thin',
        color: 'black',
      },
      top: {
        style: 'thin',
        color: 'black',
      },
      bottom: {
        style: 'thin',
        color: 'black',
      },
      outline: false,
    },
    font: {
      size: 11,
      name: 'Arial',
    },
    alignment: {
      shrinkToFit: true,
      wrapText: true,
      horizontal: 'center',
      vertical: 'center',
    },
  }),

  negrita: wb.createStyle({
    font: {
      bold: true,
      size: 12,
    },
  }),
  infoUnidad: wb.createStyle({
    font: {
      name: 'Arial',
      size: 11,
      color: '#000000',
    },
  }),
  infoMedida: wb.createStyle({
    font: {
      name: 'Arial',
      size: 11,
      color: '#000000',
    },
  }),
  backgroundAmarillo: wb.createStyle({
    border: {
      left: {
        style: 'thin',
        color: 'black',
      },
      right: {
        style: 'thin',
        color: 'black',
      },
      top: {
        style: 'thin',
        color: 'black',
      },
      bottom: {
        style: 'thin',
        color: 'black',
      },
      outline: false,
    },
    font: {
      name: 'Arial',
      size: 11,
      color: '#000000',
    },
    fill: {
      type: 'pattern',
      patternType: 'solid',
      bgColor: '#FFFF00',
      fgColor: '#FFFF00',
    },
    alignment: {
      shrinkToFit: true,
      wrapText: true,
      horizontal: 'center',
      vertical: 'center',
    },
  }),
  backgroundAmarillo2: wb.createStyle({
    font: {
      name: 'Arial',
      size: 11,
      color: '#000000',
    },
    fill: {
      type: 'pattern',
      patternType: 'solid',
      bgColor: '#FFFF00',
      fgColor: '#FFFF00',
    },
    alignment: {
      shrinkToFit: true,
      wrapText: true,
      horizontal: 'center',
      vertical: 'center',
    },
  }),
  backgroundRojo: wb.createStyle({
    border: {
      left: {
        style: 'thin',
        color: 'black',
      },
      right: {
        style: 'thin',
        color: 'black',
      },
      top: {
        style: 'thin',
        color: 'black',
      },
      bottom: {
        style: 'thin',
        color: 'black',
      },
      outline: false,
    },
    font: {
      name: 'Arial',
      size: 11,
      color: '#000000',
    },
    fill: {
      type: 'pattern',
      patternType: 'solid',
      bgColor: '#D11003',
      fgColor: '#D11003',
    },
    alignment: {
      shrinkToFit: true,
      wrapText: true,
      horizontal: 'center',
      vertical: 'center',
    },
  }),
  backgroundRojo2: wb.createStyle({
    font: {
      name: 'Arial',
      size: 11,
      color: '#000000',
    },
    fill: {
      type: 'pattern',
      patternType: 'solid',
      bgColor: '#D11003',
      fgColor: '#D11003',
    },
    alignment: {
      shrinkToFit: true,
      wrapText: true,
      horizontal: 'center',
      vertical: 'center',
    },
  }),

  backgroundVerde: wb.createStyle({
    border: {
      left: {
        style: 'thin',
        color: 'black',
      },
      right: {
        style: 'thin',
        color: 'black',
      },
      top: {
        style: 'thin',
        color: 'black',
      },
      bottom: {
        style: 'thin',
        color: 'black',
      },
      outline: false,
    },
    font: {
      name: 'Arial',
      size: 11,
      color: '#000000',
    },
    fill: {
      type: 'pattern',
      patternType: 'solid',
      bgColor: '#00B050',
      fgColor: '#00B050',
    },
    alignment: {
      shrinkToFit: true,
      wrapText: true,
      horizontal: 'center',
      vertical: 'center',
    },
  }),
  backgroundVerde2: wb.createStyle({
    font: {
      name: 'Arial',
      size: 11,
      color: '#000000',
    },
    fill: {
      type: 'pattern',
      patternType: 'solid',
      bgColor: '#00B050',
      fgColor: '#00B050',
    },
    alignment: {
      shrinkToFit: true,
      wrapText: true,
      horizontal: 'center',
      vertical: 'center',
    },
  }),

  backgroundGris: wb.createStyle({
    fill: {
      type: 'pattern',
      patternType: 'solid',
      bgColor: '#D6F3BC',
      fgColor: '#D6F3BC',
    },
  }),
  backgroundRosado: wb.createStyle({
    fill: {
      type: 'pattern',
      patternType: 'solid',
      bgColor: '#F79B87',
      fgColor: '#F79B87',
    },
  }),
};
module.exports = estilosReportes;
