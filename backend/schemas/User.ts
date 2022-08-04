import { list } from '@keystone-next/keystone/schema';
import { text, password, relationship } from '@keystone-next/fields';

export const User = list({
    // access: {
    // },
       fields: {
        name: text({ isRequired: true }),
        email: text({ isRequired: true, isUnique: true }),
        password: password(),
        measurements: relationship({ ref: 'Measurement.user', many: true }),
        // role: ,
            // access: {
                
            // },
        // },
    },
});