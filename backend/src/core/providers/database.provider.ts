import sequelize from 'db/config';
import { Users } from '../models/users.models';
import { SEQUELIZE } from './constants';
import { SendEmail } from '../models/sendemail.models';
export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      sequelize.addModels([Users, SendEmail]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
