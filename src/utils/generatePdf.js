/* eslint-disable no-unused-vars */
import pdfmake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import * as examples from './examples';

const generatePdf = (light = true, array, truck, month) =>
  new Promise((resolve) => {
    const docDefinition = {
      pageSize: 'A4',
      pageOrientation: 'portrait',
      // ...examples.security(light),
      info: {
        title: 'awesome Document',
        author: 'john doe',
        subject: 'subject of document',
        keywords: 'keywords for document',
      },
      header: `Relatório de Finanças`,
      footer: (currentPage, pageCount) =>
        `${currentPage.toString()} de ${pageCount}`,
      // watermark: {
      //   text: 'watermark',
      //   color: 'blue',
      //   opacity: 0.1,
      //   bold: true,
      //   italics: false,
      // },
      content: [
        ...examples.columnsContent(truck),
        ...examples.layout(light, array),
        // ...examples.lists(light),
        // ...examples.link(light),
        // ...examples.qr(light),
        // ...examples.canvas(light),
      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true,
          color: '#15A',
        },
        line: {
          margin: [10, 20, 10, 20],
        },
      },
      images: {
        logo:
          'data:image/png;base64,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',
      },
    };

    const pdfDocGenerator = pdfmake.createPdf(docDefinition);
    pdfDocGenerator.getBase64((pdfData) => {
      resolve({
        pdfData: `data:application/pdf;base64,${pdfData}`,
        onlyData: pdfData,
      });
    });
  });

export default generatePdf;
