const xl = require('excel4node');
var wb = new xl.Workbook();

const header = {
  tituloPrincipal: wb.createStyle({
    font: {
      bold: true,
      size: 14,
      name: 'Arial',
    },
    alignment: {
      horizontal: 'center',
      vertical: 'center',
    },
  }),
  tituloSecundario: wb.createStyle({
    font: {
      bold: true,
      size: 12,
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
  tituloInfoUnidad: wb.createStyle({
    font: {
      bold: true,
      size: 11,
      name: 'Arial',
    },
    alignment: {
      horizontal: 'left',
      vertical: 'center',
    },
  }),
  text: wb.createStyle({
    font: {
      size: 11,
      name: 'Arial',
    },
    alignment: {
      horizontal: 'left',
      vertical: 'center',
      shrinkToFit: true,
      wrapText: true,
    },
  }),
  medidaTolerable: wb.createStyle({
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
      horizontal: 'left',
      vertical: 'center',
    },
  }),
  medidaGestionable: wb.createStyle({
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
      horizontal: 'left',
      vertical: 'center',
    },
  }),
  medidaNoTolerable: wb.createStyle({
    font: {
      name: 'Arial',
      size: 11,
      color: '#000000',
    },
    fill: {
      type: 'pattern',
      patternType: 'solid',
      bgColor: '#FF0000',
      fgColor: '#FF0000',
    },
    alignment: {
      horizontal: 'left',
      vertical: 'center',
    },
  }),
};

const table = {
  tableHeaderEvaluacion: wb.createStyle({
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
      name: 'Arial',
      size: 11,
      color: '#000000',
    },
    fill: {
      type: 'pattern',
      patternType: 'solid',
      bgColor: '#D9D9D9',
      fgColor: '#D9D9D9',
    },
    alignment: {
      shrinkToFit: true,
      wrapText: true,
      horizontal: 'center',
      vertical: 'center',
    },
  }),
  tableHeader: wb.createStyle({
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
      name: 'Arial',
      size: 11,
      color: '#000000',
    },
    fill: {
      type: 'pattern',
      patternType: 'solid',
      bgColor: '#A9D08E',
      fgColor: '#A9D08E',
    },
    alignment: {
      shrinkToFit: true,
      wrapText: true,
      horizontal: 'center',
      vertical: 'center',
    },
  }),
  tableHeaderMedida: wb.createStyle({
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
      name: 'Arial',
      size: 11,
      color: '#000000',
    },
    fill: {
      type: 'pattern',
      patternType: 'solid',
      bgColor: '#F4B084',
      fgColor: '#F4B084',
    },
    alignment: {
      shrinkToFit: true,
      wrapText: true,
      horizontal: 'center',
      vertical: 'center',
    },
  }),
};

const tableBody = {
  tableBodyText1: wb.createStyle({
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
    alignment: {
      shrinkToFit: true,
      wrapText: true,
      horizontal: 'center',
      vertical: 'center',
    },
  }),
  tableBodyText2: wb.createStyle({
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
    alignment: {
      shrinkToFit: true,
      wrapText: true,
      horizontal: 'left',
      vertical: 'center',
    },
  }),
  tableBodyText3: wb.createStyle({
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
      size: 9,
      color: '#000000',
    },
    alignment: {
      shrinkToFit: true,
      wrapText: true,
      horizontal: 'left',
      vertical: 'top',
    },
  }),
  tableBodyText4: wb.createStyle({
    font: {
      name: 'Arial',
      size: 11,
      color: '#000000',
    },
    alignment: {
      shrinkToFit: true,
      wrapText: true,
      horizontal: 'center',
      vertical: 'center',
    },
  }),
  tableBodyTolerable: wb.createStyle({
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
    alignment: {
      shrinkToFit: true,
      wrapText: true,
      horizontal: 'center',
      vertical: 'center',
    },
    fill: {
      type: 'pattern',
      patternType: 'solid',
      bgColor: '#A9D08E',
      fgColor: '#A9D08E',
    },
  }),
  tableBodyGestionable: wb.createStyle({
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
      size: 9,
      color: '#000000',
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
      bgColor: '#FFFF00',
      fgColor: '#FFFF00',
    },
  }),
  tableBodyNoTolerable: wb.createStyle({
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
      size: 9,
      color: '#000000',
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
      bgColor: '#FF0000',
      fgColor: '#FF0000',
    },
  }),
};

const tableFooter = {
  footerTitle1: wb.createStyle({
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
      name: 'Arial',
      size: 11,
      color: '#000000',
    },
    alignment: {
      shrinkToFit: true,
      wrapText: true,
      horizontal: 'left',
      vertical: 'top',
    },
  }),
  footerTitle2: wb.createStyle({
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
      name: 'Arial',
      size: 11,
      color: '#000000',
    },
    alignment: {
      shrinkToFit: true,
      wrapText: true,
      horizontal: 'left',
      vertical: 'center',
    },
    fill: {
      type: 'pattern',
      patternType: 'solid',
      bgColor: '#D9D9D9',
      fgColor: '#D9D9D9',
    },
  }),
  footerBoxText: wb.createStyle({
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
  }),
};

module.exports = { header, table, tableBody, tableFooter };
