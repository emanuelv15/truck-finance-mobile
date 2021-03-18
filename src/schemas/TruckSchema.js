// export default class TruckSchema {
//   static schema = {
//     name: 'Truck',
//     primaryKey: 'id',
//     properties: {
//       id: 'int',
//       name: 'string',
//       board: 'string',
//       driver: 'string',
//       balance: { type: 'double', default: 0 },
//       photo: 'string',
//       spents: 'Spent[]',
//       profits: 'Profit[]',
//     },
//   };
// }

export const TruckSchema = {
  name: 'Truck',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    board: 'string',
    driver: 'string',
    balance: { type: 'double', default: 0 },
    photo: 'string',
    spents: 'Spent[]',
    profits: 'Profit[]',
  },
};
