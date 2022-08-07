import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';
import SignOut from './SignOut';

export default function Nav() {
    const user = useUser();

   
    return (
        <NavStyles>
            <Link href="/measurements">Measurements</Link>                
            {user && (
                <>
                    <Link href="/create">Add weight</Link>
                    <SignOut />
                </>
            )}
            {!user && (
                <>
                    <Link href="/signin">Sign In</Link>
                </>
            )}
                    
        </NavStyles>
    )
}