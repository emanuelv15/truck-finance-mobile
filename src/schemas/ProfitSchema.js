// export default class ProfitSchema {
//   static schema = {
//     name: 'Profit',
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

export const ProfitSchema = {
  name: 'Profit',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    description: 'string',
    value: 'double',
    date: 'date',
  },
};
