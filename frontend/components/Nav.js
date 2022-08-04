import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';

export default function Nav() {
    const user = useUser();
   
    return (
        <NavStyles>
            <Link href="/measurements">Measurements</Link>
            {user && (
                <>
                    <Link href="/create">create weight</Link>
                    <Link href="/account">Account</Link>
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