import 'dotenv/config';
import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { User } from './schemas/User';
import { Measurement } from './schemas/Measurement';
import { withItemData, statelessSessions } from '@keystone-next/keystone/session';
import { sendPasswordResetEmail } from './lib/mail';


const databaseURL = process.env.DATABASE_URL || 'mongodb://localhost/fitness-control-App';

const sessionConfig = {
    maxAge: 60 * 60 * 24 * 360, //length someone can be signed in
    secret: process.env.COOKIE_SECRET
};

const { withAuth } = createAuth({
    listKey: 'User',
    identityField: 'email',
    secretField: 'password',
    initFirstItem: {
        fields: ['name', 'email', 'password'],    
    },
    passwordResetLink: {
        async sendToken(args) {
            await sendPasswordResetEmail(args.token, args.identity);
        }
    }
}); 

export default withAuth(config({
    server: {
        cors: {
            origin: [process.env.FRONTEND_URL],
            credentials: true,
        },
    },
    db: {
        adapter: 'mongoose',
        url: databaseURL,
    },
    lists: createSchema({
        User,
        Measurement,
        
    }),
    ui: {
        //show the UI only for those with acess
        isAccessAllowed: ({ session }) => {
           // console.log(session);
            return !!session?.data;
            
        },
    },
    session: withItemData(statelessSessions(sessionConfig), {
        //GraphQL query

        User: `id name email `
    })
}));