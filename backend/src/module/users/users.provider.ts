import { Users } from '../../core/models/users.models';
import { USERS_REPOSITORY } from '../../core/providers/constants';

export const usersProviders = [
  {
    provide: USERS_REPOSITORY,
    useValue: Users,
  },
];
