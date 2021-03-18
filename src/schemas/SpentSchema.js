// export default class SpentSchema {
//   static schema = {
//     name: 'Spent',
//     primaryKey: 'id',
//     properties: {
//       id: 'int',
//       name: 'string',
//       description: 'string',
//       value: 'double',
//       date: 'date',
//     },
//   };
// }

export const SpentSchema = {
  name: 'Spent',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    description: 'string',
    value: 'double',
    date: 'date',
    parceledOut: 'bool',
    installment: 'int?',
    installments: 'int?',
    installmentOneId: 'int',
    paidOut: 'bool',
  },
};
