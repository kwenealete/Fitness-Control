import Link from 'next/link';
import styled from 'styled-components';
import Nav from './Nav';

const Logo = styled.h1`
    font-size: 3rem;
    margin-left: 2rem;
    position: relative;
    z-index: 2;
    background: whitesmoke;
    transform: skew(-7deg);
    a {
        letter-spacing:4rem;
        color: black;
        text-decoration: none;
        text-transform: uppercase;
        padding: 0.5rem 1rem;
    }
`;

const HeaderStyles = styled.header`
    .bar {
        border-bottom: 10px solid var(--black, black);
        display: grid;
        grid-template-columns: auto 1fr;
        justify-content: space-between;
        align-items: stretch;
        background: greenyellow;
    }
`;

export default function Header() {
    return (
        <HeaderStyles>
            <div className="bar">
                <Logo>
                    <Link href="/">Lenus</Link>
                </Logo>
                <Nav />
            </div>
            
        </HeaderStyles>
    );
}