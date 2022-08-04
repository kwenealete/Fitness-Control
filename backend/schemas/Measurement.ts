import { integer, select, relationship, text,  } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';


export const Measurement = list({
    // access: {
    // },
    fields: {
        day: integer({ isRequired: true,}),
        month: text({ isRequired: true}),
        year: integer({ isRequired: true}),
        weight: integer(),
        status: select({
            options: [
                {label: 'Draft', value: 'DRAFT'},
                {label: 'Available', value: 'AVAILABLE'},
                {label: 'Unavailable', value: 'UNAVAILABLE'},
            ],
            defaultValue: 'DRAFT',
            ui: {
                displayMode: 'segmented-control',
                createView: { fieldMode: 'hidden' },
            },
        }),
        user: relationship({
            ref: 'User.measurements',
            // defaultValue: ({ context }) => ({ connect: { id: context.session.itemId }, })
        })
    },
});