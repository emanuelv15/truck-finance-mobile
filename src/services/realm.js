import Realm from 'realm';

import { TruckSchema } from '~/schemas/TruckSchema';
import { SpentSchema } from '~/schemas/SpentSchema';
import { ProfitSchema } from '~/schemas/ProfitSchema';

export default function getRealm() {
  return Realm.open({
    schema: [SpentSchema, ProfitSchema, TruckSchema],
  });
}
