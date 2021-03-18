import { MaskService } from 'react-native-masked-text';
import faker from 'faker';

export const columnsContent = (truck) => [
  {
    columns: [
      {
        margin: [150, 0, 0, 0],
        width: 'auto',
        image: 'logo',
        fit: [50, 50],
      },
      {
        margin: [10, 13, 0, 0],
        width: '*',
        text: `Trucks SS's`,
        style: ['header'],
      },
    ],
    style: ['line'],
  },
  {
    columns: [
      {
        width: '42%',
        text: `Caminhão: ${truck.name}`,
      },
      {
        width: '42%',
        text: `Placa: ${truck.board}`,
      },
      {
        width: '42%',
        text: `Motorista: ${truck.driver}`,
      },
    ],
    style: ['line'],
    tocItem: ['mainToc'],
  },
];

export const layout = (light, array) => [
  {
    layout: 'lightHorizontalLines', // optional
    table: {
      headerRows: 1,
      widths: [75, 'auto', 70, 75],

      body: [
        // ['department', 'productName', 'color', 'price'],
        ['Nome', 'Descrição', 'Data', 'Valor'],
        ...[...new Array(array.length)].map((currElement, index) => [
          // { text: faker.commerce.department(), bold: true },
          // faker.commerce.productName(),
          // faker.commerce.color(),
          // faker.commerce.price(),
          { text: array[index].name, bold: true },
          array[index].description,
          `${
            // eslint-disable-next-line react/prop-types
            String(array[index].date.getDate()).length === 1
              ? // eslint-disable-next-line react/prop-types
                `0${String(array[index].date.getDate())}`
              : // eslint-disable-next-line react/prop-types
                String(array[index].date.getDate())
          }/${
            // eslint-disable-next-line react/prop-types
            String(array[index].date.getMonth()).length === 1 &&
            // eslint-disable-next-line react/prop-types
            array[index].date.getMonth() < 9
              ? // eslint-disable-next-line react/prop-types
                `0${String(array[index].date.getMonth() + 1)}`
              : // eslint-disable-next-line react/prop-types
                String(array[index].date.getMonth() + 1)
            // eslint-disable-next-line react/prop-types
          }/${array[index].date.getFullYear()}`,
          // array.date,
          MaskService.toMask('money', array[index].value),
        ]),
      ],
    },
    style: ['line'],
  },
];

export const lists = (light) => [
  {
    text: 'Emails',
    style: ['line'],
  },
  {
    // to treat a paragraph as a bulleted list, set an array of items under the ul key
    ul: [...new Array(light ? 2 : 200)].map(faker.internet.email),
  },
  {
    text: 'Users :',
    style: ['line'],
  },
  {
    // for numbered lists set the ol key
    ol: [...new Array(light ? 2 : 200)].map(faker.name.findName),
  },
];

export const link = () => [
  {
    text: 'google',
    link: 'http://google.com',
    style: ['line'],
    tocItem: ['mainToc', 'subToc'],
  },
  { text: 'Go to page 2', linkToPage: 2, style: ['line'] },
];

export const qr = () => [
  { qr: 'text in QR', style: ['line'] },
  {
    qr: 'text in QR',
    foreground: 'red',
    background: 'yellow',
    style: ['line'],
  },
];

export const canvas = () => [
  {
    width: 'auto',
    image: 'logo',
    // eslint-disable-next-line no-dupe-keys
    width: 310,
    height: 310,
    pageSize: 'A5',
    pageOrientation: 'landscape',
    pageBreak: 'before',
  },
  {
    canvas: [
      {
        type: 'rect',
        x: 20,
        y: 20,
        w: 270,
        h: 270,
        r: 5,
        dash: { length: 5 },
        lineColor: 'blue',
      },
    ],
    margin: [0, -310, 0, 0],
  },
];

export const security = () => ({
  userPassword: '123',
  ownerPassword: '123456',
  permissions: {
    printing: 'highResolution', // 'lowResolution'
    modifying: false,
    copying: false,
    annotating: true,
    fillingForms: true,
    contentAccessibility: true,
    documentAssembly: true,
  },
});
