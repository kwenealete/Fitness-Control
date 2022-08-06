import Link from 'next/link';
import NavStyles from './styles/NavStyles';

export default function Nav() {

   
    return (
        <NavStyles>
            <Link href="/measurements">Measurements</Link>                
            <Link href="/create">Add weight</Link>
                    
        </NavStyles>
    )
}