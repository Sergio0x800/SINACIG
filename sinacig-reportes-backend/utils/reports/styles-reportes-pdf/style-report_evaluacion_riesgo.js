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
