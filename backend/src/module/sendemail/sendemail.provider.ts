import { SendEmail } from 'src/core/models/sendemail.models';
import { SENDEMAIL_REPOSITORY } from 'src/core/providers/constants';

export const sendemailProviders = [
  {
    provide: SENDEMAIL_REPOSITORY,
    useValue: SendEmail,
  },
];
