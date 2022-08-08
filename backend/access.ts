import { ListAccessArgs } from './types';
import { permissionsList } from './schemas/fields';

//it returns either a yes or no value depending on the user sessions

export function isSignedIn({session}:ListAccessArgs) {
    return !!session
}

const generatedPermissions = Object.fromEntries(
    permissionsList.map((permission) => [
        permission,
        function ({ session }:ListAccessArgs) {
            return !!session?.data.role?.[permission];
        },
    ])
);


//Permissions check if someone meets a criteria Y/N

export const permissions = {
    ...generatedPermissions,
    // canManageMeasurements({ session }) {
    //     return session?.data.role?.canManageMeasurements;
    // },
};

//rule based function to filter which measurement a user can CRUD.

export const rules = {
    canManageMeasurements({ session }: ListAccessArgs) {
        if(!isSignedIn({ session })) {
            return false;
        }
        //check if they have canManageMeasurements permission
        if(permissions.canManageMeasurements({ session })) {
            return true;
        }
        // if not, are they the owner?
        return { user: { id: session.itemId } };
    },

    canReadMeasurements({ session }: ListAccessArgs) {
        if(!isSignedIn({ session })) {
            return false;
        }
        if(permissions.canManageMeasurements({ session })) {
            return true; //can read everything
        }
        return { status: 'AVAILABLE' }
    },

    canManageUsers({ session }: ListAccessArgs) {
        if(!isSignedIn({ session })) {
            return false;
        }
        if (permissions.canManageUsers({ session })) {
            return true;
        }
        //if not,they may only update themselves
        return { id: session.itemId };
    },
};